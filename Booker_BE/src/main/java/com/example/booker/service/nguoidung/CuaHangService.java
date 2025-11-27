package com.example.booker.service.nguoidung;


import com.example.booker.entity.CuaHang;

import java.util.List;

public interface CuaHangService {

    CuaHang createCuaHang(CuaHang cuaHang);

    CuaHang updateCuaHang(CuaHang cuaHang);

    //    public SanPham khoa_sanpham(int id, SanPham sanPham){
    //        SanPham setting_sanPham = sanPhamDao.findById(id)
    //                .orElseThrow(() -> new EntityNotFoundException("San phan kho ton tai id: " + id));
    //        setting_sanPham.setTrang_thai_khoa(true);
    //        return sanPhamDao.save(setting_sanPham);
    //    }
//    CuaHang khoaCuaHang(int id, CuaHang cuaHang);

    List<CuaHang> getAllCuaHang();

    CuaHang getCuaHangById(int id);

    void deleteCuaHang(int id);

    // thong tin cua hang trong chi tiet san pham;
}
