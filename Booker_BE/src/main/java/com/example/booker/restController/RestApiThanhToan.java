package com.example.booker.restController;

import com.example.booker.dao.TransactionDao;
import com.example.booker.dao.ViDao;
import com.example.booker.entity.BankTransactionResponse;
import com.example.booker.entity.Transaction;
import com.example.booker.entity.TransactionResponse;
import com.example.booker.entity.Vi;
import com.example.booker.request.ApiResponse;
import com.example.booker.service.nguoidung.ViService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.dao.DataIntegrityViolationException;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Set;
import java.util.HashSet;

@RestController
@CrossOrigin("*")
public class RestApiThanhToan {

    // Lock object tĩnh để đảm bảo synchronized hoạt động đúng với mọi instance
    private static final Object TRANSACTION_LOCK = new Object();
    
    // Lưu raw response trước đó theo id_vi để so sánh
    // Key: id_vi, Value: Set<String> chứa các SoThamChieu đã xử lý
    private static final Map<String, Set<String>> processedTransactions = new ConcurrentHashMap<>();

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    TransactionDao transactionDao;

    @Autowired
    ViDao viDao;

    @Autowired
    ViService viService;

    // private static final String URL = "https://api.web2m.com/historyapiacbv3/Kiet999/12897891/654249E7-3D9B-5306-E6DA-6DA177FD9882";
    private static final String URL = "https://api.web2m.com/historyapivcb/Minh0365412270@/1016710155/313B4285-E29E-6E97-F872-872386EDD467";
    
    // private static final String API_KEY = "654249E7-3D9B-5306-E6DA-6DA177FD9882"; // Đặt API key nếu cần
    private static final String API_KEY = "313B4285-E29E-6E97-F872-872386EDD467"; // Đặt API key nếu cần

    @GetMapping("/api/v1/get-thanhtoan/{id_vi}")
public ResponseEntity<String> proxyApi(@PathVariable String id_vi) {

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + API_KEY);

    HttpEntity<Void> entity = new HttpEntity<>(headers);

    ResponseEntity<String> response =
        restTemplate.exchange(URL, HttpMethod.GET, entity, String.class);

