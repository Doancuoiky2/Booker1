package com.example.booker.DTO;

public class TopCuaHangDTO {
    private Long idCuaHang;
    private String tenCuaHang;
    private String anhDaiDien;
    private String diaChiCuaHang;
    private String email;
    private String soDienThoai;
    private Long soLuongSanPham;

    public TopCuaHangDTO(
            Long idCuaHang,
            String tenCuaHang,
            String anhDaiDien,
            String diaChiCuaHang,
            String email,
            String soDienThoai,
            Long soLuongSanPham
    ) {
        this.idCuaHang = idCuaHang;
        this.tenCuaHang = tenCuaHang;
        this.anhDaiDien = anhDaiDien;
        this.diaChiCuaHang = diaChiCuaHang;
        this.email = email;
        this.soDienThoai = soDienThoai;
        this.soLuongSanPham = soLuongSanPham;
    }
}
