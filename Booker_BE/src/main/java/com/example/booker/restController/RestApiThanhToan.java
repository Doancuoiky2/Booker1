package com.example.booker.restController;

import com.example.booker.dao.TransactionDao;
import com.example.booker.dao.ViDao;
import com.example.booker.entity.Transaction;
import com.example.booker.entity.TransactionResponse;
import com.example.booker.entity.Vi;
import com.example.booker.request.ApiResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
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

import java.util.List;

@RestController
@CrossOrigin("*")
public class RestApiThanhToan {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    TransactionDao transactionDao;

    @Autowired
    ViDao viDao;

    private static final String URL = "https://api.web2m.com/historyapiacbv3/Kiet999/12897891/654249E7-3D9B-5306-E6DA-6DA177FD9882";
    private static final String API_KEY = "654249E7-3D9B-5306-E6DA-6DA177FD9882"; // Đặt API key nếu cần

    @GetMapping("/api/v1/get-thanhtoan/{id_vi}")
    public ResponseEntity<String> proxyApi(@PathVariable("id_vi") String id_vi) {
        // Thiết lập các headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY); // Thay đổi nếu API yêu cầu header khác

        // Tạo yêu cầu đến API bên thứ ba mà không cần tham số
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Gửi yêu cầu và nhận phản hồi từ API bên thứ ba
        ResponseEntity<String> response = restTemplate.exchange(URL, HttpMethod.GET, entity, String.class);
        try {
            ObjectMapper mapper = new ObjectMapper();
            ApiResponse<List<Transaction>> resp = mapper.readValue(response.getBody(), ApiResponse.class);
            for (Transaction transaction : resp.getTransactions()) {
                transaction.setId_vi(id_vi);
                transaction.setTransaction_id(transaction.getTransaction_id());
                transaction.setAmount(transaction.getAmount());
                transaction.setDescription(transaction.getDescription());
                transaction.setTransactionDate(transaction.getTransactionDate());
                transactionDao.save(transaction);
            }
            return response; // Trả dữ liệu về frontend
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
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
