package com.example.booker.service.nguoidung;

import com.example.booker.entity.DanhGia;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DanhGiaService {

    List<DanhGia> getDanhGiaList(int maSp);

    DanhGia saveDanhGia(DanhGia danhGia);

}
