package com.example.booker.restController;

import com.example.booker.dao.PhanHoiDanhGiaDao;
import com.example.booker.entity.PhanHoiDanhGia;
import com.example.booker.request.ApiResponse;
import com.example.booker.service.nguoidung.PhanHoiDanhGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/phan-hoi-danh-gia")
public class PhanHoiDanhGiaRestController {

    @Autowired
    PhanHoiDanhGiaService phanHoiDanhGiaService;

    @Autowired
    PhanHoiDanhGiaDao phanHoiDanhGiaDao;

    @GetMapping("/cuahang-{id}/ma_danh_gia-{maDanhGia}")
    public PhanHoiDanhGia getPhanHoiDanhGia(@PathVariable int id, @PathVariable int maDanhGia) {
        return phanHoiDanhGiaDao.getPhanHoiDanhGiaByMaDanhGia(id, maDanhGia);
    }

    @PostMapping("/insert")
    public PhanHoiDanhGia createPhanHoiDanhGia(@RequestBody PhanHoiDanhGia phanHoiDanhGia) {
        return phanHoiDanhGiaService.create(phanHoiDanhGia);
    }

    @DeleteMapping("/delete-{id}")
    public ResponseEntity<ApiResponse<Void>> deletePhanHoiDanhGia(@PathVariable int id) {
        phanHoiDanhGiaService.deleteById(id);
        ApiResponse<Void> response = new ApiResponse<>();
        response.setMessage("Đã xóa thành công");
        return ResponseEntity.ok(response);
    }

}
