package com.example.booker.service.nguoidung;

import com.example.booker.entity.TaiKhoanNganHang;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaiKhoanNganHangService {

    TaiKhoanNganHang create(TaiKhoanNganHang bank);

//    List<TaiKhoanNganHang> get(int ma_cua_hang);

    TaiKhoanNganHang update(TaiKhoanNganHang tk);

}
