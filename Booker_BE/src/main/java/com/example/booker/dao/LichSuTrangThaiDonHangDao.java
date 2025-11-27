package com.example.booker.dao;

import com.example.booker.entity.DonHangChiTiet;
import com.example.booker.entity.LichSuTrangThaiDonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LichSuTrangThaiDonHangDao extends JpaRepository <LichSuTrangThaiDonHang, Long> {
//    List<LichSuTrangThaiDonHang> findByOrderIdOrderByCreatedAtDesc(Long orderId);

//    tìm tất cả lịch sử trạng thái của đơn hàng dựa theo id đơn hàng chi tiết
        @Query("SELECT ls FROM LichSuTrangThaiDonHang ls WHERE ls.donHangChiTiet.id = :idDonHangChiTiet ORDER BY ls.id DESC")
        List<LichSuTrangThaiDonHang> findAllByDonHangChiTietIdOrderByIdDesc(@Param("idDonHangChiTiet") int idDonHangChiTiet);

}
