package com.example.booker.service.nguoidung.impl;

import com.example.booker.dao.DonHangDao;
import com.example.booker.entity.DonHang;
import com.example.booker.service.nguoidung.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DonHangServiceImpl implements DonHangService {
    @Autowired
    private DonHangDao donHangDao;

    @Override
    public boolean isExistDonHang(int ma_tai_khoan, Date createDate, int trang_thai) {
        return donHangDao.getDonHangByTaikhoanAndCreatedate(ma_tai_khoan, createDate, trang_thai) != new DonHang();
    }
}
