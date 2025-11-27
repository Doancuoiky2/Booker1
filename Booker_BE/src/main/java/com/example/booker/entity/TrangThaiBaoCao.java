package com.example.booker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "trang_thai_bao_cao")
public class TrangThaiBaoCao {

    @Id
    int id_trang_thai_bao_cao;
    String ten_trang_thai_bao_cao;
}
