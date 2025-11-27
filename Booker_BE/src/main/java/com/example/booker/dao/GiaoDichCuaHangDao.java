package com.example.booker.dao;

import com.example.booker.entity.GiaoDichCuaHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GiaoDichCuaHangDao extends JpaRepository<GiaoDichCuaHang, Integer> {

//    lấy thông tin rút từ cửa hàng - ADMIN
    @Query("select r from GiaoDichCuaHang r")
    List<GiaoDichCuaHang> getAllGiaoDichRut();

//    ADMIN - lay tất cả giao dịch
    @Query("SELECT gd FROM GiaoDichCuaHang gd ")
    List<GiaoDichCuaHang> getAllGiaoDichCuaHang();

//    ADMIN - lấy giao dịch theo trạng thái
    @Query("SELECT gd FROM GiaoDichCuaHang gd WHERE gd.trang_thai = :tt")
    List<GiaoDichCuaHang> getGiaoDichCuaHangByTrang_thai(int tt);

//    SELLER - lấy giao dịch thuộc cửa hàng
    @Query("select gd from GiaoDichCuaHang gd where gd.cua_hang.ma_cua_hang = :maCuaHang order by gd.id_gd desc")
    List<GiaoDichCuaHang> getGiaoDichByMaCuaHang(int maCuaHang);

//   SELLER - lấy giao dịch theo mã cửa hàng và trạng thái
    @Query("select gd from GiaoDichCuaHang gd where gd.cua_hang.ma_cua_hang = :maCuaHang and gd.trang_thai = :trangThai order by gd.id_gd desc")
    List<GiaoDichCuaHang> getGiaoDichByMaCuaHangAndTrangThai(int maCuaHang, int trangThai);

//    Xem chi tiết giao dich
    @Query("select gd from GiaoDichCuaHang gd where gd.id_gd = :id")
    GiaoDichCuaHang getGiaoDichCuaHangById(int id);

}
