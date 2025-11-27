package com.example.booker.service.nguoidung.impl;

import com.example.booker.dao.TaiKhoanDao;
import com.example.booker.entity.TaiKhoan;
import com.example.booker.service.nguoidung.TaiKhoanService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanServicelmpl implements TaiKhoanService {
    @Autowired
    TaiKhoanDao taiKhoanDao;

    //    Tạo Bcrypt để mã hóa mật khẩu
    BCryptPasswordEncoder maHoaMatKhau = new BCryptPasswordEncoder();

    @Override
    public List<TaiKhoan> getTaiKhoans() {
        List<TaiKhoan> taiKhoans = taiKhoanDao.findAll();
        return taiKhoans;
    }


    @Override
    public TaiKhoan getTaiKhoanById(int id) {
        return taiKhoanDao.findById(id).orElse(null);
    }
    @Override
    public TaiKhoan getByEmail(String email) {
        return taiKhoanDao.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại với email: " + email));

    }

    @Override
    public TaiKhoan saveTaikhoan(TaiKhoan taiKhoan){
           if(taiKhoanDao.existsByEmail(taiKhoan.getEmail())){
               throw new RuntimeException("Email tài khoản đã tồn taị");
           }
           return taiKhoanDao.save(taiKhoan);
    }
    @Override
    public TaiKhoan updateTaikhoan(int id, TaiKhoan taiKhoan){
        return taiKhoanDao.save(taiKhoan);
    }

    @Override
    public TaiKhoan vohieuhoa_khachhang(int id, TaiKhoan taiKhoan){
        TaiKhoan existingTaiKhoan = taiKhoanDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));
         existingTaiKhoan.setTrang_thai_tk(true);
       // Lưu lại đối tượng đã cập nhật
        return taiKhoanDao.save(existingTaiKhoan);

    }


    @Override
    public void deleteById(int id){
        try {
            taiKhoanDao.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            throw new EntityNotFoundException("not tk id: " + id);
        }
    }
    @Override
    public TaiKhoan validateLogin(String email, String matKhau) {
        Optional<TaiKhoan> optionalUser = taiKhoanDao.findByEmail(email);

        // Kiểm tra nếu tài khoản tồn tại và mật khẩu khớp
        if (optionalUser.isPresent()) {
            TaiKhoan user = optionalUser.get();
            if (maHoaMatKhau.matches(matKhau, user.getMat_khau())) { // Kiểm tra mật khẩu
                return user; // Đăng nhập thành công
            }
        }
        return null; // Đăng nhập thất bại
    }
    @Override
    public TaiKhoan saveTaiKhoan(TaiKhoan taiKhoan) {
        if (taiKhoanDao.existsByEmail(taiKhoan.getEmail())) {
            throw new RuntimeException("Email đã tồn tại.");
        }
        return taiKhoanDao.save(taiKhoan);
    }
    @Override
    public boolean changePassword(int idTaiKhoan, String oldPassword, String newPassword) {
        // Tìm tài khoản theo id
        TaiKhoan taiKhoan = taiKhoanDao.findById(idTaiKhoan)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        // Kiểm tra mật khẩu cũ
        if (!maHoaMatKhau.matches(oldPassword, taiKhoan.getMat_khau())) {
            return false; // Mật khẩu cũ không đúng
        }

        // Cập nhật mật khẩu mới
        taiKhoan.setMat_khau(maHoaMatKhau.encode(newPassword));
        taiKhoanDao.save(taiKhoan);
        return true;
    }
    public boolean existsByEmail(String email) {
        return taiKhoanDao.existsByEmail(email); // Kiểm tra sự tồn tại của email trong database
    }


}
