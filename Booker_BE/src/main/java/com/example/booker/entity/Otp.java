package com.example.booker.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Otp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID tự động tăng

    @Column(nullable = false)
    private String email; // Email nhận mã OTP

    @Column(nullable = false)
    private String otp; // Mã OTP

    @Column(nullable = false)
    private LocalDateTime expirationTime; // Thời gian hết hạn của mã OTP

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public LocalDateTime getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(LocalDateTime expirationTime) {
        this.expirationTime = expirationTime;
    }
}

