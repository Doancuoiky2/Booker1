package com.example.booker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "the_loai")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TheLoai {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_the_loai")
    private Integer ma_the_loai;

    @NotEmpty(message = "CATEGORY_INVALED")
    private String ten_the_loai;

    @NotEmpty(message = "INVALID_CATEGORY")
    private String mo_ta_the_loai;

    @JsonIgnore
    @OneToMany(mappedBy = "the_loai")
    private List<SanPham> sanPhams;
}

