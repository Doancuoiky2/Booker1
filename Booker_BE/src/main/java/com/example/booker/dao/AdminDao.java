package com.example.booker.dao;


import com.example.booker.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AdminDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Admin getAdminStatistics() {
        // Truy vấn doanh thu sàn
        String doanhThuSanQuery = "SELECT IFNULL(SUM(phi_dich_vu), 0) FROM don_hang_chi_tiet WHERE ma_trang_thai = '13'";
        Float doanhThuSan = jdbcTemplate.queryForObject(doanhThuSanQuery, Float.class);

        // Truy vấn tổng nạp
        String tongTienNapQuery = "SELECT IFNULL(SUM(amount), 0) FROM transaction";
        Float tongTienNap = jdbcTemplate.queryForObject(tongTienNapQuery, Float.class);

        // Truy vấn tổng rút
        String tongTienRutQuery = "SELECT IFNULL(SUM(so_tien), 0) FROM giao_dich_cua_hang WHERE trang_thai = 1";
        Float tongTienRut = jdbcTemplate.queryForObject(tongTienRutQuery, Float.class);

        String doanhThuCuHangQuery = "SELECT IFNULL(SUM(doanh_thu), 0) FROM don_hang_chi_tiet WHERE ma_trang_thai = '13'";
        Float doanhThuCuaHang = jdbcTemplate.queryForObject(doanhThuCuHangQuery, Float.class);

        // Trả về DTO chứa các giá trị
        return new Admin( tongTienNap, tongTienRut,doanhThuSan, doanhThuCuaHang);
    }
}