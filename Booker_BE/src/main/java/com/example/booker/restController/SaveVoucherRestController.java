package com.example.booker.restController;

import com.example.booker.dao.SaveVoucherDao;
import com.example.booker.dao.TaiKhoanDao;
import com.example.booker.dao.VoucherDao;
import com.example.booker.entity.SaveVoucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/save-voucher")
public class SaveVoucherRestController {

    @Autowired
    SaveVoucherDao saveVoucherDao;

    @Autowired
    VoucherDao voucherDao;

    @Autowired
    TaiKhoanDao taiKhoanDao;

//    @PostMapping()
//    public SaveVoucher saveVoucher(@RequestBody SaveVoucher saveVoucher) {
//        return saveVoucherDao.save(saveVoucher);
//    }

    @PostMapping("")
    public ResponseEntity<?> saveVoucher(@RequestBody Map<String, Integer> payload) {
        int idVoucher = payload.get("id_voucher");
        int idTaiKhoan = payload.get("id_tai_khoan");

        if (saveVoucherDao.existsByVoucher_IdVoucherAndTaiKhoan_IdTaiKhoan(idVoucher, idTaiKhoan)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Voucher này đã được lưu trước đó.");
        }

        SaveVoucher saveVoucher = new SaveVoucher();
        saveVoucher.setVoucher(voucherDao.findById(idVoucher).orElseThrow());
        saveVoucher.setTaiKhoan(taiKhoanDao.findById(idTaiKhoan).orElseThrow());

        SaveVoucher saved = saveVoucherDao.save(saveVoucher);
        return ResponseEntity.ok(saved);
    }


    @GetMapping("/get-{id_tk}")
    public List<SaveVoucher> getAllVouchers(@PathVariable int id_tk) {
        return saveVoucherDao.findVoucherByIdTaiKhoan(id_tk);
    }

    @GetMapping("/{id_tk}/{ma_cua_hang}")
    public List<SaveVoucher> getVoucher(@PathVariable int ma_cua_hang, @PathVariable int id_tk) {
        return saveVoucherDao.timKiemVoucherByMaCuaHang(ma_cua_hang, id_tk);
    }

    @DeleteMapping("")
    @Transactional
    public ResponseEntity<?> deleteSavedVoucher(@RequestParam("id_voucher") int idVoucher,
                                                @RequestParam("id_tai_khoan") int idTaiKhoan) {
        // Kiểm tra xem có tồn tại bản ghi không
        boolean exists = saveVoucherDao.existsByVoucher_IdVoucherAndTaiKhoan_IdTaiKhoan(idVoucher, idTaiKhoan);

        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Voucher này chưa được lưu trong tài khoản.");
        }

        // Nếu có, thì tiến hành xóa
        saveVoucherDao.deleteByVoucher_IdVoucherAndTaiKhoan_IdTaiKhoan(idVoucher, idTaiKhoan);

        return ResponseEntity.ok("Xóa voucher đã lưu thành công!");
    }

}
