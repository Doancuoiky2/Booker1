package com.example.booker.dao;

import com.example.booker.entity.PhanHoiDanhGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PhanHoiDanhGiaDao extends JpaRepository<PhanHoiDanhGia, Integer> {

    @Query("SELECT p FROM PhanHoiDanhGia p WHERE p.cua_hang.ma_cua_hang = :maCuaHang AND p.danh_gia.ma_danh_gia = :maDanhGia")
    PhanHoiDanhGia getPhanHoiDanhGiaByMaDanhGia(@Param("maCuaHang") Integer maCuaHang, @Param("maDanhGia") Integer maDanhGia);


}
