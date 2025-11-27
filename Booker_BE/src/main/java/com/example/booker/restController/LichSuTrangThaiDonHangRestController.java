package com.example.booker.restController;

import com.example.booker.DTO.LichSuTrangThaiDonHangDTO;
import com.example.booker.dao.DonHangChiTietDao;
import com.example.booker.dao.LichSuTrangThaiDonHangDao;
import com.example.booker.entity.DonHangChiTiet;
import com.example.booker.entity.LichSuTrangThaiDonHang;
import com.example.booker.request.ApiResponse;
import com.example.booker.service.nguoidung.LichSuTrangThaiDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/lichsu_trangthai_donhang")
public class LichSuTrangThaiDonHangRestController {
    @Autowired
    LichSuTrangThaiDonHangService lichSuTrangThaiDonHangService;

    @Autowired
    DonHangChiTietDao donHangChiTietDao;
    @Autowired
    LichSuTrangThaiDonHangDao lichSuTrangThaiDonHangDao;

    @GetMapping("/find-all/{idDonHangChiTiet}")
    public List<LichSuTrangThaiDonHang> findAll(@PathVariable int idDonHangChiTiet){
        return lichSuTrangThaiDonHangDao.findAllByDonHangChiTietIdOrderByIdDesc(idDonHangChiTiet);
    }


    @PostMapping
    public ResponseEntity<LichSuTrangThaiDonHang> create(@RequestBody LichSuTrangThaiDonHangDTO dto) {
        // Tìm DonHangChiTiet tương ứng
        DonHangChiTiet donHangChiTiet = donHangChiTietDao
                .findById(dto.getDonHangChiTietId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng chi tiết"));

        // Tạo entity mới
        LichSuTrangThaiDonHang entity = new LichSuTrangThaiDonHang();
        entity.setStatus(dto.getStatus());
        entity.setMessage(dto.getMessage());
        entity.setDonHangChiTiet(donHangChiTiet);

        lichSuTrangThaiDonHangDao.save(entity);

        return ResponseEntity.ok(entity);
    }

}
