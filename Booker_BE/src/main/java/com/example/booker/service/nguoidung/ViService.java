package com.example.booker.service.nguoidung;

import com.example.booker.entity.Vi;

public interface ViService {
    Vi saveVi(Vi vi); // Lưu ví mới
    Vi getViByTaiKhoan(int idTaiKhoan); // Lấy ví theo ID tài khoản
    void updateSoTien(String idVi, Float soTien); // Cập nhật số tiền trong ví
    void congTien(String idVi, float amount); // Cộng tiền vào ví

}
