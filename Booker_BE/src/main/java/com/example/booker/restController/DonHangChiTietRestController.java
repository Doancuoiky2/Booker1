package com.example.booker.restController;

import com.example.booker.dao.DonHangChiTietDao;
import com.example.booker.dao.TrangThaiDonHangDao;
import com.example.booker.entity.DonHangChiTiet;
import com.example.booker.entity.TrangThaiDonHang;
import com.example.booker.service.nguoidung.DonHangChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/orderdetail")
public class DonHangChiTietRestController {

    @Autowired
    DonHangChiTietService donHangChiTietService;
    @Autowired
    private DonHangChiTietDao donHangChiTietDao;
    @Autowired
    private TrangThaiDonHangDao trangThaiDonHangDao;

    //lấy danh sách hóa đơn chi tiết của cửa hàng theo trạng thái
    @GetMapping("/cuahang-{id}/sort/trangthai-{matt}")
    public List<DonHangChiTiet> sortByMaTrangThai(@PathVariable int id, @PathVariable int matt) {
        return donHangChiTietService.LocDHCTByCuaHangAndByTrangThai(id, matt);
    }

    //lọc hóa đơn chi tiết theo theo ngày tạo
    @GetMapping("/cuahang-{id}/sort/trangthai-{matt}/ngay-{date}")
    public List<DonHangChiTiet> sortByMaNgaytao(@PathVariable int id, @PathVariable int matt, @PathVariable LocalDate date) {
        return donHangChiTietService.LocDHCTByCuahangAndByNgaytao(id, matt, date);
    }

    //lọc hóa đơn chi tiết theo mã hóa đơn
    @GetMapping("/cuahang-{id}/trangthai-{matt}/tim_kiem_by_idhd-{maht}")
    public List<DonHangChiTiet> sortByMadh(@PathVariable int id, @PathVariable int matt, @PathVariable String maht) {
        return donHangChiTietService.LocDHCTByCuahangAndByMaHoaDon(id, matt, maht);
    }

    //lấy thông tin chi tiết của một hóa đơn chi tiết
    @GetMapping("/cuahang-{id}/don_hang_chi_tiet-{madh}")
    public DonHangChiTiet InfoDetalDonHangChiTiet(@PathVariable int id, @PathVariable int madh) {
        return donHangChiTietService.infoDetailDonHangChiTiet(id, madh);
    }

    @GetMapping("/admin/detail-{id}")
    public Optional<DonHangChiTiet> getDetailDonHangChiTiet(@PathVariable int id){
        return donHangChiTietDao.findById(id);
    }

    // cập nhat don hang chi tiet
    @PutMapping("/cap-nhat_don_hang_chi_tiet")
    public DonHangChiTiet update(@RequestBody DonHangChiTiet donHangChiTiet) {
        return donHangChiTietService.updateTrangThai(donHangChiTiet);
    }

    //Lấy doanh thu cửa hàng
    @GetMapping("/cuahang-{id}/trangthai-{matt}")
    public Double getDoanhThu(@PathVariable int id, @PathVariable int matt) {
        return donHangChiTietService.getDoanhThu(id, matt);
    }

