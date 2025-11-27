package com.example.booker.restController;

import com.example.booker.dao.VoucherDao;
import com.example.booker.entity.Voucher;
import com.example.booker.request.ApiResponse;
import com.example.booker.service.nguoidung.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/voucher")
public class VoucherRestController {

    @Autowired
    VoucherService voucherService;
    @Autowired
    private VoucherDao voucherDao;

//    get tất cả voucher theo cửa hàng
    @GetMapping("/cuahang-{id}")
    public List<Voucher> cuahang(@PathVariable int id) {
        return voucherService.getVouchers(id);
    }

    @PostMapping("/cuahang-{id}")
    public Voucher addVoucher(@RequestBody Voucher voucher) {
        return voucherService.createVoucher(voucher);
    }

    @PutMapping("/cuahang-{id}/{ma_voucher}")
    public Voucher updateVoucher(@RequestBody Voucher voucher) {
        return voucherService.updateVoucher(voucher);
    }

    @DeleteMapping("/{id_voucher}")
    public ResponseEntity<ApiResponse<Void>> deleteVoucher(@PathVariable int id_voucher) {
        voucherService.deleteVoucher(id_voucher);
        ApiResponse<Void> response = new ApiResponse<>();
        response.setMessage("Xoá thành công");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cuahang-{id}/{ma_voucher}")
    public Voucher getVoucher(@PathVariable int id, @PathVariable int ma_voucher) {
        return voucherService.getVoucherByMaVoucher(id, ma_voucher);
    }

//  Hàm đếm soos lượng voucher thuộc của hàng
    @GetMapping("/cuahang-{id}/count-voucher-by-store")
    public long getVoucherCount(@PathVariable int id) {
        return voucherDao.countVouchersByCuaHang(id);
    }

//    Hàm đếm voucher theo trạng thái
    @GetMapping("/cuahang-{id}/count-voucher-by-status/{trangthai}")
    public long getVoucherCountByStatus(@PathVariable("id") int id, @PathVariable("trangthai") int trangthai) {
        return voucherDao.countVouchersByCuaHangAndTrangThai(id, trangthai);
    }

//  Hàm get voucher của cửa hàng theo trạng thái
    @GetMapping("/cuahang-{id}/tim-kiem/status")
    public List<Voucher> searchVoucher(@PathVariable("id") int maCuaHang, @RequestParam("trangthai") int trangThai) {
        return voucherDao.findVoucherByTrangThai(maCuaHang, trangThai);
    }

    @GetMapping("/cuahang-{idCuaHang}/trang-thai-voucher-{trangThai}")
    public List<Voucher> getAllVoucherByIdAndtrangThai(@PathVariable("idCuaHang") int idCuaHang, @PathVariable("trangThai") int trangThai){
        return voucherDao.findVoucherByTrangThai(idCuaHang, trangThai);
    }

//    Hàm tìm kiếm theo tên voucher
    @GetMapping("/cuahang-{id}/tim-kiem/ten-voucher")
    public List<Voucher> searchVoucherByName(@PathVariable("id") int maCuaHang, @RequestParam("voucherName") String voucherName) {
        return voucherDao.findVouchersByName(maCuaHang, voucherName);
    }

//    Hàm ti kiếm voucher theo giá giảm
    @GetMapping("/cuahang-{id}/tim-kiem/gia-giam")
    public List<Voucher> searchVoucherbySale(@PathVariable("id") int maCuaHang, @RequestParam("saleOff") int saleOff) {
        return voucherDao.findVouchersByGiamGia(maCuaHang, saleOff);
    }


}
