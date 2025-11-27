package com.example.booker.dao;
import com.example.booker.entity.BaoCaoCuaHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface  BaoCaoCuaHangDao extends JpaRepository<BaoCaoCuaHang, Integer> {
    //     Phương thức get list bao cao theo id_nguoi bị báo cáo
//    @Query("SELECT b FROM BaoCaoCuaHang b WHERE b.tai_khoan_bi_bao_cao.id_tai_khoan = :idtaikhoan AND b.trang_thai_bao_cao.id_trang_thai_bao_cao NOT IN (1, 4)")
//    List<BaoCaoCuaHang> findThongbaochotaikhoan(int idtaikhoan);

//    lấy báo cáo đang xử lý và ko hợp leej - SELLER
    @Query("select bcch from BaoCaoCuaHang bcch where bcch.cua_hang_bao_cao.ma_cua_hang = :maCH and bcch.trang_thai_bao_cao.id_trang_thai_bao_cao = :tt")
    List<BaoCaoCuaHang> findBaoCaoCuaHangByTrangThaiAndMaCH(int maCH, int tt);

//    lấy list báo cáo đã duyệt - SELLER
    @Query("select bcch from BaoCaoCuaHang bcch where bcch.cua_hang_bao_cao.ma_cua_hang = :maCH and (bcch.trang_thai_bao_cao.id_trang_thai_bao_cao = 2 or bcch.trang_thai_bao_cao.id_trang_thai_bao_cao = 4 or bcch.trang_thai_bao_cao.id_trang_thai_bao_cao = 5)")
    List<BaoCaoCuaHang> findBaoCaoCuaHangByTrangThaiAndMaCHIsDuyet(int maCH);

//    Đếm tất cả báo cáo - SELLER
    @Query("select count(bc) from BaoCaoCuaHang bc where bc.cua_hang_bao_cao.ma_cua_hang = :maCH")
    Long countBaoCaoCuaHang(Integer maCH);

    //    Đếm tất cả báo cáo - ADMIN
    @Query("select count(bc) from BaoCaoCuaHang bc")
    Long countBaoCaoCuaHangForAdmin();

//    ADMIN - lấy báo cáo mới hoặc đã hủy
    @Query("select bc from BaoCaoCuaHang bc where bc.trang_thai_bao_cao.id_trang_thai_bao_cao = :tt")
    List<BaoCaoCuaHang> getBaoCaoCuaHangByTTAdmin(int tt);

    //    ADMIN - lấy báo cáo đã duyêt
    @Query("select bc from BaoCaoCuaHang bc where bc.trang_thai_bao_cao.id_trang_thai_bao_cao = 2 or bc.trang_thai_bao_cao.id_trang_thai_bao_cao = 4 or bc.trang_thai_bao_cao.id_trang_thai_bao_cao = 5")
    List<BaoCaoCuaHang> getBaoCaoCuaHangByDuyetAdmin();

//    lấy thông tin chi tiết của báo cáo
    @Query("select bc from BaoCaoCuaHang bc where bc.id_bao_cao = :id")
    BaoCaoCuaHang getBaoCaoCuaHangById(int id);

////     Phương thức get list bao cao theo id_nguoi bị báo cáo
//@Query("SELECT b FROM BaoCaoCuaHang b WHERE b.tai_khoan_bi_bao_cao.id_tai_khoan = :idtaikhoan AND (b.trang_thai_bao_cao.id_trang_thai_bao_cao IS NULL OR b.trang_thai_bao_cao.id_trang_thai_bao_cao NOT IN (1, 4))")
//List<BaoCaoCuaHang> findThongbaochotaikhoan(int idtaikhoan);


}
