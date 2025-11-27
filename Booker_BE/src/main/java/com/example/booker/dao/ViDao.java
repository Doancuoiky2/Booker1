package com.example.booker.dao;

import com.example.booker.entity.Vi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ViDao extends JpaRepository<Vi, String> {

    @Query("SELECT v FROM Vi v WHERE v.tai_khoan.idTaiKhoan = :id_tk")
    Vi findByTaiKhoan(int id_tk);
}