    try {
        System.out.println("RAW RESPONSE = " + response.getBody());

        ObjectMapper mapper = new ObjectMapper();

        // Parse response theo cấu trúc thực tế
        BankTransactionResponse bankResponse = mapper.readValue(
            response.getBody(),
            BankTransactionResponse.class
        );

        // Lấy danh sách SoThamChieu đã xử lý trước đó cho ví này
        Set<String> processedSoThamChieu = processedTransactions.getOrDefault(id_vi, new HashSet<>());
        Set<String> currentSoThamChieu = new HashSet<>();
        
        List<Transaction> allTransactions = new ArrayList<>();
        List<BankTransactionResponse.ChiTietGiaoDich> allChiTietGiaoDich = new ArrayList<>();

        // Chuyển đổi từ BankTransactionResponse sang Transaction entity
        if (bankResponse.getData() != null && 
            bankResponse.getData().getChiTietGiaoDich() != null) {
            
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            
            // Lưu tất cả ChiTietGiaoDich để sắp xếp
            for (BankTransactionResponse.ChiTietGiaoDich chiTiet : 
                 bankResponse.getData().getChiTietGiaoDich()) {
                
                // Tạo key duy nhất từ SoThamChieu + NgayGiaoDich + PostingTime để so sánh
                String uniqueKey = chiTiet.getSoThamChieu() + 
                                 (chiTiet.getNgayGiaoDich() != null ? chiTiet.getNgayGiaoDich() : "") +
                                 (chiTiet.getPostingTime() != null ? chiTiet.getPostingTime() : "");
                
                currentSoThamChieu.add(uniqueKey);
                allChiTietGiaoDich.add(chiTiet);
                
                Transaction transaction = new Transaction();
                
                // Map SoThamChieu thành transaction_id (tạo ID duy nhất từ SoThamChieu + NgayGiaoDich + PostingTime)
                long transactionId;
                if (chiTiet.getSoThamChieu() != null && !chiTiet.getSoThamChieu().isEmpty()) {
                    // Tạo ID duy nhất từ SoThamChieu + NgayGiaoDich + PostingTime
                    String uniqueString = chiTiet.getSoThamChieu() + 
                                        (chiTiet.getNgayGiaoDich() != null ? chiTiet.getNgayGiaoDich() : "") +
                                        (chiTiet.getPostingTime() != null ? chiTiet.getPostingTime() : "");
                    transactionId = Math.abs(uniqueString.hashCode());
                    
                    // Nếu ID trùng, thêm timestamp vào cuối để tạo ID mới
                    long originalId = transactionId;
                    int attempts = 0;
                    while (transactionDao.existsById(transactionId) && attempts < 10) {
                        String newUniqueString = uniqueString + System.currentTimeMillis() + attempts;
                        transactionId = Math.abs(newUniqueString.hashCode());
                        attempts++;
                    }
                    
                    // Nếu vẫn trùng sau 10 lần thử, dùng timestamp trực tiếp
                    if (transactionDao.existsById(transactionId)) {
                        transactionId = System.currentTimeMillis() % 1000000000L;
                    }
                } else {
                    // Nếu không có SoThamChieu, dùng timestamp
                    transactionId = System.currentTimeMillis() % 1000000000L;
                }
                transaction.setTransaction_id(transactionId);
                
                // Map SoTienGhiCo thành amount (loại bỏ dấu phẩy và chuyển sang BigDecimal)
                if (chiTiet.getSoTienGhiCo() != null && !chiTiet.getSoTienGhiCo().isEmpty()) {
                    String soTien = chiTiet.getSoTienGhiCo().replace(",", "").trim();
                    try {
                        BigDecimal amount = new BigDecimal(soTien);
                        transaction.setAmount(amount);
                    } catch (NumberFormatException e) {
                        System.err.println("Lỗi parse số tiền: " + chiTiet.getSoTienGhiCo());
                    }
                }
                
                // Map MoTa thành description
                transaction.setDescription(chiTiet.getMoTa());
                
                // Map NgayGiaoDich thành transactionDate
                if (chiTiet.getNgayGiaoDich() != null && !chiTiet.getNgayGiaoDich().isEmpty()) {
                    try {
                        Date transactionDate = dateFormat.parse(chiTiet.getNgayGiaoDich());
                        transaction.setTransactionDate(transactionDate);
                    } catch (ParseException e) {
                        System.err.println("Lỗi parse ngày: " + chiTiet.getNgayGiaoDich());
                    }
                }
                
                // Map CD thành type ("+" = IN/CREDIT, "-" = OUT/DEBIT)
                if (chiTiet.getCd() != null) {
                    if ("+".equals(chiTiet.getCd())) {
                        transaction.setType("IN");
                    } else if ("-".equals(chiTiet.getCd())) {
                        transaction.setType("OUT");
                    } else {
                        transaction.setType(chiTiet.getCd());
                    }
                }
                
                // Set id_vi
                transaction.setId_vi(id_vi);
                
                allTransactions.add(transaction);
            }
        }

        // Sắp xếp TẤT CẢ ChiTietGiaoDich theo ngày/giờ (mới nhất trước) để tìm transaction mới nhất
        if (!allChiTietGiaoDich.isEmpty()) {
            allChiTietGiaoDich.sort((c1, c2) -> {
                // So sánh ngày
                if (c1.getNgayGiaoDich() != null && c2.getNgayGiaoDich() != null) {
                    int dateCompare = c2.getNgayGiaoDich().compareTo(c1.getNgayGiaoDich());
                    if (dateCompare != 0) {
                        return dateCompare;
                    }
                }
                // Nếu cùng ngày, so sánh PostingTime (giờ mới nhất trước)
                if (c1.getPostingTime() != null && c2.getPostingTime() != null) {
                    return c2.getPostingTime().compareTo(c1.getPostingTime());
                }
                // Nếu không có PostingTime, so sánh SoThamChieu
                if (c1.getSoThamChieu() != null && c2.getSoThamChieu() != null) {
                    return c2.getSoThamChieu().compareTo(c1.getSoThamChieu());
                }
                return 0;
            });
        }

        // Chỉ xử lý transaction MỚI NHẤT (chưa được xử lý trước đó)
        List<Transaction> newTransactionsToSave = new ArrayList<>();
        
        if (!allChiTietGiaoDich.isEmpty()) {
            // LẤY transaction MỚI NHẤT trong toàn bộ raw response (đầu tiên sau khi sắp xếp)
            BankTransactionResponse.ChiTietGiaoDich latestChiTiet = allChiTietGiaoDich.get(0);
            
            // Tạo uniqueKey cho transaction mới nhất
            String latestUniqueKey = latestChiTiet.getSoThamChieu() + 
                                   (latestChiTiet.getNgayGiaoDich() != null ? latestChiTiet.getNgayGiaoDich() : "") +
                                   (latestChiTiet.getPostingTime() != null ? latestChiTiet.getPostingTime() : "");
            
            System.out.println("📌 Transaction MỚI NHẤT trong raw response: " + latestChiTiet.getSoThamChieu() + 
                             " - Ngày: " + latestChiTiet.getNgayGiaoDich() + 
                             " - Giờ: " + latestChiTiet.getPostingTime() + 
                             " - Số tiền: " + latestChiTiet.getSoTienGhiCo());
            System.out.println("🔍 Kiểm tra uniqueKey: " + latestUniqueKey + " | Đã xử lý: " + processedSoThamChieu.contains(latestUniqueKey));
            
            // CHỈ xử lý nếu transaction mới nhất CHƯA được xử lý
            if (!processedSoThamChieu.contains(latestUniqueKey)) {
                System.out.println("✅ Transaction mới nhất CHƯA được xử lý, sẽ xử lý ngay!");
            
                // Chuyển đổi ChiTietGiaoDich mới nhất thành Transaction
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                
                // CHỈ xử lý 1 transaction mới nhất
                BankTransactionResponse.ChiTietGiaoDich chiTiet = latestChiTiet;
                Transaction transaction = new Transaction();
                
                // Map SoThamChieu thành transaction_id
                long transactionId;
                String uniqueKey = chiTiet.getSoThamChieu() + 
                                 (chiTiet.getNgayGiaoDich() != null ? chiTiet.getNgayGiaoDich() : "") +
                                 (chiTiet.getPostingTime() != null ? chiTiet.getPostingTime() : "");
                transactionId = Math.abs(uniqueKey.hashCode());
                
                // Đảm bảo ID không trùng
                int attempts = 0;
                while (transactionDao.existsById(transactionId) && attempts < 10) {
                    String newUniqueString = uniqueKey + System.currentTimeMillis() + attempts;
                    transactionId = Math.abs(newUniqueString.hashCode());
                    attempts++;
                }
                if (transactionDao.existsById(transactionId)) {
                    transactionId = System.currentTimeMillis() % 1000000000L;
                }
                transaction.setTransaction_id(transactionId);
                
                // Map các field khác
                if (chiTiet.getSoTienGhiCo() != null && !chiTiet.getSoTienGhiCo().isEmpty()) {
                    String soTien = chiTiet.getSoTienGhiCo().replace(",", "").trim();
                    try {
                        BigDecimal amount = new BigDecimal(soTien);
                        transaction.setAmount(amount);
                    } catch (NumberFormatException e) {
                        System.err.println("Lỗi parse số tiền: " + chiTiet.getSoTienGhiCo());
                    }
                }
                
                transaction.setDescription(chiTiet.getMoTa());
                
                if (chiTiet.getNgayGiaoDich() != null && !chiTiet.getNgayGiaoDich().isEmpty()) {
                    try {
                        Date transactionDate = dateFormat.parse(chiTiet.getNgayGiaoDich());
                        transaction.setTransactionDate(transactionDate);
                    } catch (ParseException e) {
                        System.err.println("Lỗi parse ngày: " + chiTiet.getNgayGiaoDich());
                    }
                }
                
                if (chiTiet.getCd() != null) {
                    if ("+".equals(chiTiet.getCd())) {
                        transaction.setType("IN");
                    } else if ("-".equals(chiTiet.getCd())) {
                        transaction.setType("OUT");
                    } else {
                        transaction.setType(chiTiet.getCd());
                    }
                }
                
                transaction.setId_vi(id_vi);
                newTransactionsToSave.add(transaction);
            } else {
                System.out.println("⚠ Transaction mới nhất ĐÃ được xử lý trước đó, bỏ qua!");
            }
        } else {
            System.out.println("ℹ Không có giao dịch nào trong raw response");
        }
        
        // Lưu uniqueKey của transaction mới nhất để đánh dấu sau khi lưu thành công
        String latestUniqueKeyToMark = null;
        if (!allChiTietGiaoDich.isEmpty() && !newTransactionsToSave.isEmpty()) {
            BankTransactionResponse.ChiTietGiaoDich latestChiTiet = allChiTietGiaoDich.get(0);
            latestUniqueKeyToMark = latestChiTiet.getSoThamChieu() + 
                                   (latestChiTiet.getNgayGiaoDich() != null ? latestChiTiet.getNgayGiaoDich() : "") +
                                   (latestChiTiet.getPostingTime() != null ? latestChiTiet.getPostingTime() : "");
        }
        
        // Cập nhật danh sách hiện tại (để tránh xử lý lại các transaction cũ)
        processedTransactions.put(id_vi, currentSoThamChieu);

        // CHỈ LƯU transaction mới vào database và cập nhật số dư ví
        // Sử dụng synchronized với lock object tĩnh để tránh race condition khi xử lý đồng thời
        synchronized (TRANSACTION_LOCK) {
            for (Transaction transaction : newTransactionsToSave) {
                try {
                    // Kiểm tra lại một lần nữa để đảm bảo transaction chưa tồn tại (double check)
                    if (transaction.getTransaction_id() != null) {
                        boolean isNewTransaction = !transactionDao.existsById(transaction.getTransaction_id());
                        
                        if (isNewTransaction) {
                            // CHỈ LƯU transaction mới vào database
                            Transaction savedTransaction = transactionDao.save(transaction);
                            
                            if (savedTransaction != null) {
                                System.out.println("✓ Đã lưu transaction MỚI NHẤT vào database: " + transaction.getTransaction_id() + 
                                                 " - Số tiền: " + transaction.getAmount());
                                
                                // Đánh dấu transaction này là đã xử lý (chỉ transaction mới nhất)
                                if (latestUniqueKeyToMark != null) {
                                    Set<String> updatedProcessed = processedTransactions.getOrDefault(id_vi, new HashSet<>());
                                    updatedProcessed.add(latestUniqueKeyToMark);
                                    processedTransactions.put(id_vi, updatedProcessed);
                                    System.out.println("📝 Đã đánh dấu transaction mới nhất là đã xử lý: " + latestUniqueKeyToMark);
                                }
                                
                                // Cập nhật số dư ví: cộng tiền vào ví cho giao dịch nạp tiền
                                // CHỈ cộng 1 lần cho transaction mới nhất
                                if (transaction.getAmount() != null && 
                                    ("IN".equalsIgnoreCase(transaction.getType()) || 
                                     transaction.getType() == null ||
                                     "+".equalsIgnoreCase(transaction.getType()))) {
                                    float amount = transaction.getAmount().floatValue();
                                    viService.congTien(id_vi, amount);
                                    System.out.println("✓ Đã cộng " + amount + " VNĐ vào ví " + id_vi + " từ transaction " + transaction.getTransaction_id());
                                }
                            }
                        } else {
                            System.out.println("⚠ Transaction " + transaction.getTransaction_id() + " đã tồn tại trong DB (double check), bỏ qua.");
                        }
                    }
                } catch (DataIntegrityViolationException e) {
                    // Nếu có lỗi constraint violation (duplicate key), transaction đã được xử lý bởi request khác
                    System.out.println("⚠ Transaction " + transaction.getTransaction_id() + " đã được xử lý bởi request khác (duplicate key), không lưu.");
                } catch (Exception e) {
                    System.err.println("✗ Lỗi khi lưu transaction " + transaction.getTransaction_id() + ": " + e.getMessage());
                    e.printStackTrace();
                }
            }
        }
        
        // Log tổng kết
        if (newTransactionsToSave.isEmpty()) {
            System.out.println("📊 Kết quả: Không có giao dịch mới nào được thêm vào database.");
        } else {
            System.out.println("📊 Kết quả: Đã thêm " + newTransactionsToSave.size() + " giao dịch MỚI vào database.");
        }

        // Tạo response trả về cho frontend (giữ nguyên format cũ để tương thích)
        // Trả về tất cả transactions từ API (không chỉ transaction mới nhất) để frontend có thể hiển thị
        ApiResponse<List<Transaction>> apiResponse = new ApiResponse<>();
        apiResponse.setTransactions(allTransactions);
        apiResponse.setCode(200);
        apiResponse.setMessage("Success");
        
        ObjectMapper responseMapper = new ObjectMapper();
        String responseBody = responseMapper.writeValueAsString(apiResponse);
        
        return ResponseEntity.ok(responseBody);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Parse error: " + e.getMessage());
    }
}

    @GetMapping("/api/v1/get-vi/{id}")
    public Vi proxyApi2(@PathVariable int id) {
        return viDao.findByTaiKhoan(id);
    }
    // lấy list thông tin thanh toán nạp tiền
    @GetMapping("api/nap/all")
    public List<Transaction> getALLNapTien() {
        return transactionDao.findAll();
    }

    @GetMapping("/naptien/lichsu/{id_vi}")
    public List<Transaction> getLichSuNapTien(@PathVariable String id_vi) {
        return transactionDao.findByIdVi(id_vi);
    }
}
