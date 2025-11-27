package com.example.booker.restController;

import com.example.booker.request.ApiResponse;
import com.example.booker.service.nguoidung.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Random;
import java.util.regex.Pattern;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send-code")
    public ApiResponse<String> sendOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email").trim();
        ApiResponse<String> response = new ApiResponse<>();

        // Kiểm tra email hợp lệ
        if (email == null || email.isEmpty() || !email.contains("@")) {
            response.setMessage("Email không hợp lệ!");
            return response;
        }

        // Tạo mã OTP
        String otp = String.valueOf(new Random().nextInt(999999));
        otpService.createOtp(email, otp);

        // Gửi OTP qua email
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Mã OTP xác minh");
            message.setText("Mã OTP của bạn là: " + otp + ". Mã này sẽ hết hạn sau 5 phút.");
            mailSender.send(message);

            response.setMessage("Mã OTP đã được gửi qua email!");
        } catch (Exception e) {
            e.printStackTrace();
            response.setMessage("Không thể gửi mã OTP. Vui lòng thử lại!");
        }

        return response;
    }



    // Hàm kiểm tra email hợp lệ
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

}