package com.example.booker.DTO;

import com.example.booker.entity.DonHangChiTiet;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LichSuTrangThaiDonHangDTO {
    private String status;
    private String message;
    private Integer donHangChiTietId;
}
