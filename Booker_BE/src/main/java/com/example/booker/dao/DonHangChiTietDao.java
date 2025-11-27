package com.example.booker.dao;

import com.example.booker.entity.DonHangChiTiet;
import com.example.booker.entity.view.DonHangChiTietView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DonHangChiTietDao extends JpaRepository<DonHangChiTiet, Integer> {

    // lấy danh sách hóa đơn chi tiết của cửa hàng theo trạng thái
    @Query("SELECT dhct FROM SanPham s " +
            "JOIN DonHangChiTiet dhct " +
            "on s.ma_san_pham = dhct.san_pham.ma_san_pham" +
            " WHERE s.ma_cua_hang = :ma_cua_hang AND dhct.trang_thai.ma_trang_thai = :ma_trang_thai ")
    List<DonHangChiTiet> findByMaTrangThaiAndMaCuaHang(int ma_cua_hang, int ma_trang_thai);


    //[NB] API lọc hóa đơn chi tiết theo theo ngày tạo
    @Query("SELECT dhct FROM DonHangChiTiet dhct " +
            "JOIN SanPham s " +
            "on s.ma_san_pham = dhct.san_pham.ma_san_pham " +
            "JOIN DonHang dh " +
            "on dh.ma_don_hang = dhct.don_hang.ma_don_hang " +
            "WHERE s.ma_cua_hang = :ma_cua_hang " +
            "AND dhct.trang_thai.ma_trang_thai = :ma_trang_thai " +
            "AND dh.ngay_tao = :ngay_tao")
    List<DonHangChiTiet> sortDonHangChiTietByNgayTao(int ma_cua_hang, int ma_trang_thai, LocalDate ngay_tao);

    //[NB] API lọc hóa đơn chi tiết theo mã hóa đơn
    @Query("SELECT dhct FROM DonHangChiTiet dhct " +
            "JOIN SanPham s " +
            "on s.ma_san_pham = dhct.san_pham.ma_san_pham " +
            "JOIN DonHang dh " +
            "on dh.ma_don_hang = dhct.don_hang.ma_don_hang " +
            "WHERE s.ma_cua_hang = :ma_cua_hang " +
            "AND dhct.trang_thai.ma_trang_thai = :ma_trang_thai " +
            "AND dh.ma_hien_thi = :ma_hien_thi")
    List<DonHangChiTiet> sortDonHangChiTietByMaDonHang(int ma_cua_hang, int ma_trang_thai, String ma_hien_thi);

    //lấy thông tin chi tiết của một hóa đơn chi tiết
    @Query("SELECT dhct FROM DonHangChiTiet dhct " +
            "JOIN SanPham s " +
            "on s.ma_san_pham = dhct.san_pham.ma_san_pham " +
            "WHERE s.ma_cua_hang = :ma_cua_hang " +
            "AND dhct.ma_don_hang_chi_tiet = :ma_don_hang")
    DonHangChiTiet InfoDetailDonHangChiTiet(int ma_cua_hang, int ma_don_hang);

    @Query(value = "CALL GetDoanhThu(:ma_cua_hang, :ma_trang_thai)", nativeQuery = true)
    Double GetDoanhThu(@Param("ma_cua_hang") int maCuaHang, @Param("ma_trang_thai") int maTrangThai);


    //Đơn hàng moi theo 7 ngày gần nhất thuộc cửa hàng
    @Query(value = "SELECT dhct.* " +
            "FROM don_hang dh " +
            "JOIN don_hang_chi_tiet dhct ON dh.ma_don_hang = dhct.ma_don_hang " +
            "JOIN san_pham_view s ON s.ma_san_pham = dhct.ma_san_pham " +
            "JOIN voucher v ON v.id_voucher = dhct.id_voucher " +
            "WHERE dh.ngay_tao BETWEEN CURDATE() - INTERVAL 20 DAY AND CURDATE() " +
            "AND dhct.ma_trang_thai = :ma_trang_thai " +
            "AND s.ma_cua_hang = :ma_cua_hang", nativeQuery = true)
    List<DonHangChiTiet> findDonHangChiTiet(int ma_cua_hang, int ma_trang_thai);

    //    Đếm sô lượng hóa đơn chi ti theo mã trạng thái
    @Query("SELECT COUNT(s) FROM SanPham s " +
            "JOIN DonHangChiTiet dhct ON dhct.san_pham.ma_san_pham = s.ma_san_pham " +
            "JOIN CuaHang c ON c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :maCuaHang AND dhct.trang_thai.ma_trang_thai = :maTrangThai")
    long countProductsByStoreAndStatus(@Param("maCuaHang") int maCuaHang,
                                       @Param("maTrangThai") int maTrangThai);
    // Lấy danh sách đơn hàng theo mã người dùng
    @Query("select dhct from DonHangChiTiet dhct " +
            "join DonHang dh on dhct.don_hang.ma_don_hang = dh.ma_don_hang " +
            "where dh.tai_khoan.idTaiKhoan = :ma_tai_khoan " +
            "order by dh.ma_don_hang desc")
    List<DonHangChiTiet> getSanPhamByTaiKhoan(int ma_tai_khoan);

    //  Lấy danh sách đơn hàng theo trạng thái
    @Query("select dhct from DonHangChiTiet dhct " +
            "join DonHang dh on dhct.don_hang.ma_don_hang = dh.ma_don_hang " +
            "join SanPham sp on dhct.san_pham.ma_san_pham = sp.ma_san_pham " +
            "where dhct.trang_thai.ma_trang_thai = :ma_trang_thai and dh.tai_khoan.idTaiKhoan = :ma_tai_khoan")
    List<DonHangChiTiet> getDonHangChiTietByTTAndTK(int ma_tai_khoan, int ma_trang_thai);

//    lấy ra tổng đã bán của cửa hàng
    @Query("select sum(dhct.so_luong) from DonHangChiTiet dhct " +
            "join SanPham sp on sp.ma_san_pham = dhct.san_pham.ma_san_pham " +
            "join CuaHang ch on ch.ma_cua_hang = sp.cua_hang.ma_cua_hang " +
            "where ch.ma_cua_hang = :maCH")
    Integer sumLuotBanCuaCuaHang(int maCH);


    @Query("SELECT dhct FROM DonHangChiTiet dhct " +
            "JOIN SanPham s " +
            "on s.ma_san_pham = dhct.san_pham.ma_san_pham " +
            "WHERE s.ma_cua_hang = :ma_cua_hang")
    List<DonHangChiTiet> findDonHangChiTietByCuaHang(int ma_cua_hang);


    @Query( "SELECT dhct FROM DonHangChiTietView dhct " +
            "WHERE dhct.ma_cua_hang = :ma_cua_hang ")
    List<DonHangChiTietView> findOrderCountByStoreAndDate(int ma_cua_hang);

//    ADMIN - lấy hóa đơn theo trạng thái
    @Query("select dhct from DonHangChiTiet dhct where dhct.trang_thai.ma_trang_thai = :maTrangThai")
    List<DonHangChiTiet> getAllDonHangChiTietByTrangThai(int maTrangThai);


    @Query("SELECT d FROM DonHangChiTiet d WHERE d.don_hang.ma_don_hang = :maDonHang")
    List<DonHangChiTiet> findByDonHangId(@Param("maDonHang") int maDonHang);
    @Query("SELECT d FROM DonHangChiTiet d JOIN d.don_hang dh WHERE dh.tai_khoan.idTaiKhoan = :userId")
    List<DonHangChiTiet> findAllByUserId(@Param("userId") int userId);


    @Query(value = "SELECT dh.ngay_tao, dhct.so_luong " +
            "FROM don_hang dh " +
            "JOIN don_hang_chi_tiet dhct ON dh.ma_don_hang = dhct.ma_don_hang " +
            "JOIN san_pham s ON s.ma_san_pham = dhct.ma_san_pham " +
            "JOIN ( " +
            "    SELECT ma_san_pham " +
            "    FROM san_pham " +
            "    WHERE ma_cua_hang = :ma_cua_hang " +
            "    ORDER BY da_ban DESC " +
            "    LIMIT 3 " +
            ") AS top_san_pham ON s.ma_san_pham = top_san_pham.ma_san_pham " +
            "WHERE s.ma_cua_hang = :ma_cua_hang", nativeQuery = true)
    List<Object[]> findTopSellingProducts(int ma_cua_hang);
}
