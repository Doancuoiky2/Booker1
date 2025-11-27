package com.example.booker.dao;

import com.example.booker.DTO.TopCuaHangDTO;
import com.example.booker.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SanPhamDao extends JpaRepository<SanPham, Integer> {

    //Lay san pham theo the loai
    @Query("select s from SanPham s where s.the_loai.ma_the_loai = :ma_the_loai")
    List<SanPham> findByMaTheLoai(int ma_the_loai);

    //Lay san pham trang user
    @Query("select s from SanPham s where s.trang_thai_hoat_dong  in (3,4) and s.an_san_pham = false")
    List<SanPham> getSanPhamUser();

    //Lay san pham trang user
    @Query("select s from SanPham s where s.doanh_thu > 0")
    List<SanPham> getSanPhamCoDoanhThu();

//    SELLER - lấy sản phẩm theo mã cửa hàng
    @Query("SELECT s FROM SanPham s " +
            "JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :ma_cua_hang order by s.ma_san_pham desc")
    List<SanPham> getAllSanPhamByMaCuaHang(int ma_cua_hang);

    //Phương thức kiểm tra san da ton tai
//    @Query("SELECT (COUNT(s) > 0) FROM SanPham s " +
//            "JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
//            "WHERE c.ma_cua_hang = :ma_cua_hang AND s.ten_san_pham LIKE CONCAT('%', :tenSanPham, '%')")
//    boolean existBySanPham(int ma_cua_hang, String tenSanPham);

    @Query("SELECT COUNT(s) > 0 FROM SanPham s WHERE s.cua_hang.ma_cua_hang = :maCuaHang AND s.ten_san_pham = :tenSanPham")
    boolean existBySanPham(@Param("maCuaHang") int maCuaHang, @Param("tenSanPham") String tenSanPham);

    //Loc san pham theo gia tu thap den cao
    @Query("SELECT s FROM SanPham s " +
            "JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :ma_cua_hang " +
            "ORDER BY s.gia asc")
    List<SanPham> findAllSanPhamSortPriceAsc(int ma_cua_hang);

    @Query("SELECT s FROM SanPham s " +
            "JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :ma_cua_hang" +
            " ORDER BY s.gia desc")
    List<SanPham> findAllSanPhamSortPriceDesc(int ma_cua_hang);

    @Query("SELECT s FROM SanPham s " +
            "JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :ma_cua_hang " +
            "ORDER BY s.diem_trung_binh desc")
    List<SanPham> getListProductOrderByComment(int ma_cua_hang);

    @Query("SELECT s FROM SanPham s " +
            "JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :ma_cua_hang " +
           "ORDER BY s.da_ban desc")
    List<SanPham> getListProductOrderByDaBanDesc(int ma_cua_hang);

    @Query("SELECT s FROM SanPham s " +
            "JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :ma_cua_hang " +
            "ORDER BY s.doanh_thu desc")
    List<SanPham> getListProductOrderByDoanhThuDesc(int ma_cua_hang);

//    ADMIN - lấy sách chờ duyệt
    @Query("SELECT s FROM SanPham s WHERE s.trang_thai_hoat_dong = 1 ")
    List<SanPham> getListProductConHang();

//    ADMIN - lấy sách bị khóa
    @Query("SELECT s FROM SanPham s WHERE s.trang_thai_hoat_dong = 2 ")
    List<SanPham> getListProductKhoa();

//    ADMIN - lấy sách còn hàng và hê hàng
    @Query("SELECT s FROM SanPham s WHERE s.trang_thai_hoat_dong = 3 OR s.trang_thai_hoat_dong = 4")
    List<SanPham> getListBookDangBan();

    //  ADMIN - lấy sách yêu cầu mở khóa
    @Query("SELECT s FROM SanPham s WHERE s.trang_thai_hoat_dong = 5 ")
    List<SanPham> getListBookYeuCauMoKhoa();

    //  ADMIN - lấy sách hủy yêu cầu duyệt
    @Query("SELECT s FROM SanPham s WHERE s.trang_thai_hoat_dong = 6 ")
    List<SanPham> getListBookHuyYeuCauDuyet();

    //Phương thức truy vấn sản phẩm theo cửa hàng
    @Query("SELECT s FROM SanPham s " +
            "LEFT JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE  s.trang_thai_hoat_dong  in (3,4) and s.an_san_pham = false and c.ma_cua_hang = :ma_cua_hang  ORDER BY s.ma_san_pham desc")
    List<SanPham> findAllSanPham(int ma_cua_hang);

    //Phương thức truy vấn sản phẩm theo cửa hàng
    @Query("SELECT s FROM SanPham s " +
            "LEFT JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE  c.ma_cua_hang = :ma_cua_hang and s.trang_thai_hoat_dong = :matt  ORDER BY s.ma_san_pham desc")
    List<SanPham>findSanPhamByTrangThai(int ma_cua_hang, int matt);

    // Phương thức tìm kiếm sản phẩm theo tên không phân biệt hoa thường và trả về danh sách
    @Query("SELECT p FROM SanPham p " +
            "JOIN CuaHang c on c.ma_cua_hang = p.ma_cua_hang " +
            "WHERE  p.trang_thai_hoat_dong  in (3,4) and p.an_san_pham = false and c.ma_cua_hang = :ma_cua_hang AND p.ten_san_pham LIKE CONCAT('%', :tenSanPham, '%') ")
    List<SanPham> findByTenSanPhamContainingIgnoreCase(int ma_cua_hang, String tenSanPham);

    //Lọc sản phẩm theo thể loại
    @Query("SELECT s FROM SanPham s JOIN TheLoai t on s.the_loai.ma_the_loai = t.ma_the_loai " +
            "JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :ma_cua_hang AND t.ma_the_loai = :id")
    List<SanPham> findSanPhamByTheLoai(int ma_cua_hang, int id);

    //Lọc sản phẩm theo ngày tạo
    @Query("SELECT s FROM SanPham s" +
            " JOIN CuaHang c on c.ma_cua_hang = s.ma_cua_hang " +
            "WHERE c.ma_cua_hang = :ma_cua_hang AND s.ngay_tao = :createDate")
    List<SanPham> findSanPhamByCreateDate(int ma_cua_hang, LocalDate createDate);

    //    Lấy ra số lượng sản phẩm thuộc cửa hàng
    @Query("SELECT COUNT(s) FROM SanPham s WHERE s.ma_cua_hang = :maCuaHang")
    long countByMaCuaHang(int maCuaHang);

    //  Lấy ra sản phẩm bị khoá
    @Query("SELECT s FROM SanPham s WHERE s.ma_cua_hang = :ma_cua_hang and s.trang_thai_hoat_dong = 2")
    List<SanPham> findAllSanPhamBiKhoa(int ma_cua_hang);

    //  Lấy ra sản phẩm chờ duyệt
    @Query("SELECT s FROM SanPham s WHERE s.ma_cua_hang = :ma_cua_hang and s.trang_thai_hoat_dong = 1")
    List<SanPham> findAllSanPhamChoDuyet(int ma_cua_hang);

    //  Lấy ra sản phẩm hết hàng
    @Query("SELECT s FROM SanPham s WHERE s.ma_cua_hang = :ma_cua_hang and s.trang_thai_hoat_dong = 4")
    List<SanPham> findAllSanPhamHetHang(int ma_cua_hang);

    //  Lấy ra sản phẩm còn hàng
    @Query("SELECT s FROM SanPham s WHERE s.ma_cua_hang = :ma_cua_hang and s.trang_thai_hoat_dong = 3")
    List<SanPham> findAllSanPhamConHang(int ma_cua_hang);

    //  Lấy ra sản phẩm yêu cầu mở kháo
    @Query("SELECT s FROM SanPham s WHERE s.ma_cua_hang = :ma_cua_hang and s.trang_thai_hoat_dong = 5")
    List<SanPham> findAllSanPhamYeuCauMoKhoa(int ma_cua_hang);

    // Tìm kiếm sản phẩm theo trang thai
    @Query("SELECT s FROM SanPham s WHERE s.ma_cua_hang = :ma_cua_hang and s.trang_thai_hoat_dong = :matt")
    List<SanPham> searchSanPhamByTrangThai(int ma_cua_hang, int matt);

    // danh sách sản phẩm thuộc cửa hàng sắp xếp theo lượt bán từ cao đến thấp
    @Query("select s from SanPham s " +
            "where s.ma_cua_hang = :ma_cua_hang " +
            "order by s.da_ban desc ")
    List<SanPham> findAllSanPhamByLuotBan(int ma_cua_hang);


    //lấy ra danh sách sản phẩm bán chạy nhất trong 7 ngày gần nhất
//    @Query( "SELECT * FROM san_pham_view s " +
//            "JOIN don_hang_chi_tiet dhct " +
//            "ON dhct.ma_san_pham = s.ma_san_pham " +
//            "JOIN don_hang dh ON dh.ma_don_hang = dhct.ma_don_hang " +
//            "WHERE s.ma_cua_hang = :maCuaHang " +
//            "AND dh.ngay_tao BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() " +
//            "ORDER BY s.da_ban DESC")
//    List<SanPham> sanPham7Day(int ma_cua_hang);


//    @Query(value = "SELECT s.* FROM S s " +
//            "JOIN don_hang_chi_tiet dhct " +
//            "ON dhct.ma_san_pham = s.ma_san_pham " +
//            "JOIN don_hang dh ON dh.ma_don_hang = dhct.ma_don_hang " +
//            "WHERE s.ma_cua_hang = :ma_cua_hang " +
//            "AND dh.ngay_tao BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() " +
//            "GROUP BY " +
//            "s.ma_san_pham," +
//            "s.ten_san_pham, " +
//            "s.anh_san_pham, " +
//            "s.tac_gia, " +
//            "s.ten_the_loai ," +
//            "s.ma_the_loai, " +
//            "s.gia, " +
//            "s.trang_thai_duyet, " +
//            "s.trang_thai_khoa, " +
//            "s.trang_thai_hoat_dong ," +
//            "s.ngay_tao ," +
//            "s.so_luong_hang ," +
//            "s.ma_cua_hang, " +
//            "s.da_ban, " +
//            "s.doanh_thu, " +
//            "s.danh_gia " +
//            "ORDER BY s.da_ban DESC", nativeQuery = true)
//    List<SanPham> sanPham7Day(int ma_cua_hang);

//  Hiển thị sản phẩm theo từ khóa
    @Query("select s from SanPham s " +
            "where s.trang_thai_hoat_dong  in (3,4) and s.an_san_pham = false and s.ten_san_pham like concat('%', :keyword, '%') ")
    List<SanPham> findSanPhamByTen(String keyword);

//  Hiển thị sản phẩm theo loại và khoảng giá
    @Query("select s from SanPham s " +
            "where (:theloais is null or s.the_loai.ma_the_loai in :theloais) and s.trang_thai_hoat_dong  in (3,4) and s.an_san_pham = false " +
            "and (:min is null or s.gia >= :min) " +
            "and (:max is null or s.gia <= :max)")
    List<SanPham> findSanPhamByTheloaiAndGia(List<Integer> theloais, Float min, Float max);

//  Hiển thị sản phẩm theo loại và khoảng giá sắp xếp theo ngày tạo mới nhất
    @Query("select s from SanPham s " +
            "where (:theloais is null or s.the_loai.ma_the_loai in :theloais)  and s.trang_thai_hoat_dong  in (3,4) and s.an_san_pham = false     " +
            "and (:min is null or s.gia >= :min) " +
            "and (:max is null or s.gia <= :max) " +
            "order by s.ngay_tao desc")
    List<SanPham> findSanPhamByTheloaiAndGiaSortByDate(List<Integer> theloais, Float min, Float max);

//  Hiển thị sản phẩm theo loại và khoảng giá sắp xếp theo lượt bán giảm dần
    @Query("select s from SanPham s " +
            "left join DonHangChiTiet dhct on dhct.san_pham.ma_san_pham = s.ma_san_pham and dhct.trang_thai.ma_trang_thai = 4 " +
            "where (:theloais is null or s.the_loai.ma_the_loai in :theloais) " +
            "and (:min is null or s.gia >= :min) " +
            "and (:max is null or s.gia <= :max) " +
            "group by s.ma_san_pham " +
            "order by count(dhct.so_luong) desc")
    List<SanPham> findSanPhamByTheLoaiAndGiaSortByBuyCount(List<Integer> theloais, Float min, Float max);

//  Hiển thị sản phẩm theo loại và khoảng giá sắp xếp theo giá tăng dần
    @Query("select s from SanPham s " +
            "where (:theloais is null or s.the_loai.ma_the_loai in :theloais) and s.trang_thai_hoat_dong  in (3,4) and s.an_san_pham = false  " +
            "and (:min is null or s.gia >= :min) " +
            "and (:max is null or s.gia <= :max) " +
            "order by s.gia")
    List<SanPham> findSanPhamByTheloaiAndGiaSortByGiaAesc(List<Integer> theloais, Float min, Float max);

//  Hiển thị sản phẩm theo loại và khoảng giá sắp xếp theo giá giảm dần
    @Query("select s from SanPham s " +
            "where (:theloais is null or s.the_loai.ma_the_loai in :theloais) and s.trang_thai_hoat_dong  in (3,4) and s.an_san_pham = false  " +
            "and (:min is null or s.gia >= :min) " +
            "and (:max is null or s.gia <= :max) " +
            "order by s.gia desc")
    List<SanPham> findSanPhamByTheloaiAndGiaSortByGiaDesc(List<Integer> theloais, Float min, Float max);

    // Query để lấy danh sách sản phẩm theo mã cửa hàng
    @Query("SELECT sp FROM SanPham sp WHERE sp.cua_hang.ma_cua_hang = :storeId")
    List<SanPham> findByStoreId(int storeId);

    @Query("SELECT sp FROM SanPham sp WHERE sp.ma_san_pham = :masp")
    Optional<SanPham> findByMaSanPham(int masp);

    @Query("select sp from SanPham sp join CuaHang ch on ch.ma_cua_hang = sp.cua_hang.ma_cua_hang where sp.cua_hang.ma_cua_hang = :maCh and sp.an_san_pham = true")
    List<SanPham> getBookHidden(int maCh);

    @Query("select count(sp) from SanPham sp join CuaHang ch on ch.ma_cua_hang = sp.cua_hang.ma_cua_hang where sp.cua_hang.ma_cua_hang = :maCh and sp.an_san_pham = true")
    Long getBookHiddenLength(int maCh);

    //    SELLER - lấy sản phẩm vi phạm
    @Query("SELECT s FROM SanPham s WHERE (s.trang_thai_hoat_dong = 3 OR s.trang_thai_hoat_dong = 4) AND s.da_ban IS NOT NULL AND s.diem_trung_binh IS NOT NULL AND s.da_ban > 10 AND s.diem_trung_binh < 3")
    List<SanPham> findSanphamvipham();

    //Lọc sản phẩm theo tên thể loại
    @Query("select s from SanPham s join TheLoai t " +
            "on s.the_loai.ma_the_loai = t.ma_the_loai " +
            "where t.ten_the_loai like :ten_the_loai and s.trang_thai_hoat_dong in (3 ,4) and s.an_san_pham = false ")
    List<SanPham> findSanPhamByTenTheLoai(String ten_the_loai);

    //Sắp xếp sản phẩm theo đã bán
    @Query("select s from SanPham s " +
            "where s.trang_thai_hoat_dong in (3 ,4) and s.an_san_pham = false " +
            "order by s.da_ban desc ")
    List<SanPham> sapXepSanPhamByDaBan();

//    tìm tất cả sản phẩm theo mã thể loại và sắp ếp theo lượt bán từ cao --> thấp
    @Query("select s from SanPham s join TheLoai t " +
            "on s.the_loai.ma_the_loai = t.ma_the_loai " +
            "where t.ma_the_loai = :ma_the_loai and s.trang_thai_hoat_dong in (3 ,4) and s.an_san_pham = false " +
            "order by s.da_ban desc")
    List<SanPham> sapXepSanPhamByMaTheLoai(int ma_the_loai);

    //Sắp xếp sản phẩm đã bán giảm dần theo thể loại
    @Query("select s from SanPham s " +
            "where s.the_loai.ten_the_loai like :ten_the_loai and s.trang_thai_hoat_dong in (3 ,4) and s.an_san_pham = false " +
            "order by s.da_ban desc")
    List<SanPham> sapXepSanPhamByTenTheLoaiAndDaBan(String ten_the_loai);

//    Tìm kiếm sản phẩm theo max cửa hàng và theo mã thể loại
    @Query("SELECT s FROM SanPham s WHERE s.cua_hang.ma_cua_hang = :maCuaHang and s.the_loai.ma_the_loai = :maTheLoai")
    List<SanPham> findSanPhamByMaTheLoaiAndMaCuaHang(@Param("maCuaHang") int maCuaHang, @Param("maTheLoai") int maTheLoai );

//tìm kiếm saản phẩm theo mã cửa hàng và tên sản phẩm
    @Query("SELECT s FROM SanPham s WHERE s.cua_hang.ma_cua_hang = :maCuaHang AND s.ten_san_pham LIKE %:tenSanPham%")
    List<SanPham> findSanPhamByMaCuaHangAndTenSanPham(@Param("maCuaHang") int maCuaHang, @Param("tenSanPham") String tenSanPham);

    @Query("SELECT MAX(s.da_ban) FROM SanPham s WHERE s.cua_hang.ma_cua_hang = :maCuaHang")
    Integer maxDaBanByMaCuaHang(@Param("maCuaHang") int maCuaHang);

    @Query("SELECT MIN(s.da_ban) FROM SanPham s WHERE s.cua_hang.ma_cua_hang = :maCuaHang")
    Integer minDaBanByMaCuaHang(@Param("maCuaHang") int maCuaHang);

//    admin - đếm số lượng cửa hàng còn đang hoạt động
    @Query("SELECT COUNT(DISTINCT s.cua_hang.ma_cua_hang) FROM SanPham s")
    long countDistinctCuaHangHoatDong();

//    admin - tổng lượt bán của tất cả sản phẩm
    @Query("SELECT SUM(s.da_ban) FROM SanPham s")
    Long tongDaBan();

//    top 10




}
