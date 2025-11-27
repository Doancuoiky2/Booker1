package com.example.booker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "don_hang")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int ma_don_hang;
    float doanh_thu_don_hang;
    @Temporal(TemporalType.DATE)
    Date ngay_tao;
    String loi_nhan;

    @Column(unique = true, length = 20)
    private String ma_hien_thi;

    @PrePersist
    public void prePersist() {
        if (this.ma_hien_thi == null || this.ma_hien_thi.isEmpty()) {
            this.ma_hien_thi = generateMaHienThi();
        }
    }

    private String generateMaHienThi() {
        // Lấy ngày hiện tại: YYMMDD
        String datePart = new java.text.SimpleDateFormat("yyMMdd").format(new java.util.Date());

        // Sinh chuỗi random 8 ký tự (chữ + số)
        String randomPart = java.util.UUID.randomUUID()
                .toString()
                .replaceAll("-", "")
                .substring(0, 8)
                .toUpperCase();

        return datePart + randomPart;
    }

    @ManyToOne
    @JoinColumn(name = "id_tai_khoan")
    TaiKhoan tai_khoan;

    @ManyToOne
    @JoinColumn(name = "ma_dia_chi")
    DiaChi dia_chi;



    @JsonIgnore
    @OneToMany(mappedBy = "don_hang")
    List<DonHangChiTiet> donHangChiTiets;

    @JsonIgnore
    @OneToMany(mappedBy = "donHang")
    List<HuyDonHang> huyDonHangs;

    @JsonIgnore
    @OneToMany(mappedBy = "donhang")
    List<ThanhToanVNPay> ThanhToanVNPays;

    @Transient

    @JsonProperty("phi_dich_vu_dh")
    private Float getTongPhiGiaoDich(){
        return doanh_thu_don_hang / 9;
    }

}
