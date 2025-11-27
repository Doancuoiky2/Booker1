package com.example.booker.service.nguoidung.impl;


import com.example.booker.DTO.TopCuaHangDTO;
import com.example.booker.dao.CuaHangDao;
import com.example.booker.dao.SanPhamDao;
import com.example.booker.entity.CuaHang;
import com.example.booker.entity.SanPham;
import com.example.booker.service.nguoidung.SanPhamService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class SanPhamServiceImpl implements SanPhamService {

    @Autowired
    SanPhamDao sanPhamDao;

    @Autowired
    SanPhamDao sanPhamViewDao;

    @Autowired
    CuaHangDao cuaHangDao;


    @Override
    public List<SanPham> findAll(int ma_san_pham) {
        return sanPhamViewDao.findAllSanPham(ma_san_pham);
    }

//    @Override
//    public SanPham create(int ma_cua_hang, SanPham sanPham) {
//        //kiem tra san pham ton tai
//        if (sanPhamDao.existBySanPham(ma_cua_hang, sanPham.getTen_san_pham()))
//            throw new RuntimeException("Product exist");
//
//        return sanPhamDao.save(sanPham);
//    }

    @Override
    public SanPham create(int ma_cua_hang, SanPham sanPham) {
        // kiểm tra trùng trong cùng cửa hàng
        if (sanPhamDao.existBySanPham(ma_cua_hang, sanPham.getTen_san_pham()))
            throw new RuntimeException("Product exist in this store");

        // gán cửa hàng đúng cho sản phẩm
        CuaHang cuaHang = cuaHangDao.findById(ma_cua_hang)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy cửa hàng"));
        sanPham.setCua_hang(cuaHang);

        return sanPhamDao.save(sanPham);
    }


    @Override
    public List<SanPham> findByTenSanPham(int ma_san_pham, String tenSanPham) {
        return sanPhamViewDao.findByTenSanPhamContainingIgnoreCase(ma_san_pham, tenSanPham);
    }

    @Override
    public List<SanPham> getSanPhamByTheLoai(int ma_the_loai) {
        return sanPhamDao.findByMaTheLoai(ma_the_loai);
    }

    @Override
    public List<SanPham> findByTheLoai(int ma_cua_hang, int id) {
        return sanPhamViewDao.findSanPhamByTheLoai(ma_cua_hang, id);
    }

    @Override
    public List<SanPham> findByCreateDate(int ma_cua_hang, LocalDate createDate) {
        return sanPhamViewDao.findSanPhamByCreateDate(ma_cua_hang, createDate);
    }

    @Override
    public SanPham findById(int id) {
        return sanPhamDao.findById(id).get();
    }

    @Override
    public void deleteById(int id) {
        try {
            sanPhamDao.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            throw new EntityNotFoundException("Product not found with id: " + id);
        }
    }

    @Override
    public SanPham update(SanPham sanPham) {
        return sanPhamDao.save(sanPham);
    }

    @Override
    public List<SanPham> sortPriceAsc(int ma_cua_hang) {
        return sanPhamDao.findAllSanPhamSortPriceAsc(ma_cua_hang);
    }

    @Override
    public List<SanPham> sortPriceDesc(int ma_cua_hang) {
        return sanPhamDao.findAllSanPhamSortPriceDesc(ma_cua_hang);
    }

    @Override
    public List<SanPham> sanPhamByTrangThaiKhoa(int ma_cua_hang) {
        return sanPhamViewDao.findAllSanPhamBiKhoa(ma_cua_hang);
    }

    @Override
    public List<SanPham> sanPhamByChoDuyet(int ma_cua_hang) {
        return sanPhamViewDao.findAllSanPhamChoDuyet(ma_cua_hang);
    }

    @Override
    public List<SanPham> sanPhamByHetHang(int ma_cua_hang) {
        return sanPhamViewDao.findAllSanPhamHetHang(ma_cua_hang);
    }

    @Override
    public List<SanPham> sanPhamByConHang(int ma_cua_hang) {
        return sanPhamViewDao.findAllSanPhamConHang(ma_cua_hang);
    }

    @Override
    public List<SanPham> searchSanPhamByTrangThai(int ma_cua_hang, int matt) {
        return sanPhamViewDao.searchSanPhamByTrangThai(ma_cua_hang, matt);
    }

    @Override
    public SanPham khoa_sanpham(int id, SanPham sanPham){
        SanPham setting_sanPham = sanPhamDao.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("San phan kho ton tai id: " + id));
        setting_sanPham.setTrang_thai_khoa(true);
        return sanPhamDao.save(setting_sanPham);
    }

    //duyet san pham
    @Override
    public SanPham duyet_sanpham(int id, SanPham sanPham){
        SanPham setting_sanPham = sanPhamDao.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("San phan kho ton tai id: " + id));
        setting_sanPham.setTrang_thai_duyet(true);
        return sanPhamDao.save(setting_sanPham);
    }

    @Override
    public List<SanPham> findAllSanPhamByLuotBan(int ma_cua_hang) {
        return sanPhamViewDao.findAllSanPhamByLuotBan(ma_cua_hang);
    }

//    @Override
//    public List<SanPhamView> sanPham7Day(int ma_cua_hang) {
//        return sanPhamViewDao.sanPham7Day(ma_cua_hang);
//    }

    @Override
    public List<SanPham> findSanPhamByKeyword(String keyword) {
        return sanPhamDao.findSanPhamByTen(keyword);
    }

    @Override
    public List<SanPham> findSanPhamByTheLoaiAndGiaOrderBy(List<Integer> theloais, Float minPrice, Float maxPrice, String orderBy) {
        List<SanPham> results = new ArrayList<>();
        switch (orderBy) {
            case "lastest":
                results = sanPhamDao.findSanPhamByTheloaiAndGiaSortByDate(theloais, minPrice, maxPrice);
                break;
            case "buy count":
                results = sanPhamDao.findSanPhamByTheLoaiAndGiaSortByBuyCount(theloais, minPrice, maxPrice);
                break;
            case "price asce":
                results = sanPhamDao.findSanPhamByTheloaiAndGiaSortByGiaAesc(theloais, minPrice, maxPrice);
                break;
            case "price desc":
                results = sanPhamDao.findSanPhamByTheloaiAndGiaSortByGiaDesc(theloais, minPrice, maxPrice);
                break;
            case "no sort":
                results = sanPhamDao.findSanPhamByTheloaiAndGia(theloais, minPrice, maxPrice);
                break;
        }
        return results;
    }
    // lay san pham theo id cua hang
    @Override
    public List<SanPham> getProductsByStoreId(int storeId) {
        return sanPhamDao.findByStoreId(storeId);
    }



}
