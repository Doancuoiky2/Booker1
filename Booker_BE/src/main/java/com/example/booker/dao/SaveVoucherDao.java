package com.example.booker.dao;

import com.example.booker.entity.SaveVoucher;
import com.example.booker.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SaveVoucherDao extends JpaRepository<SaveVoucher, Integer> {

//    Hàm kiểm tra để voucher thêm vào tài khoản ko vị trùng lặp
    boolean existsByVoucher_IdVoucherAndTaiKhoan_IdTaiKhoan(int idVoucher, int idTaiKhoan);

    @Query("SELECT s FROM SaveVoucher s JOIN s.voucher v WHERE v.ma_cua_hang = :maCuaHang AND s.taiKhoan.idTaiKhoan = :idTk")
    List<SaveVoucher> timKiemVoucherByMaCuaHang(@Param("maCuaHang") int maCuaHang, @Param("idTk") int idTk);

//    lấy tất cả voucher đã lưu của 1 tài khoản
    @Query("SELECT s FROM SaveVoucher s WHERE s.taiKhoan.idTaiKhoan = :id_tk")
    List<SaveVoucher> findVoucherByIdTaiKhoan(@Param("id_tk") int idTk);

    // Xóa 1 bản lưu voucher theo id voucher và id tài khoản
    void deleteByVoucher_IdVoucherAndTaiKhoan_IdTaiKhoan(int idVoucher, int idTaiKhoan);

}
