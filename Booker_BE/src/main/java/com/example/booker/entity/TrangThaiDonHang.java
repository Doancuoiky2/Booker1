package com.example.booker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity @Table(name = "trang_thai_don_hang")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class TrangThaiDonHang {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    int ma_trang_thai;
    String ten_trang_thai;
    String mo_ta_trang_thai;

    @JsonIgnore
    @OneToMany(mappedBy = "trang_thai")
    List<DonHangChiTiet> donHangChiTiets;
}
