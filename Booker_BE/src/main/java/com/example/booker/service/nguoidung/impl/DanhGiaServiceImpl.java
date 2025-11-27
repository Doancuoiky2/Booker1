package com.example.booker.service.nguoidung.impl;

import com.example.booker.dao.DanhGiaDao;
import com.example.booker.entity.DanhGia;
import com.example.booker.service.nguoidung.DanhGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DanhGiaServiceImpl implements DanhGiaService {

    @Autowired
    private DanhGiaDao danhGiaDao;

    @Override
    public List<DanhGia> getDanhGiaList(int maSp) {
        return danhGiaDao.findByMaSanPham(maSp);
    }

    @Override
    public DanhGia saveDanhGia(DanhGia danhGia) {
        return danhGiaDao.save(danhGia);
    }
}
