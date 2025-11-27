package com.example.booker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Table(name = "huy_don_hang")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class HuyDonHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String lydoHuyDonHang;

    @ManyToOne
    @JoinColumn(name = "ma_don_hang")
    private DonHang donHang;
}
