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
@Table(name = "tai_khoan_ngan_hang")
public class TaiKhoanNganHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id_ngan_hang;
    String accountNo;
    String acqId;
    String addInfo;
    String fomat = "text";
    String template = "compact2";
    String nameBank;
    String short_name;
    String code;
    String icon_url;
    String account_name;


    @ManyToOne(optional = true)
    @JoinColumn(name = "ma_cua_hang")
    private CuaHang cua_hang;
}
