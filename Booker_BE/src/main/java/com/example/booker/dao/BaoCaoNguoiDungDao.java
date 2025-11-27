package com.example.booker.dao;

import com.example.booker.entity.BaoCaoCuaHang;
import com.example.booker.entity.BaoCaoNguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BaoCaoNguoiDungDao extends JpaRepository<BaoCaoNguoiDung, Integer> {
    //     Phương thức get list bao cao theo id cửa hàng bị báo cáo
    @Query("SELECT b FROM BaoCaoNguoiDung b WHERE b.ma_cua_hang_bi_bao_cao.ma_cua_hang = :macuahang AND b.trang_thai_bao_cao NOT IN (1, 4)")
    List<BaoCaoNguoiDung> findThongbaochocauhang(int macuahang);
}
