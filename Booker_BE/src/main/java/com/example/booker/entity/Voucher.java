package com.example.booker.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Entity
@Table(name = "voucher")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_voucher")
    @JsonProperty("id_voucher")
    private int idVoucher;

    String ten_voucher;
    Float giam_gia;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate ngay_bat_dau = LocalDate.now();
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate ngay_het_han;
    Float gia_ap_dung;
    int ma_cua_hang;
    int so_lan_dung;
    String dieu_kien;

    @Column(name = "trang_thai")
    private Byte trangThai; //0 - chưa ap dung , 1 - hết hạn,  2 - còn hạng

    @ManyToOne
    @JoinColumn(name = "ma_cua_hang", insertable = false, updatable = false)
    CuaHang cua_hang;

    @JsonIgnore
    @OneToMany(mappedBy = "voucher")
    List<DonHangChiTiet> donHangChiTiets;

}
