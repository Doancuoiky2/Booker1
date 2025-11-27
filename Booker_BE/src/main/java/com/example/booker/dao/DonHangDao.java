package com.example.booker.dao;

import com.example.booker.entity.DonHang;
import com.example.booker.entity.DonHangChiTiet;
import com.example.booker.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface DonHangDao extends JpaRepository<DonHang, Integer> {
//  Lấy thông tin đơn hàng người dùng đang mua
    @Query("select dh.ma_don_hang, dh.ngay_tao, dh.tai_khoan, dh.dia_chi, dh.donHangChiTiets from DonHang dh " +
            "join DonHangChiTiet dhct " +
            "on dh.ma_don_hang = dhct.don_hang.ma_don_hang " +
            "where " +
            "dh.tai_khoan.idTaiKhoan = :ma_tai_khoan and dh.ngay_tao = :createDate and dhct.trang_thai.ma_trang_thai = :trang_thai")
    DonHang getDonHangByTaikhoanAndCreatedate(int ma_tai_khoan, Date createDate, int trang_thai);

//    @Query("SELECT dh FROM DonHang dh WHERE dh.tai_khoan.idTaiKhoan = :userId ORDER BY dh.ngay_tao DESC")
//    List<DonHang> findByTaiKhoanId(@Param("userId") int userId);

//    SELLER - lấy thông tin đơn hàng theo mã đơn hàng
    @Query("select dh from DonHang  dh join DonHangChiTiet dhct on dhct.don_hang.ma_don_hang = dh.ma_don_hang where dhct.don_hang.ma_don_hang = :maDonHang")
    DonHang getDonHangByMaDonHang(@Param("maDonHang") Integer donHang);

    //    admin - đếm có bao nhiêu tài khoản đã mua hàng
    @Query("SELECT COUNT(DISTINCT d.tai_khoan.idTaiKhoan) FROM DonHang d")
    long countDistinctTaiKhoanDaMua();

    @Query("Select Count( d ) from DonHang d")
    Long countAllDonHang();

}
