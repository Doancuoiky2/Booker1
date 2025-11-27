package com.example.booker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity @Table(name = "phuong_thuc_thanh_toan")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class PhuongThucThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String ten_phuong_thuc;

    @JsonIgnore
    @OneToMany(mappedBy = "ptThanhToan")
    private List<ThanhToanVNPay> thanhToanVNPays;
}
