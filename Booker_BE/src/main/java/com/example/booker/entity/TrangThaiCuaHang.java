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
@Table(name = "trang_thai_cua_hang")
public class TrangThaiCuaHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int ma_trang_thai_cua_hang;
    String ten_trang_thai_cua_hang;
}
