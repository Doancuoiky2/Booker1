package com.example.booker.service.nguoidung.impl;

import com.example.booker.dao.DonHangChiTietDao;
import com.example.booker.dao.TrangThaiDonHangDao;
import com.example.booker.entity.DonHangChiTiet;
import com.example.booker.entity.TrangThaiDonHang;
import com.example.booker.service.nguoidung.DonHangChiTietService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class DonHangChiTietImpl implements DonHangChiTietService {

    @Autowired
    DonHangChiTietDao donHangChiTietDao;

    @Autowired
    TrangThaiDonHangDao trangThaiDonHangDao;

    @Override
    public List<DonHangChiTiet> LocDHCTByCuaHangAndByTrangThai(int ma_cua_hang, int ma_trang_thai) {
        return donHangChiTietDao.findByMaTrangThaiAndMaCuaHang(ma_cua_hang, ma_trang_thai);
    }

    @Override
    public List<DonHangChiTiet> LocDHCTByCuahangAndByNgaytao(int ma_cua_hang, int ma_trang_thai, LocalDate ngay_tao) {
        return donHangChiTietDao.sortDonHangChiTietByNgayTao(ma_cua_hang, ma_trang_thai, ngay_tao);
    }

    @Override
    public List<DonHangChiTiet> LocDHCTByCuahangAndByMaHoaDon(int ma_cua_hang, int ma_trang_thai, String ma_hien_thi) {
        return donHangChiTietDao.sortDonHangChiTietByMaDonHang(ma_cua_hang, ma_trang_thai, ma_hien_thi);
    }

    @Override
    public DonHangChiTiet infoDetailDonHangChiTiet(int ma_cua_hang, int ma_don_hang_ct) {
        return donHangChiTietDao.InfoDetailDonHangChiTiet(ma_cua_hang, ma_don_hang_ct);
    }

    @Override
    public DonHangChiTiet updateTrangThai(DonHangChiTiet trangThai) {
        System.out.println("=== DEBUG BACKEND ===");
        System.out.println("ID (maDonHangChiTiet): " + trangThai.getMa_don_hang_chi_tiet());
        System.out.println("TrangThai object: " + trangThai.getTrang_thai());
        System.out.println("=====================");

        DonHangChiTiet existing = donHangChiTietDao.findById(trangThai.getMa_don_hang_chi_tiet())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy đơn hàng chi tiết"));

        // 🔹 Nạp entity TrangThai từ DB theo id được gửi lên
        TrangThaiDonHang trangThaiMoi = trangThaiDonHangDao.findById(
                trangThai.getTrang_thai().getMa_trang_thai()
        ).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy trạng thái đơn hàng"));

        existing.setTrang_thai(trangThaiMoi);

        return donHangChiTietDao.save(existing);
    }



    @Override
    @Transactional
    public Double getDoanhThu(int ma_cua_hang, int ma_trang_thai) {
        return donHangChiTietDao.GetDoanhThu(ma_cua_hang, ma_trang_thai);
    }



    @Override
    public List<DonHangChiTiet> findDonHangChiTiet(int ma_cua_hang, int ma_trang_thai) {
        return donHangChiTietDao.findDonHangChiTiet(ma_cua_hang, ma_trang_thai);
    }
}
