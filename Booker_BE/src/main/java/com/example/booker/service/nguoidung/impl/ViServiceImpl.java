package com.example.booker.service.nguoidung.impl;

import com.example.booker.dao.ViDao;
import com.example.booker.entity.Vi;
import com.example.booker.service.nguoidung.ViService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ViServiceImpl implements ViService {

    @Autowired
    private ViDao viDao;

    @Override
    public Vi saveVi(Vi vi) {
        return viDao.save(vi);
    }

    @Override
    public Vi getViByTaiKhoan(int idTaiKhoan) {
        Vi vi = viDao.findByTaiKhoan(idTaiKhoan);
        if (vi == null) {
            throw new RuntimeException("Không tìm thấy ví cho tài khoản ID: " + idTaiKhoan);
        }
        return vi;
    }

    @Transactional
    public void updateSoTien(String idVi, Float soTien) {
        // Truy vấn bằng idVi dạng String
        Vi vi = viDao.findById(idVi)
                .orElseThrow(() -> new RuntimeException("Ví không tồn tại với id: " + idVi));
        vi.setSo_tien(soTien); // Cập nhật số tiền
        viDao.save(vi);        // Lưu lại thay đổi
    }
    @Transactional
    public void truTien(String idVi, float amount) {
        // Tìm ví dựa trên idVi
        Vi vi = viDao.findById(idVi)
                .orElseThrow(() -> new IllegalArgumentException("Ví không tồn tại với id: " + idVi));

        // Kiểm tra số dư
        if (vi.getSo_tien() < amount) {
            throw new IllegalArgumentException("Số dư không đủ để thực hiện giao dịch");
        }

        // Trừ tiền
        vi.setSo_tien(vi.getSo_tien() - amount);

        // Cập nhật lại ví
        viDao.save(vi);
    }



}
