package com.example.booker.dao;

import com.example.booker.entity.TheLoai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TheLoaiDao extends JpaRepository<TheLoai, Integer> {

    @Query("SELECT (COUNT(t) > 0) FROM TheLoai t WHERE t.ten_the_loai = ?1")
    boolean existsByTenTheLoai(String tenTheLoai);

//    Đếm số lượng thể loại
    @Query("SELECT COUNT(t) FROM TheLoai t")
    long countAllCategory();

    //   đếm số lượng sản phẩm thuộc thể loại
    @Query("SELECT COUNT(s) FROM SanPham s JOIN TheLoai t ON t.ma_the_loai = s.the_loai.ma_the_loai WHERE t.ma_the_loai = :maTheLoai")
    long countByTheLoaiId(@Param("maTheLoai") Integer maTheLoai);

    //    tìm kiếm thể laoij theo tên
    @Query("SELECT t FROM TheLoai t WHERE t.ten_the_loai LIKE %:tenTheLoai%")
    List<TheLoai> findByTenTheLoaiContaining(@Param("tenTheLoai") String tenTheLoai);

}
