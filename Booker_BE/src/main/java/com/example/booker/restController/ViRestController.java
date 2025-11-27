package com.example.booker.restController;

import com.example.booker.entity.Vi;
import com.example.booker.service.nguoidung.ViService;
import com.example.booker.service.nguoidung.impl.ViServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vi")
@CrossOrigin("*")
public class ViRestController {

    @Autowired
    private ViService viService;
    @Autowired
    private ViServiceImpl viServiceImpl;

    // Tạo ví mới
    @PostMapping()
    public Vi create(@RequestBody Vi vi) {
        return viService.saveVi(vi);
    }

    // Lấy thông tin ví theo tài khoản ID
    @GetMapping("/by-tai-khoan/{idTaiKhoan}")
    public Vi getByTaiKhoan(@PathVariable int idTaiKhoan) {
        return viService.getViByTaiKhoan(idTaiKhoan);
    }

    // Cập nhật số tiền trong ví
    @PutMapping("/{idVi}")
    public void updateSoTien(@PathVariable String idVi, @RequestBody Float soTien) {
        viService.updateSoTien(idVi, soTien);
    }

    // Trừ tiền từ ví
    @PostMapping("/deductMoney")
    public ResponseEntity<?> deductMoney(@RequestParam String idVi, @RequestParam float amount) {
        try {
            viServiceImpl.truTien(idVi, amount);
            return ResponseEntity.ok("Trừ tiền thành công");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
