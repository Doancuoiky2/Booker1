package com.example.booker.DTO;

import com.example.booker.entity.DonHangChiTiet;
import lombok.Data;

import java.util.List;

@Data
public class DonHangDTO {
    private String loi_nhan;
    private List<DonHangChiTiet> orderDetails;
}
