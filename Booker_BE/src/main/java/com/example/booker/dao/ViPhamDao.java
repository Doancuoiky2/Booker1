package com.example.booker.dao;

import com.example.booker.entity.ViPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ViPhamDao extends JpaRepository<ViPham, Integer> {
    @Query("select vp from ViPham vp where vp.id_vi_pham = :id")
    ViPham getViPhamById(@Param("id") Integer id);
}
