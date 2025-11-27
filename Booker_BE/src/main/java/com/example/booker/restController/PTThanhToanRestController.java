package com.example.booker.restController;

import com.example.booker.dao.PhuongThucThanhToanDao;
import com.example.booker.entity.PhuongThucThanhToan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/phuongthuc")
public class PTThanhToanRestController {

    @Autowired
    PhuongThucThanhToanDao ptThanhToanDao;

    @GetMapping("/getAllPhuongThuc")
    public ResponseEntity<List<PhuongThucThanhToan>> getAllPhuongThuc() {
        return ResponseEntity.ok(ptThanhToanDao.findAll());
    }
}
