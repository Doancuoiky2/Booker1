package com.example.booker.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "lich_su_trang_thai_don_hang")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LichSuTrangThaiDonHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String status;
    String message;

    @Column(name = "created_at")
    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy", timezone = "Asia/Ho_Chi_Minh")
    LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_don_hang_chi_tiet")
    @JsonIgnore
    DonHangChiTiet donHangChiTiet;


    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }

}
