package com.example.booker.service.nguoidung;

import com.example.booker.DTO.TopCuaHangDTO;
import com.example.booker.entity.SanPham;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public interface SanPhamService {

    List<SanPham> findAll(int ma_san_pham);

    SanPham create(int ma_cua_hang, SanPham sanPham);

    List<SanPham> findByTenSanPham(int ma_san_pham, String tenSanPham);

    List<SanPham> getSanPhamByTheLoai(int ma_the_loai);

    List<SanPham> findByTheLoai(int ma_cua_hang, int id);

    List<SanPham> findByCreateDate(int ma_cua_hang, LocalDate createDate);

    SanPham findById(int id);

    void deleteById(int id);

    SanPham update(SanPham sanPham);

    List<SanPham> sortPriceAsc(int ma_cua_hang);

    List<SanPham> sortPriceDesc(int ma_cua_hang);

    List<SanPham> sanPhamByTrangThaiKhoa(int ma_cua_hang);

    List<SanPham> sanPhamByChoDuyet(int ma_cua_hang);

    List<SanPham> sanPhamByHetHang(int ma_cua_hang);

    List<SanPham> sanPhamByConHang(int ma_cua_hang);

    List<SanPham> searchSanPhamByTrangThai(int ma_cua_hang, int matt);


    SanPham khoa_sanpham(int id, SanPham sanPham);

    //duyet san pham
    SanPham duyet_sanpham(int id, SanPham sanPham);

    //lấy ra sản phẩm theo theo lượt bán từ cao đến thấp
    List<SanPham> findAllSanPhamByLuotBan(int ma_cua_hang);

    //  Tìm kiếm sản phẩm theo tên bằng từ khóa
    List<SanPham> findSanPhamByKeyword(String keyword);

    //  Lọc sản phẩm và sắp xếp
    List<SanPham> findSanPhamByTheLoaiAndGiaOrderBy(List<Integer> theloais, Float minPrice, Float maxPrice, String orderBy);

    // lay san pham theo id cua hang
    List<SanPham> getProductsByStoreId(int storeId);



}
