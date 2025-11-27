package com.example.booker.entity.view;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Immutable;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Immutable
@Table(name = "san_pham_view")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamView {

    @Id
    Integer ma_san_pham;
    String ten_san_pham;
    String anh_san_pham;
    String tac_gia;
    String ten_the_loai;
    Integer ma_the_loai;
    Float gia;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    LocalDate ngay_tao;
    Integer da_ban;
    Float danh_gia;
    Integer so_luong_hang;
    Integer ma_cua_hang;

    Boolean trang_thai_khoa;
    Boolean trang_thai_duyet;

    Byte trang_thai_hoat_dong;


//    public String gettrang_thai() {
//        if(trang_thai_khoa == Boolean.TRUE) {
//            return "Bị khóa";
//        }else if(trang_thai_duyet == Boolean.TRUE) {
//            int quantity = so_luong_hang - da_ban;
//            if(quantity >0 ) {
//                return "Còn hàng";
//            }else {
//                return "Hết hàng";
//            }
//        }else {
//            return "Chờ duyệt";
//        }
//    }
//
//    public int gettrang_thai_int() {
//        if(trang_thai_khoa == Boolean.TRUE) {
//            return 0;
//        }else if(trang_thai_duyet == Boolean.TRUE) {
//            int quantity = so_luong_hang - da_ban;
//            if(quantity >0 ) {
//                return 1;
//            }else {
//                return 2;
//            }
//        }else {
//            return 3;
//        }
//    }
}