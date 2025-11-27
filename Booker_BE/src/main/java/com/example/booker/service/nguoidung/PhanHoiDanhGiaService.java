package com.example.booker.service.nguoidung;

import com.example.booker.dao.PhanHoiDanhGiaDao;
import com.example.booker.entity.PhanHoiDanhGia;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface PhanHoiDanhGiaService {
    PhanHoiDanhGia getPhanHoiGia(int maCuaHang, int maDanhGia);

    PhanHoiDanhGia create(PhanHoiDanhGia phanHoiGia);

    void deleteById( int maPhanHoi);
}
