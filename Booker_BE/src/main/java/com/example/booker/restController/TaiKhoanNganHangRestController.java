package com.example.booker.restController;

import com.example.booker.dao.TaiKhoanNganHangDao;
import com.example.booker.entity.TaiKhoanNganHang;
import com.example.booker.service.nguoidung.SanPhamService;
import com.example.booker.service.nguoidung.TaiKhoanNganHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/tai-khoan-ngan-hang")
public class TaiKhoanNganHangRestController {

    @Autowired
    TaiKhoanNganHangService taiKhoanNganHangService;

    @Autowired
    TaiKhoanNganHangDao taiKhoanNganHangDao;


    @PostMapping("/save")
    public TaiKhoanNganHang save(@RequestBody TaiKhoanNganHang bank) {
        return taiKhoanNganHangService.create(bank);
    }

    @PutMapping("/update")
    public TaiKhoanNganHang update(@RequestBody TaiKhoanNganHang nh) {
        return taiKhoanNganHangService.update( nh);
    }

    @GetMapping("/my_bank/{maCh}")
    public TaiKhoanNganHang getMyBank(@PathVariable int maCh) {
        return taiKhoanNganHangDao.findByMaCuaHang(maCh);
    }

}
