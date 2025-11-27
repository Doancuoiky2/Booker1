package com.example.booker.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Entity
@Table(name = "phan_hoi_danh_gia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhanHoiDanhGia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ma_phan_hoi;
    private String noi_dung_phan_hoi;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime ngay_phan_hoi;

    @ManyToOne
    @JoinColumn(name = "ma_cua_hang", insertable=true, updatable=true) // Bỏ insertable=false, updatable=false
    private CuaHang cua_hang;

    @OneToOne
    @JoinColumn(name = "ma_danh_gia", insertable=true, updatable=true) // Bỏ insertable=false, updatable=false
    private DanhGia danh_gia;
}

