package com.example.booker.service.nguoidung.impl;

import com.example.booker.dao.GiaoDichCuaHangDao;
import com.example.booker.entity.GiaoDichCuaHang;
import com.example.booker.service.nguoidung.GiaoDichNguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GiaoDichNguoiDungServiceImpl implements GiaoDichNguoiDungService {

    @Autowired
    GiaoDichCuaHangDao giaoDichCuaHangDao;

    @Override
    public List<GiaoDichCuaHang> getGiaoDichCuaHang() {
        return giaoDichCuaHangDao.findAll();
    }

    @Override
    public GiaoDichCuaHang create(GiaoDichCuaHang gd) {
        return giaoDichCuaHangDao.save(gd);
    }

    @Override
    public GiaoDichCuaHang update(GiaoDichCuaHang gd) {
        return giaoDichCuaHangDao.save(gd);
    }

    @Override
    public List<GiaoDichCuaHang> getGIaoDichCuaHangByTrangThai(int tt) {
        return giaoDichCuaHangDao.getGiaoDichCuaHangByTrang_thai(tt);
    }
}
