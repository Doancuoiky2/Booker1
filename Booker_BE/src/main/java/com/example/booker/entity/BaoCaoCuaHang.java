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
@Table(name = "bao_cao_cua_hang")
public class BaoCaoCuaHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_bao_cao;
    String noi_dung_vi_pham;
    LocalDate ngay_bao_cao = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "id_trang_thai_bao_cao")
    private TrangThaiBaoCao trang_thai_bao_cao;

    @ManyToOne
    @JoinColumn(name = "ma_cua_hang_bao_cao")
    private CuaHang cua_hang_bao_cao;

    @ManyToOne
    @JoinColumn(name = "id_tai_khoan_bi_bao_cao")
    private TaiKhoan tai_khoan_bi_bao_cao;

    @ManyToOne
    @JoinColumn(name = "id_vi_pham")
    ViPham vi_pham;

    @ManyToOne
    @JoinColumn(name = "ma_danh_gia")
    DanhGia danh_gia;

//    @Transient
//
//    @JsonProperty("mo_ta_trang_thai_bao_cao")
//    private String getMoTaTrangThaiBaoCao(){
//        if (trang_thai_bao_cao == null){
//            return "không xac định";
//        } switch (trang_thai_bao_cao) {
//            case 1:
//                return "Chưa duyệt";
//            case 2:
//                return "Chưa xem";
//            case 3:
//                return "Đã xem";
//            case 4:
//                return "Ẩn báo cáo";
//            default:
//                return "Không xác định";
//        }
//    }

}
