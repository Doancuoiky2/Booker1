package com.example.booker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.poi.hpsf.Decimal;

import java.util.List;

@Entity
@Table(name = "vi")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Vi {

    @Id
    String id_vi;
    Float so_tien;


    @JsonIgnore
    @OneToMany(mappedBy = "vi")
    List<Transaction> transactions;
    @ManyToOne
    @JoinColumn(name = "id_tai_khoan")
    private TaiKhoan tai_khoan;


}
