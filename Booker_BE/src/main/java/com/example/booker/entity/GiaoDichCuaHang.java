package com.example.booker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "giao_dich_cua_hang")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GiaoDichCuaHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_gd;
    private String mo_ta;
    private Float so_tien;
//    private int ma_cua_hang;
    @Column(name = "anh_qr", columnDefinition = "LONGTEXT")
    private String anh_qr;

//    private String anh_qr;
    private int trang_thai;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    LocalDate ngay_giao_dich = LocalDate.now();
    //0: chờ xác nhận
    //1: đã xong
    //2: hủy yêu cầu

    @ManyToOne
    @JoinColumn(name = "ma_cua_hang")
    CuaHang cua_hang;
}