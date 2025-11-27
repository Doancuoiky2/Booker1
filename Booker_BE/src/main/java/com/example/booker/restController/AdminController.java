package com.example.booker.restController;

import com.example.booker.dao.AdminDao;
import com.example.booker.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/thongkesan")
public class AdminController {

    @Autowired
    AdminDao adminDao;

    @GetMapping
    public Admin getAdmin() {
        return adminDao.getAdminStatistics();
    }
}
