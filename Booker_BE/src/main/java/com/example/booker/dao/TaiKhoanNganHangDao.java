package com.example.booker.dao;

import com.example.booker.entity.TaiKhoanNganHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaiKhoanNganHangDao extends JpaRepository<TaiKhoanNganHang, Integer> {


        @Query("SELECT tk FROM TaiKhoanNganHang tk WHERE tk.cua_hang.ma_cua_hang = :ma_cua_hang")
        TaiKhoanNganHang findByMaCuaHang(int ma_cua_hang);


//    @Query("SELECT tk FROM TaiKhoanNganHang tk WHERE tk.ma_cua_hang = :ma_cua_hang")
//    List<TaiKhoanNganHang> findByMaCuaHang(int ma_cua_hang);
}
