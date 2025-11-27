package com.example.booker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity @Table(name = "thanh_toan_vnpay")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class ThanhToanVNPay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Double thanh_tien;
    private Date ngay_thanh_toan = new Date();
    private String ma_giao_dich;

    @ManyToOne @JoinColumn(name = "id_don_hang")
    private DonHang donhang;
    @ManyToOne  @JoinColumn(name = "id_tai_khoan")
    private TaiKhoan taikhoan;
    @ManyToOne @JoinColumn(name = "id_phuong_thuc")
    private PhuongThucThanhToan ptThanhToan;
}
