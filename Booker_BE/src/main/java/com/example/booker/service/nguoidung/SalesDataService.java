package com.example.booker.service.nguoidung;

import com.example.booker.dao.SalesDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SalesDataService {

    @Autowired
    private SalesDataRepository salesDataRepository;

    public List<Map<String, Object>> getSalesData() {
        List<Object[]> results = salesDataRepository.getSalesDataLast7Days();
        List<Map<String, Object>> salesData = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> record = new HashMap<>();
            record.put("sale_date", ((java.sql.Date) row[0]).toLocalDate());
            record.put("ma_san_pham", row[1]);
            record.put("total_sales", row[2]);

            salesData.add(record);
        }

        return salesData;
    }
}
