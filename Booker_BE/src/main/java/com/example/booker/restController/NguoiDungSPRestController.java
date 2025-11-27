package com.example.booker.restController;

import com.example.booker.dao.DanhGiaDao;
import com.example.booker.dao.DonHangChiTietDao;
import com.example.booker.dao.SanPhamDao;
import com.example.booker.dao.TaiKhoanDao;
import com.example.booker.entity.DanhGia;
import com.example.booker.entity.DonHangChiTiet;
import com.example.booker.entity.SanPham;
import com.example.booker.entity.TaiKhoan;
import com.example.booker.service.nguoidung.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/sanpham")
public class NguoiDungSPRestController {

    @Autowired
    SanPhamService sanPhamService;

    @Autowired
    SanPhamDao sanPhamDao;

    @Autowired
    TaiKhoanDao taiKhoanDao;

    @Autowired
    DonHangChiTietDao donHangChiTietDao;

    @Autowired
    DanhGiaDao danhGiaDao;

    @GetMapping("/{keyword}")
    public ResponseEntity<List<SanPham>> getSanPhamByKeyword(@PathVariable String keyword) {
        if (sanPhamService.findSanPhamByKeyword(keyword) != null) {
            return ResponseEntity.ok(sanPhamService.findSanPhamByKeyword(keyword));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{minPrice}-{maxPrice}/orderBy-{orderBy}/theloai")
    public ResponseEntity<List<SanPham>> getSanPhamByTheLoaiAndGia(@RequestParam(value = "ma_the_loai", required = false) List<Integer> the_loais,
                                   @PathVariable(value = "minPrice", required = false) Float minPrice, @PathVariable(value = "maxPrice", required = false) Float maxPrice, @PathVariable("orderBy") String orderBy) {
        return ResponseEntity.ok(sanPhamService.findSanPhamByTheLoaiAndGiaOrderBy(the_loais.isEmpty() ? null : the_loais, minPrice, maxPrice, orderBy));
    }

    @PostMapping("/danhgia/taikhoan-{tkid}/sanpham-{spid}/dhct-{dhctid}")
    public ResponseEntity<DanhGia> addDanhGia(@RequestBody DanhGia danhGia, @PathVariable int tkid, @PathVariable int spid, @PathVariable int dhctid) {
        if ((taiKhoanDao.existsById(tkid)) && (sanPhamDao.existsById(spid)) && (donHangChiTietDao.existsById(dhctid))) {
            TaiKhoan currentTK = taiKhoanDao.findById(tkid).get();
            SanPham sanPhamDanhGia = sanPhamDao.findById(spid).get();
            DonHangChiTiet dhctDanhGia = donHangChiTietDao.findById(dhctid).get();
            danhGia.setTai_khoan_danh_gia(currentTK);
            danhGia.setSan_pham(sanPhamDanhGia);
            danhGia.setDon_hang_chi_tiet(dhctDanhGia);
            danhGiaDao.save(danhGia);
            return ResponseEntity.ok(danhGia);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}
