package com.example.booker.entity.view;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

import java.time.LocalDate;

@Entity
@Immutable
@Table(name = "don_hang_chi_tiet_view")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonHangChiTietView {

    @Id
    int sl_don_hang;
    String ngay_dat;
    int ma_cua_hang;
}