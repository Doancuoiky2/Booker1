package com.example.booker.service.nguoidung.impl;

import com.example.booker.dao.LichSuTrangThaiDonHangDao;
import com.example.booker.entity.LichSuTrangThaiDonHang;
import com.example.booker.service.nguoidung.LichSuTrangThaiDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LichSuTrangThaiDonHangServiceImpl implements LichSuTrangThaiDonHangService {

    @Autowired
    private LichSuTrangThaiDonHangDao lichSuTrangThaiDonHangDao;

    @Override
    public LichSuTrangThaiDonHang create(LichSuTrangThaiDonHang item) {
        return lichSuTrangThaiDonHangDao.save(item);
    }
}

