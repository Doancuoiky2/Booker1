package com.example.booker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "giao_dich_sol")
public class GiaoDichSol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Float so_luong_sol;
    private String dia_chi_gui;
    private int ma_don_hang;
    private int id_tai_khoan;
    @ManyToOne
    @JoinColumn(name = "id_tai_khoan", insertable = false, updatable = false)
    TaiKhoan taiKhoan;
}
