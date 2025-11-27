package com.example.booker.service.nguoidung;

import com.example.booker.entity.Otp;
import com.example.booker.Repo.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    private Map<String, String> inMemoryOtpStorage = new HashMap<>();

    // Tạo và lưu OTP
    public void createOtp(String email, String otp) {
        String cleanedEmail = email.trim(); // Loại bỏ khoảng trắng
        Otp otpRecord = otpRepository.findByEmail(cleanedEmail);

        if (otpRecord == null) {
            otpRecord = new Otp();
            otpRecord.setEmail(cleanedEmail);
        }

        otpRecord.setOtp(otp);
        otpRecord.setExpirationTime(LocalDateTime.now().plusMinutes(5)); // OTP hết hạn sau 5 phút
        otpRepository.save(otpRecord);

        // Lưu OTP trong bộ nhớ tạm để kiểm tra nhanh
        inMemoryOtpStorage.put(cleanedEmail, otp);
    }

    // Tạo mã OTP ngẫu nhiên
    public String generateOtp(String email) {
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000); // Tạo mã 6 chữ số
        createOtp(email, otp);
        return otp;
    }

    // Kiểm tra OTP hợp lệ
    public boolean isValidOtp(String email, String otp) {
        String cleanedEmail = email.trim();

        // Kiểm tra trong bộ nhớ tạm trước
        if (inMemoryOtpStorage.containsKey(cleanedEmail)) {
            return otp.equals(inMemoryOtpStorage.get(cleanedEmail));
        }

        // Kiểm tra trong cơ sở dữ liệu nếu không có trong bộ nhớ tạm
        Otp otpRecord = otpRepository.findByEmail(cleanedEmail);
        return otpRecord != null &&
                otpRecord.getOtp().equals(otp) &&
                otpRecord.getExpirationTime().isAfter(LocalDateTime.now());
    }

    // Lấy mã OTP hợp lệ từ cơ sở dữ liệu
    public String getValidOtp(String email) {
        String cleanedEmail = email.trim();
        Otp otpRecord = otpRepository.findByEmail(cleanedEmail);
        if (otpRecord != null && otpRecord.getExpirationTime().isAfter(LocalDateTime.now())) {
            return otpRecord.getOtp(); // Trả về OTP nếu hợp lệ
        }
        return null; // Không có OTP hợp lệ
    }

    // Xóa OTP sau khi đã sử dụng
    public void deleteOtp(String email) {
        String cleanedEmail = email.trim();

        // Xóa khỏi bộ nhớ tạm
        inMemoryOtpStorage.remove(cleanedEmail);

        // Xóa khỏi cơ sở dữ liệu
        Otp otpRecord = otpRepository.findByEmail(cleanedEmail);
        if (otpRecord != null) {
            otpRepository.delete(otpRecord);
        }
    }

    // Gửi mã OTP qua email (ví dụ, JavaMailSender)
    public boolean sendOtpEmail(String email, String otp) {
        try {
            // Gửi email logic tại đây
            System.out.println("Đã gửi OTP " + otp + " tới email " + email);
            return true; // Gửi thành công
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Gửi thất bại
        }
    }
}
