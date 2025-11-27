package com.example.booker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vi_pham")
public class ViPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id_vi_pham;
    String ten_vi_pham;
    int diem_vi_pham;
}
