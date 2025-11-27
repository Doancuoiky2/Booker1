package com.example.booker.restController;

import com.example.booker.DTO.DonHangDTO;
import com.example.booker.dao.*;
import com.example.booker.entity.DonHang;
import com.example.booker.entity.DonHangChiTiet;
import com.example.booker.service.nguoidung.DonHangService;
import com.example.booker.service.nguoidung.VoucherService;
import com.example.booker.service.nguoidung.impl.DonHangServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/donhang")
public class DonHangRestController {

    @Autowired
    DonHangChiTietDao donHangChiTietDao;

    @Autowired
    DonHangDao donHangDao;

    @Autowired
    TaiKhoanDao taiKhoanDao;

    @Autowired
    DiaChiDao diaChiDao;

    @Autowired
    TrangThaiDonHangDao trangThaiDonHangDao;

    @Autowired
    VoucherService voucherService;
    @Autowired
    private DonHangServiceImpl donHangServiceImpl;

    //  Hiển thị đơn hàng chi tiết theo người dùng
    @GetMapping("/taikhoan-{ma_tai_khoan}")
    public ResponseEntity<List<DonHangChiTiet>> getDonHangChiTiet(@PathVariable int ma_tai_khoan) {
        if (donHangChiTietDao.getSanPhamByTaiKhoan(ma_tai_khoan) != null) {
            return ResponseEntity.ok(donHangChiTietDao.getSanPhamByTaiKhoan(ma_tai_khoan));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
//  Lấy thông tin từng đơn hàng chi tiết
    @GetMapping("/dhct-{id}")
    public ResponseEntity<DonHangChiTiet> getById(@PathVariable int id) {
        if (donHangChiTietDao.existsById(id)) {
            return ResponseEntity.ok(donHangChiTietDao.findById(id).get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
//  Tạo đơn hàng mới và thêm đơn hàng chi tiết cho đơn hàng
@PostMapping("/taikhoan-{tkid}/diachi-{dcid}")
public ResponseEntity<List<DonHangChiTiet>> add(@RequestBody List<DonHangChiTiet> donHangChiTiets, @PathVariable int tkid, @PathVariable int dcid) {
    // Kiểm tra nếu tài khoản và địa chỉ tồn tại và hợp lệ
    if (taiKhoanDao.existsById(tkid) && diaChiDao.findById(dcid).isPresent()) {
        DonHang donHang = new DonHang();
        donHang.setTai_khoan(taiKhoanDao.findById(tkid).get());
        donHang.setDia_chi(diaChiDao.findById(dcid).get());
        donHang.setNgay_tao(new Date());

        // Lưu DonHang trước khi thiết lập DonHangChiTiet
        donHangDao.save(donHang);

        for (DonHangChiTiet donHangChiTiet : donHangChiTiets) {
            // Nếu sản phẩm có mã cửa hàng và có voucher, kiểm tra và thiết lập
            if (donHangChiTiet.getSan_pham() != null && donHangChiTiet.getVoucher() != null) {
                boolean isVoucherValid = voucherService.getVouchers(donHangChiTiet.getSan_pham().getMa_cua_hang())
                        .contains(donHangChiTiet.getVoucher());
                if (isVoucherValid) {
                    donHangChiTiet.setThanh_tien(donHangChiTiet.getGia() * donHangChiTiet.getSo_luong());
                    donHangChiTiet.setDon_hang(donHang);
                    donHangChiTiet.setTrang_thai(trangThaiDonHangDao.findById(11).orElse(null));
                } else {
                    return ResponseEntity.badRequest().build(); // Voucher không hợp lệ
                }
            } else {
                // Xử lý trường hợp không có voucher
                donHangChiTiet.setThanh_tien(donHangChiTiet.getGia() * donHangChiTiet.getSo_luong());
                donHangChiTiet.setDon_hang(donHang);
                donHangChiTiet.setTrang_thai(trangThaiDonHangDao.findById(11).orElse(null));
            }
        }

        // Lưu danh sách DonHangChiTiet sau khi thiết lập
        donHangChiTietDao.saveAll(donHangChiTiets);
        return ResponseEntity.ok(donHangChiTiets);
    } else {
        return ResponseEntity.notFound().build();
    }
}
//  Cập nhật thông tin đơn hàng(chủ yếu số lượng)
    @PutMapping("/dhct-{id}")
    public ResponseEntity<DonHangChiTiet> updateDHCT(@RequestBody DonHangChiTiet dhct, @PathVariable int id) {
        if (donHangChiTietDao.existsById(id)) {
            dhct.setThanh_tien(dhct.getSo_luong() *  dhct.getGia());
            return ResponseEntity.ok(donHangChiTietDao.save(dhct));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
//  Xóa đơn hàng chi tiết khỏi đơn hàng
    @DeleteMapping("/dhct-{id}")
    public ResponseEntity<Void> deleteDHCT(@PathVariable int id) {
        if (donHangChiTietDao.existsById(id)) {
            donHangChiTietDao.deleteById(id);
            return ResponseEntity.ok().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
//  Xóa đơn hàng nếu đơn hàng không còn sản phẩm sau khi xóa sản phẩm cuối cùng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonHang(@PathVariable int id) {
        if (donHangDao.findAll().isEmpty()) {
            donHangDao.deleteById(id);
            return ResponseEntity.ok().build();
        }
        else {
            throw new RuntimeException("Đơn hàng vẫn còn sản phẩm");
        }
    }

//    @PostMapping("/create/taikhoan-{tkid}/diachi-{dcid}")
//    public ResponseEntity<DonHang> createOrder(
//            @PathVariable int tkid,
//            @PathVariable int dcid,
//            @RequestBody List<DonHangChiTiet> orderDetails) {
//
//        // Kiểm tra tài khoản và địa chỉ tồn tại
//        if (taiKhoanDao.existsById(tkid) && diaChiDao.findById(dcid).isPresent()) {
//            // Tạo đối tượng DonHang mới và thiết lập các thuộc tính
//            DonHang donHang = new DonHang();
//            donHang.setTai_khoan(taiKhoanDao.findById(tkid).get());
//            donHang.setDia_chi(diaChiDao.findById(dcid).get());
//            donHang.setNgay_tao(new Date());
//
//            // Lưu DonHang và đảm bảo donHang đã được lưu với ID
//            donHang = donHangDao.save(donHang);
//
//            // Thêm chi tiết cho đơn hàng vừa tạo
//            for (DonHangChiTiet chiTiet : orderDetails) {
//                chiTiet.setDon_hang(donHang);  // Liên kết chi tiết đơn hàng với đơn hàng
//                chiTiet.setThanh_tien(chiTiet.getGia() * chiTiet.getSo_luong()); // Tính tổng tiền cho mỗi chi tiết
//                chiTiet.setTrang_thai(trangThaiDonHangDao.findById(11).orElse(null)); // Thiết lập trạng thái mặc định
//                donHangChiTietDao.save(chiTiet); // Lưu từng chi tiết
//            }
//
//            return ResponseEntity.ok(donHang); // Trả về đơn hàng đã tạo
//        } else {
//            return ResponseEntity.notFound().build(); // Trả về lỗi nếu không tìm thấy tài khoản hoặc địa chỉ
//        }
//    }

    @PostMapping("/create/taikhoan-{tkid}/diachi-{dcid}")
    public ResponseEntity<DonHang> createOrder(
            @PathVariable int tkid,
            @PathVariable int dcid,
            @RequestBody Map<String, Object> requestBody) {

        if (taiKhoanDao.existsById(tkid) && diaChiDao.findById(dcid).isPresent()) {
            DonHang donHang = new DonHang();
            donHang.setTai_khoan(taiKhoanDao.findById(tkid).get());
            donHang.setDia_chi(diaChiDao.findById(dcid).get());
            donHang.setNgay_tao(new Date());

            // Ghi chú / lời nhắn
            String loiNhan = (String) requestBody.get("loi_nhan");
            donHang.setLoi_nhan(loiNhan);

            donHang = donHangDao.save(donHang);

            return ResponseEntity.ok(donHang);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @PostMapping("/add-details/donhang-{orderId}")
    public ResponseEntity<List<DonHangChiTiet>> addOrderDetails(
            @PathVariable int orderId,
            @RequestBody List<DonHangChiTiet> orderDetails) {

        // Kiểm tra sự tồn tại của đơn hàng
        Optional<DonHang> donHangOptional = donHangDao.findById(orderId);
        if (!donHangOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Không tìm thấy đơn hàng
        }

        DonHang donHang = donHangOptional.get();

        // Thiết lập các chi tiết đơn hàng và liên kết chúng với đơn hàng
        for (DonHangChiTiet detail : orderDetails) {
            detail.setDon_hang(donHang);  // Liên kết với đơn hàn
            detail.setDon_hang(donHang);  // Liên kết với đơn hàng

            detail.setTrang_thai(trangThaiDonHangDao.findById(11).orElse(null)); // Thiết lập trạng thái mặc định
        }

        // Lưu toàn bộ chi tiết đơn hàng vào cơ sở dữ liệu
        donHangChiTietDao.saveAll(orderDetails);
        return ResponseEntity.ok(orderDetails); // Trả về danh sách chi tiết đơn hàng đã lưu
    }

//    SELLER - Lấy thông tin đơn hàng theo mã đơn hàng
    @GetMapping("/seller/ma_don_hang-{id}")
    public DonHang getDonHangByID(@PathVariable int id){
        return donHangDao.getDonHangByMaDonHang(id);
    }

//    ADMIN - lấy tất cả đơn hàng
    @GetMapping("/admin/all-don-hang")
    public List<DonHang> getAllDonHang(){
        return donHangDao.findAll();
    }

    @GetMapping("/admin/count-distinct-tai-khoan-da-mua")
    public Long countDistinctTaiKhoanDaMuaAdmin(){
        return donHangDao.countDistinctTaiKhoanDaMua();
    }

//    admin - đếm số lượng đơn hàng
    @GetMapping("/admin/count-all-don-hang")
    public Long countAllDonHang(){
        return donHangDao.countAllDonHang();
    }
}



