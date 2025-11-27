package com.example.booker.restController;

import com.example.booker.dao.ViPhamDao;
import com.example.booker.entity.ViPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/vi_pham")
@CrossOrigin("*")
public class ViPhamRestController {
    @Autowired
    ViPhamDao viphamDao;

    @GetMapping("/all_vipham")
    public List<ViPham> getAllViPham() {return viphamDao.findAll();}

    @GetMapping("/{id}")
    public ViPham getViPhamById(@PathVariable int id) {return viphamDao.getViPhamById(id);}
}
