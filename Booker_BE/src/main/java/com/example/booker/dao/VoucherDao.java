package com.example.booker.dao;

import com.example.booker.entity.Voucher;
import com.example.booker.entity.view.SanPhamView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoucherDao extends JpaRepository<Voucher, Integer> {

    @Query("SELECT v FROM Voucher v JOIN CuaHang c on c.ma_cua_hang = v.cua_hang.ma_cua_hang WHERE c.ma_cua_hang = ?1 ORDER BY v.idVoucher desc")
    public List<Voucher> findByCuaHang(Integer id);

    @Query("SELECT v FROM Voucher v JOIN CuaHang c on c.ma_cua_hang = v.cua_hang.ma_cua_hang WHERE c.ma_cua_hang = ?1 AND v.idVoucher = ?2")
    public Voucher findVoucherByMaVoucher(Integer idch, int ma_voucher);

    //    Hàm đếm số lượng voucher thuooc cửa hàng
    @Query("SELECT COUNT(v) FROM Voucher v JOIN CuaHang c ON c.ma_cua_hang = v.cua_hang.ma_cua_hang WHERE c.ma_cua_hang = :maCuaHang")
    long countVouchersByCuaHang(@Param("maCuaHang") int maCuaHang);

    // Hàm đếm số luong voucher theo trạng thái
    @Query("SELECT COUNT(v) FROM Voucher v JOIN CuaHang c ON c.ma_cua_hang = v.cua_hang.ma_cua_hang WHERE c.ma_cua_hang = :maCuaHang AND v.trangThai = :trangThai")
    long countVouchersByCuaHangAndTrangThai(@Param("maCuaHang") Integer maCuaHang, @Param("trangThai") int trangThai);

    //   tìm voucher theo mã cửa hàng và trangj thái voucher
    @Query("SELECT v FROM Voucher v JOIN CuaHang c ON c.ma_cua_hang = v.cua_hang.ma_cua_hang WHERE c.ma_cua_hang = :maCuaHang AND v.trangThai = :trangThai")
    public List<Voucher> findVoucherByTrangThai(@Param("maCuaHang") Integer maCuaHang, @Param("trangThai") int trangThai);

//    tìm kiếm voucher theo tên
    @Query("SELECT v FROM Voucher v " +
            "JOIN CuaHang c ON c.ma_cua_hang = v.cua_hang.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :maCuaHang AND v.ten_voucher LIKE CONCAT('%', :tenVoucher, '%')")
    List<Voucher> findVouchersByName(@Param("maCuaHang") int maCuaHang, @Param("tenVoucher") String tenVoucher);


    //    tìm kiếm voucher theo tên
    @Query("SELECT v FROM Voucher v " +
            "JOIN CuaHang c ON c.ma_cua_hang = v.cua_hang.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :maCuaHang AND v.giam_gia = :giaGiam")
    List<Voucher> findVouchersByGiamGia(@Param("maCuaHang") int maCuaHang, @Param("giaGiam") int giaGiam);



}
