package com.example.booker.service.nguoidung;

import org.springframework.stereotype.Service;

@Service
public interface SaveFileExcelService {

    void saveSanPhamExcel(int ma_cua_hang, int ma_trang_thai, String filePath);
}
