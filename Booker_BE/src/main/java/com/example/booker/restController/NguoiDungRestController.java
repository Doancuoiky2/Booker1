package com.example.booker.restController;

import com.example.booker.dao.*;
import com.example.booker.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/nguoidung")
public class NguoiDungRestController {
    @Autowired
    TaiKhoanDao taikhoanDao;
    @Autowired
    TrangThaiDonHangDao ttDhDao;
    @Autowired
    DonHangDao donHangDao;
    @Autowired
    DonHangChiTietDao donHangChiTietDao;
    @Autowired
    DiaChiDao diaChiDao;
    @Autowired
    CuaHangDao cuaHangDao;
    @Autowired
    VaiTroDao vaiTroDao;
    @Autowired
    HuyDonHangDao huyDonHangDao;

    @GetMapping("/{id}")
    public ResponseEntity<TaiKhoan> getThongTin(@PathVariable int id) {
        if (taikhoanDao.existsById(id)) {
            return ResponseEntity.ok(taikhoanDao.findById(id).get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

//  Thêm cửa hàng
@PostMapping("/dangkiNB-{nguoidung_id}")
public ResponseEntity<CuaHang> addCuaHang(@RequestBody CuaHang cuaHang, @PathVariable int nguoidung_id) {
    if (taikhoanDao.existsById(nguoidung_id)) {
        TaiKhoan tkLogined = taikhoanDao.findById(nguoidung_id).get();

        VaiTro vaiTroND = vaiTroDao.findById(2).orElse(null);
        if (vaiTroND != null) {
            tkLogined.setVai_tro(vaiTroND);
        }

        cuaHang.setTai_khoan(tkLogined);

        CuaHang newCuaHang = new CuaHang();
        newCuaHang.setTen_cua_hang(cuaHang.getTen_cua_hang());
        newCuaHang.setDia_chi_cua_hang(cuaHang.getDia_chi_cua_hang());
        newCuaHang.setEmail(cuaHang.getEmail());
        newCuaHang.setSo_dien_thoai(cuaHang.getSo_dien_thoai());
        newCuaHang.setTai_khoan(tkLogined);

        // Lưu URL ảnh nhận từ frontend
        newCuaHang.setAnh_dai_dien(cuaHang.getAnh_dai_dien());
        newCuaHang.setAnh_bia(cuaHang.getAnh_bia());

        cuaHangDao.save(newCuaHang);
        taikhoanDao.save(tkLogined);

        return ResponseEntity.ok(newCuaHang);
    } else {
        return ResponseEntity.notFound().build();
    }
}



//  Cập nhật thông tin tài khoản(bao gồm đổi mật khẩu)
    @PutMapping("/{id}")
    public ResponseEntity<TaiKhoan> updateThongTin(@RequestBody TaiKhoan taikhoan, @PathVariable int id) {
        return ResponseEntity.ok(taikhoanDao.save(taikhoan));
    }

    @GetMapping("/diachi-{id}")
    public ResponseEntity<DiaChi> getDiaChi(@PathVariable int id) {
        return ResponseEntity.ok(diaChiDao.findById(id).get());
    }

//  Lấy danh sách địa chỉ
    @GetMapping("/diachi/{nguoidung_id}")
    public ResponseEntity<List<DiaChi>> getDanhSachDiaChi(@PathVariable int nguoidung_id) {
        if (taikhoanDao.existsById(nguoidung_id)) {
            return ResponseEntity.ok(diaChiDao.getListDiaChi(nguoidung_id));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

//  Lấy địa chỉ mặc định(chỉ hiển thị 1 địa chỉ)
    @GetMapping("/diachi/default/{nguoidung_id}")
    public ResponseEntity<DiaChi> getDefaultDiaChi(@PathVariable int nguoidung_id) {
        if (taikhoanDao.existsById(nguoidung_id)) {
            return ResponseEntity.ok(diaChiDao.getDefaultDiaChi(nguoidung_id));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

//  Thêm địa chỉ
    @PostMapping("/diachi/nguoidung-{id}")
    public ResponseEntity<DiaChi> addDiaChi(@RequestBody DiaChi diaChi, @PathVariable("id") int id) {
        TaiKhoan tkNguoiDung = taikhoanDao.findById(id).get();
        diaChi.setTai_khoan(tkNguoiDung);
        diaChiDao.save(diaChi);
        return ResponseEntity.ok(diaChi);
    }

//  Cập nhật địa chỉ
    @PutMapping("/{nguoidung_id}/diachi-{dia_chi_id}")
    public ResponseEntity<DiaChi> updateDiaChi(@RequestBody DiaChi diaChi, @PathVariable int nguoidung_id, @PathVariable int dia_chi_id) {
        if (diaChiDao.existsById(dia_chi_id)) {
            TaiKhoan tkNguoiDung = taikhoanDao.findById(nguoidung_id).get();
            diaChi.setTai_khoan(tkNguoiDung);
            diaChiDao.save(diaChi);
            return ResponseEntity.ok(diaChi);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{nguoidung_id}/diachi-{dia_chi_id}")
    public ResponseEntity<Void> deleteDiaChi(@PathVariable int nguoidung_id, @PathVariable int dia_chi_id) {
        if (diaChiDao.existsById(dia_chi_id)) {
            diaChiDao.deleteById(dia_chi_id);
            return ResponseEntity.ok().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

//  Lịch sử đơn hàng
    @GetMapping("/{id}/trangthai-{ma_trang_thai}")
    public ResponseEntity<List<DonHangChiTiet>> getDonHangChiTietByTrangThai(@PathVariable int id, @PathVariable int ma_trang_thai) {
        if (!donHangChiTietDao.getDonHangChiTietByTTAndTK(id, ma_trang_thai).isEmpty()) {
            return ResponseEntity.ok(donHangChiTietDao.getDonHangChiTietByTTAndTK(id, ma_trang_thai));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

//  Hủy đơn hàng
    @PostMapping("/huydonhang/{donHangId}")
    public ResponseEntity<HuyDonHang> addDonHangBiHuy(@RequestBody HuyDonHang huyDonHang, @PathVariable int donHangId) {
        if (donHangDao.existsById(donHangId)) {
//            Lấy đơn hàng bị hủy
            DonHang donHangBiHuy = donHangDao.findById(donHangId).get();
//            Lấy từng đơn hàng chi tiết bị hủy để thay đổi trạng thái
            List<DonHangChiTiet> dhctBiHuy = donHangBiHuy.getDonHangChiTiets();
//            Lấy trạng thái đơn hàng bị khách hủy(14)
            TrangThaiDonHang ttKhHuy = ttDhDao.findById(14).get();
//            Set tt đơn hàng vừa lấy vào dhct
            dhctBiHuy.forEach(dhct -> {
                dhct.setTrang_thai(ttKhHuy);
            });
//            Lưu lại trạng thái dhct vừa cập nhật
            donHangChiTietDao.saveAll(dhctBiHuy);
//            Set đơn hàng bị hủy vào bảng Hủy đơn hàng
            huyDonHang.setDonHang(donHangBiHuy);
//            Lưu thông tin đơn hàng bị hủy gồm lý do và mã đơn hàng
            huyDonHangDao.save(huyDonHang);
            return ResponseEntity.ok(huyDonHang);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

}
