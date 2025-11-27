package com.example.booker.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "save_voucher")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaveVoucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_voucher", nullable = false)
    private Voucher voucher;

    @ManyToOne
    @JoinColumn(name = "id_tai_khoan", nullable = false)
    private TaiKhoan taiKhoan;
}


