package com.example.booker.dao;

import com.example.booker.entity.CuaHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CuaHangViewDao extends JpaRepository<CuaHang, Integer> {

    @Query("SELECT c FROM CuaHang c WHERE c.ma_cua_hang = :ma_cua_hang")
    CuaHang getCuaHangView(int ma_cua_hang);

}


