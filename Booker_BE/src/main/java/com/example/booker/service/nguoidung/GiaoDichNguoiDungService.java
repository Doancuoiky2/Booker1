package com.example.booker.service.nguoidung;

import com.example.booker.entity.GiaoDichCuaHang;

import java.util.List;

public interface GiaoDichNguoiDungService {

    List<GiaoDichCuaHang> getGiaoDichCuaHang();

    GiaoDichCuaHang create(GiaoDichCuaHang gd);

    GiaoDichCuaHang update(GiaoDichCuaHang gd);

    //danh sach giao dich theo trang thai
    List<GiaoDichCuaHang> getGIaoDichCuaHangByTrangThai(int tt);
}
