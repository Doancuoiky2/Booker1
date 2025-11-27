package com.example.booker.request;

public class RegisterRequest {
    private String ho_ten; // Đổi thành ho_ten để khớp với frontend
    private String email;
    private String mat_khau; // Đổi thành mat_khau để khớp với frontend
    private String otp;

    // Getters và Setters
    public String getHo_ten() {
        return ho_ten;
    }

    public void setHo_ten(String ho_ten) {
        this.ho_ten = ho_ten;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMat_khau() {
        return mat_khau;
    }

    public void setMat_khau(String mat_khau) {
        this.mat_khau = mat_khau;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}


