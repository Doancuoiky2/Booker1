package com.example.booker.restController;

import com.example.booker.dao.DonHangDao;
import com.example.booker.dao.PhuongThucThanhToanDao;
import com.example.booker.dao.TaiKhoanDao;
import com.example.booker.dao.ThanhToanVNPayDao;
import com.example.booker.entity.PhuongThucThanhToan;
import com.example.booker.entity.ThanhToanVNPay;
import com.example.booker.entity.VNPayConfig;
import com.example.booker.request.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/payment")
public class VNPayRestController {

    @Autowired
    ThanhToanVNPayDao thanhToanVNPayDao;
    @Autowired
    TaiKhoanDao taiKhoanDao;
    @Autowired
    DonHangDao donHangDao;
    @Autowired
    PhuongThucThanhToanDao ptThanhToanDao;

    String ma_giao_dich;

    @GetMapping("/pay")
    public Map<String, String> getPay(@RequestParam("price") long price, @RequestParam("bankCode") String bankCode, HttpServletRequest req) throws UnsupportedEncodingException {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = price * 100;
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang: " + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");
        //vnp_Params.put("vnp_NotifyUrl", VNPayConfig.vnp_NotifyUrl);
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", VNPayConfig.getIpAddress(req));

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnpCreateDate = formatter.format(calendar.getTime());
        vnp_Params.put("vnp_CreateDate", vnpCreateDate);
        calendar.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(calendar.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
        Map<String, String> response = new HashMap<>();
        response.put("paymentUrl", paymentUrl);
        response.put("returnUrl", VNPayConfig.vnp_ReturnUrl);
        return response;
    }

    @GetMapping("/payment-callback")
    public ResponseEntity<ApiResponse> getPaymentCallback(HttpServletRequest req) throws UnsupportedEncodingException {
        String status = req.getParameter("vnp_ResponseCode");
        String amount = req.getParameter("vnp_Amount");
        ma_giao_dich = req.getParameter("vnp_BankTranNo");
        ApiResponse apiResponse = new ApiResponse();
        if (status.equals("00")) {
            apiResponse.setCode(200);
            apiResponse.setMessage("Success");
            return ResponseEntity.ok(apiResponse);
        }
        else {
            apiResponse.setCode(400);
            apiResponse.setMessage("Failed");
            return ResponseEntity.badRequest().body(apiResponse);
        }
    }

    @PostMapping("/addVNPay/taikhoan-{tkid}/donhang-{dhid}")
    public ResponseEntity<ThanhToanVNPay> addThanhToanVNPay(@RequestBody ThanhToanVNPay thanhToanVNPay, @PathVariable("tkid") int idTaikhoan, @PathVariable("dhid") int idDonHang) {
        thanhToanVNPay.setTaikhoan(taiKhoanDao.findById(idTaikhoan).get());
        thanhToanVNPay.setDonhang(donHangDao.findById(idDonHang).get());
        thanhToanVNPay.setPtThanhToan(ptThanhToanDao.findById(2).get()); // id mặc định của pt thanh toán vnpay
        return ResponseEntity.ok(thanhToanVNPayDao.save(thanhToanVNPay));
    }
}
