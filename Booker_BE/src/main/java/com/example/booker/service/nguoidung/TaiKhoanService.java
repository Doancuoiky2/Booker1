package com.example.booker.service.nguoidung;

import com.example.booker.entity.TaiKhoan;

import java.util.List;

public interface TaiKhoanService {
    List<TaiKhoan> getTaiKhoans();

    TaiKhoan getTaiKhoanById(int id);


    TaiKhoan getByEmail(String email);

    TaiKhoan saveTaikhoan(TaiKhoan taiKhoan);



    TaiKhoan updateTaikhoan(int id, TaiKhoan taiKhoan);

    TaiKhoan vohieuhoa_khachhang(int id, TaiKhoan taiKhoan);

    void deleteById(int id);
    TaiKhoan validateLogin(String email, String matKhau);
    TaiKhoan saveTaiKhoan(TaiKhoan taiKhoan);
    boolean changePassword(int idTaiKhoan, String oldPassword, String newPassword);
}
