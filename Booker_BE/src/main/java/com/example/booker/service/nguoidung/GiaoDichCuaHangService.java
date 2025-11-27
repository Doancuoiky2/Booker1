package com.example.booker.service.nguoidung;

import com.example.booker.entity.GiaoDichCuaHang;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service
public interface GiaoDichCuaHangService {

    List<GiaoDichCuaHang> getGiaoDichCuaHang();

    GiaoDichCuaHang create(GiaoDichCuaHang gd);

    GiaoDichCuaHang update(GiaoDichCuaHang gd);

    //danh sach giao dich theo trang thai
    List<GiaoDichCuaHang> getGIaoDichCuaHangByTrangThai(int tt);

}
