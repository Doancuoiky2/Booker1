package com.example.booker.service.nguoidung.impl;


import com.example.booker.dao.PhanHoiDanhGiaDao;
import com.example.booker.entity.PhanHoiDanhGia;
import com.example.booker.service.nguoidung.PhanHoiDanhGiaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;


@Service
public class PhanHoiDanhGiaImpl implements PhanHoiDanhGiaService {

    @Autowired
    PhanHoiDanhGiaDao phanHoiDanhGiaDao;

    @Override
    public PhanHoiDanhGia getPhanHoiGia(int maCuaHang, int maDanhGia) {
        return phanHoiDanhGiaDao.getPhanHoiDanhGiaByMaDanhGia(maDanhGia, maCuaHang);
    }

    @Override
    public PhanHoiDanhGia create(PhanHoiDanhGia phanHoiGia) {
        return phanHoiDanhGiaDao.save(phanHoiGia);
    }

    @Override
    public void deleteById(int maPhanHoi) {
        try {
            phanHoiDanhGiaDao.deleteById(maPhanHoi);
        } catch (EmptyResultDataAccessException ex) {
            throw new EntityNotFoundException("PhanHoi not found with id: " + maPhanHoi);
        }
    }

}
