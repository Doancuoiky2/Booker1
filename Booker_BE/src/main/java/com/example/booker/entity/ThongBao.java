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
@Table(name = "thong_bao")
public class ThongBao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id_thong_bao;
    int id_nguoi_thong_bao;
    int id_nguoi_nhan;
    String noi_dung;
    Boolean an_thong_bao;
    Boolean xem_thong_bao;

    @ManyToOne(optional = true)
    @JoinColumn(name = "ma_san_pham", insertable = false, updatable = false)
    private SanPham san_pham;

    @ManyToOne
    @JoinColumn(name = "id_bao_cao", insertable=false, updatable=false)
    ViPham vi_pham;
}
