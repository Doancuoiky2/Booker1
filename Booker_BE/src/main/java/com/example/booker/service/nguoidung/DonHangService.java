package com.example.booker.service.nguoidung;

import java.util.Date;

public interface DonHangService {

    boolean isExistDonHang(int ma_tai_khoan, Date createDate, int trang_thai_don_hang);
}
