package com.example.booker.restController;

import com.example.booker.dao.SanPhamDao;
import com.example.booker.entity.SanPham;
import com.example.booker.service.nguoidung.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/product")
public class CTSanPhamRestController {

    @Autowired
    SanPhamService sanPhamService;

    @Autowired
    SanPhamDao sanPhamDao;

    @GetMapping("/{id}")
    public ResponseEntity<SanPham> getSanPham(@PathVariable int id) {
        if (!sanPhamDao.existsById(id)) {
            throw new RuntimeException("Not found");
        } else {
            return ResponseEntity.ok(sanPhamService.findById(id));
        }
    }

    @GetMapping("/theloai-{id}")
    public ResponseEntity<List<SanPham>> getSanPhamByTheLoai(@PathVariable int id) {
        return ResponseEntity.ok(sanPhamService.getSanPhamByTheLoai(id));
    }

}