    //Đơn hàng MỚI theo 7 ngày gần nhất thuộc cửa hàng
    @GetMapping("/cuahang-{id}/donhang/trangthai-{matt}")
    public List<DonHangChiTiet> getDonHang(@PathVariable int id, @PathVariable int matt) {
        return donHangChiTietService.findDonHangChiTiet(id, matt);
    }

//    Đếm
    @GetMapping("dem_hoa_don_chi_tiet/cuahang-{storeID}/trangthai-{maTrangThai}")
    public Long count(@PathVariable int storeID, @PathVariable int maTrangThai) {
        return donHangChiTietDao.countProductsByStoreAndStatus(storeID, maTrangThai);
    }

//    Lâý tất cả hóa đơn chi tiết thuộc cửa hàng
    @GetMapping("/cuahang-{id}")
    public List<DonHangChiTiet> get(@PathVariable int id) {
        return donHangChiTietDao.findDonHangChiTietByCuaHang(id);
    }

//    ADMIN - lấy đơn hàng chi tiết theo trạng thái
    @GetMapping("/admin/trangthai-{matt}")
    public List<DonHangChiTiet> getAll(@PathVariable int matt) {
        return donHangChiTietDao.getAllDonHangChiTietByTrangThai(matt);
    }


//    @GetMapping("/thongke-donhang/{mach}")
//    public List<DonHangChiTietView> getThongKe(@PathVariable("mach") int mach){
//        return donHangChiTietDao.findOrderCountByStoreAndDate(mach);
//    }
@GetMapping("/taikhoan-{userId}")
public ResponseEntity<List<DonHangChiTiet>> getOrderDetailsByUserId(@PathVariable int userId) {
    List<DonHangChiTiet> orderDetails = donHangChiTietDao.findAllByUserId(userId);
    if (!orderDetails.isEmpty()) {
        return ResponseEntity.ok(orderDetails);
    } else {
        return ResponseEntity.noContent().build();
    }
}
    @DeleteMapping("/{maDonHangChiTiet}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable int maDonHangChiTiet) {
        if (donHangChiTietDao.existsById(maDonHangChiTiet)) {
            donHangChiTietDao.deleteById(maDonHangChiTiet);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/huy/{maDonHangChiTiet}")
    public ResponseEntity<DonHangChiTiet> cancelOrderDetail(
            @PathVariable int maDonHangChiTiet,
            @RequestParam String lyDoHuy) {

        if (donHangChiTietDao.existsById(maDonHangChiTiet)) {
            DonHangChiTiet donHangChiTiet = donHangChiTietDao.findById(maDonHangChiTiet).get();

            // Cập nhật trạng thái của chi tiết đơn hàng thành 14
            TrangThaiDonHang trangThaiHuy = trangThaiDonHangDao.findById(14).orElse(null);
            if (trangThaiHuy != null) {
                donHangChiTiet.setTrang_thai(trangThaiHuy);
            } else {
                return ResponseEntity.status(500).build(); // Trạng thái 14 không tồn tại
            }

            donHangChiTietDao.save(donHangChiTiet);
            return ResponseEntity.ok(donHangChiTiet);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/nhan/{maDonHangChiTiet}")
    public ResponseEntity<DonHangChiTiet> confirmReceivedOrderDetail(
            @PathVariable int maDonHangChiTiet) {

        // Kiểm tra xem chi tiết đơn hàng có tồn tại hay không
        if (donHangChiTietDao.existsById(maDonHangChiTiet)) {
            DonHangChiTiet donHangChiTiet = donHangChiTietDao.findById(maDonHangChiTiet).get();

            // Cập nhật trạng thái của chi tiết đơn hàng thành "Đã nhận" (Trạng thái 13)
            TrangThaiDonHang trangThaiNhan = trangThaiDonHangDao.findById(13).orElse(null);
            if (trangThaiNhan != null) {
                donHangChiTiet.setTrang_thai(trangThaiNhan);
            } else {
                return ResponseEntity.status(500).build(); // Trạng thái 13 không tồn tại
            }

            // Lưu lại thay đổi vào cơ sở dữ liệu
            donHangChiTietDao.save(donHangChiTiet);
            return ResponseEntity.ok(donHangChiTiet); // Trả lại chi tiết đơn hàng đã cập nhật
        } else {
            return ResponseEntity.notFound().build(); // Nếu không tìm thấy chi tiết đơn hàng
        }
    }
    @PutMapping("/tra/{maDonHangChiTiet}")
    public ResponseEntity<DonHangChiTiet> requestReturnOrderDetail(
            @PathVariable int maDonHangChiTiet) {

        // Kiểm tra xem chi tiết đơn hàng có tồn tại hay không
        if (donHangChiTietDao.existsById(maDonHangChiTiet)) {
            DonHangChiTiet donHangChiTiet = donHangChiTietDao.findById(maDonHangChiTiet).get();

            // Cập nhật trạng thái của chi tiết đơn hàng thành "Yêu cầu trả hàng/Hoàn tiền" (Trạng thái 15)
            TrangThaiDonHang trangThaiTra = trangThaiDonHangDao.findById(15).orElse(null);
            if (trangThaiTra != null) {
                donHangChiTiet.setTrang_thai(trangThaiTra);
            } else {
                return ResponseEntity.status(500).build(); // Trạng thái 15 không tồn tại
            }

            // Lưu lại thay đổi vào cơ sở dữ liệu
            donHangChiTietDao.save(donHangChiTiet);
            return ResponseEntity.ok(donHangChiTiet); // Trả lại chi tiết đơn hàng đã cập nhật
        } else {
            return ResponseEntity.notFound().build(); // Nếu không tìm thấy chi tiết đơn hàng
        }
    }

// hàm tính tổng lượt bán của cửa hàng
    @GetMapping("/sum-luot-ban/{id}")
    public Integer sumLuotBan(@PathVariable int id) {
        return donHangChiTietDao.sumLuotBanCuaCuaHang(id);
    }

    @GetMapping("/top-selling-products/{ma_cua_hang}")
    public List<Object[]> getTopSellingProducts(@PathVariable int ma_cua_hang) {
        return donHangChiTietDao.findTopSellingProducts(ma_cua_hang);
    }

}
