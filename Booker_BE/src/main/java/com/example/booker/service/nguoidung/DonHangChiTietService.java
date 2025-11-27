package com.example.booker.service.nguoidung;

import com.example.booker.entity.DonHangChiTiet;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

public interface DonHangChiTietService {

    //lấy danh sách hóa đơn chi tiết của cửa hàng theo trạng thái
    List<DonHangChiTiet> LocDHCTByCuaHangAndByTrangThai(int ma_cua_hang, int ma_trang_thai);

    //lọc hóa đơn chi tiết theo theo ngày tạo
    List<DonHangChiTiet> LocDHCTByCuahangAndByNgaytao(int ma_cua_hang, int ma_trang_thai, LocalDate ngay_tao);

    //lọc hóa đơn chi tiết theo mã hóa đơn
    List<DonHangChiTiet> LocDHCTByCuahangAndByMaHoaDon(int ma_cua_hang, int ma_trang_thai, String ma_hien_thi);

    //lấy thông tin chi tiết của một hóa đơn chi tiết
    DonHangChiTiet infoDetailDonHangChiTiet(int ma_cua_hang, int ma_don_hang_ct);

    //cập nhật trang thai don hang chi tiet
    DonHangChiTiet updateTrangThai(DonHangChiTiet trangThai);

    //Lấy doanh thu cửa hàng
    Double getDoanhThu(int ma_cua_hang, int ma_trang_thai);

    //Đơn hàng MỚI theo 7 ngày gần nhất thuộc cửa hàng
    List<DonHangChiTiet> findDonHangChiTiet(int ma_cua_hang, int ma_trang_thai);
}
