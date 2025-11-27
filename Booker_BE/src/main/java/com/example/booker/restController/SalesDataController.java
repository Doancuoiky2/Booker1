package com.example.booker.restController;

import com.example.booker.service.nguoidung.SalesDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sales")
public class SalesDataController {

    @Autowired
    private SalesDataService salesDataService;

    @GetMapping("/last7days")
    public List<Map<String, Object>> getSalesDataLast7Days() {
        return salesDataService.getSalesData();
    }
}
