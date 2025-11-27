package com.example.booker.service.nguoidung.impl;

import com.example.booker.dao.CuaHangDao;
import com.example.booker.dao.CuaHangViewDao;
import com.example.booker.entity.CuaHang;
import com.example.booker.service.nguoidung.CuaHangService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CuaHangServiceImpl implements CuaHangService {

    @Autowired
    private CuaHangDao cuaHangDao;

    @Autowired
    private CuaHangViewDao cuaHangViewDao;

    @Override
    public CuaHang createCuaHang(CuaHang cuaHang) {
        return cuaHangDao.save(cuaHang);
    }

    @Override
    public CuaHang updateCuaHang(CuaHang cuaHang) {
        return cuaHangDao.save(cuaHang);
    }

//    @Override
//    public CuaHang khoaCuaHang(int id, CuaHang cuaHang){
//        CuaHang settting_cuaHang = cuaHangDao.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Cua hang kho ton tai id: " + id));
//        settting_cuaHang.setTrang_thai_khoa(true);
//        return cuaHangDao.save(settting_cuaHang);
//    }

    @Override
    public List<CuaHang> getAllCuaHang() {
        return cuaHangDao.findAll();
    }

//    @Override
//    public CuaHang getCuaHangById(int id) {
//        return cuaHangViewDao.getCuaHangView(id);
//    }

    @Override
    public void deleteCuaHang(int id) {
        cuaHangDao.deleteById(id);
    }

    @Override
    public CuaHang getCuaHangById(int id) {
        return cuaHangDao.findById(id).orElse(null);
    }
}
