package com.example.booker.entity.view;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "cua_hang_view")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CuaHangView {

    @Id
    int ma_cua_hang;
    String ten_cua_hang;
    String dia_chi_cua_hang;
    int id_tai_khoan;
    String anh_bia;
    String anh_dai_dien;
    String email;
    int so_dien_thoai;
    Integer diem_cua_hang;
    Integer tong_luot_ban;
}