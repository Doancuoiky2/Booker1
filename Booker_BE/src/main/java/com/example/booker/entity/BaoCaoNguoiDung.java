package com.example.booker.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bao_cao_nguoi_dung")
public class BaoCaoNguoiDung {

    // người dùng báo cáo tài khoản
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_bao_cao  ;

    @ManyToOne
    @JoinColumn(name = "id_tai_khoan_bao_cao")
    private TaiKhoan id_tai_khoan_bao_cao;


    @ManyToOne
    @JoinColumn(name = "ma_cua_hang_bi_bao_cao")
    private CuaHang ma_cua_hang_bi_bao_cao;
    String noi_dung_vi_phạm;
    Integer trang_thai_bao_cao;// 1. chưa duyệt - 2. chưa xem - 3. đã xem -4.ẩn báo cáo
    String anh_minh_chung;

    @ManyToOne
    @JoinColumn(name = "id_vi_pham")
    ViPham vi_pham;
    @ManyToOne
    @JoinColumn(name = "ma_san_pham")
    SanPham san_pham;

    LocalDate ngay_bao_cao = LocalDate.now();



    @Transient

    @JsonProperty("mo_ta_trang_thai_bao_cao")
    private String getMoTaTrangThaiBaoCao(){
        if (trang_thai_bao_cao == null){
            return "không xac định";
        } switch (trang_thai_bao_cao) {
            case 1:
                return "Chưa duyệt";
            case 2:
                return "Chưa xem";
            case 3:
                return "Đã xem";
            case 4:
                return "Ẩn báo cáo";
            default:
                return "Không xác định";
        }
    }
}
