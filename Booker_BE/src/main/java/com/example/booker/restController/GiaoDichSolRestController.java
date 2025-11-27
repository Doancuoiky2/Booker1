package com.example.booker.restController;

import com.example.booker.dao.GiaoDichSolDao;
import com.example.booker.entity.GiaoDichSol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/giao_dich_sol")
public class GiaoDichSolRestController {

    @Autowired
    GiaoDichSolDao giaoDichSolDao;

    @GetMapping("/get")
    public List<GiaoDichSol> findAll() {
        return giaoDichSolDao.findAll();
    }

    @PostMapping
    public GiaoDichSol save(@RequestBody GiaoDichSol giaoDichSol) {
        return giaoDichSolDao.save(giaoDichSol);
    }
}
