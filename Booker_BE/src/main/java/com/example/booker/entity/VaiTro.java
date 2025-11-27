package com.example.booker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vai_tro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VaiTro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ma_vai_tro;

    private String ten_vai_tro;

}
