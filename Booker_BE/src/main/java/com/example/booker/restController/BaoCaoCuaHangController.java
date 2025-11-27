package com.example.booker.restController;
import com.example.booker.dao.BaoCaoCuaHangDao;
import com.example.booker.entity.BaoCaoCuaHang;
import com.example.booker.entity.TheLoai;
import com.example.booker.request.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/baocaocuahang")
@CrossOrigin("*")
public class BaoCaoCuaHangController {
    @Autowired
    BaoCaoCuaHangDao baoCaoCuaHangDao;

    @GetMapping
    public List<BaoCaoCuaHang> getAll() {
        return baoCaoCuaHangDao.findAll();
    }

    // lấy báo cáo theo idBao cáo
    @GetMapping("/{id}")
    public ApiResponse<BaoCaoCuaHang> getIDBaocao(@PathVariable int id) {
        ApiResponse<BaoCaoCuaHang> response = new ApiResponse<>();
        response.setResult(baoCaoCuaHangDao.findById(id).orElseThrow(() -> new RuntimeException("Category not found")));
        return response;
    }

//    // get theo id_tai_khoan_bi_bao_cao báo cáo cho người dùng(thông báo các lỗi cửa tài khoản đã duyệt và chưa ẩn)
//    @GetMapping("/thongbao-taikhoan/{id_tai_khoan}")
//    public List<BaoCaoCuaHang> getThongbaosIdTK(@PathVariable int id_tai_khoan) {
//
//        // Lấy danh sách báo cáo từ Repository
//        List<BaoCaoCuaHang> thongBaos = baoCaoCuaHangDao.findThongbaochotaikhoan(id_tai_khoan);
//        // Kiểm tra nếu không có báo cáo
//        if (thongBaos.isEmpty()) {
//            throw new RuntimeException("Không có thông báo nào cho tài khoản với ID: " + id_tai_khoan);
//        }
//        return thongBaos;
//    }


    @PostMapping("/save")
    public ApiResponse<BaoCaoCuaHang> createBaoCaoCuaHang(@RequestBody BaoCaoCuaHang baoCao) {
        ApiResponse<BaoCaoCuaHang> response = new ApiResponse<>();
        try {
            response.setMessage("Báo cáo cửa hàng đã được tạo thành công.");
            response.setResult(baoCaoCuaHangDao.save(baoCao));
        } catch (Exception e) {
            // Xử lý lỗi

            response.setMessage("Đã xảy ra lỗi khi tạo báo cáo cửa hàng: " + e.getMessage());
        }

        return response;
    }

    @PutMapping("/update")
    public BaoCaoCuaHang update(@RequestBody BaoCaoCuaHang baoCaos) {
        return baoCaoCuaHangDao.save(baoCaos);
    }


    @DeleteMapping("/delete/bao-cao/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable int id) {
        baoCaoCuaHangDao.deleteById(id);
        ApiResponse<Void> response = new ApiResponse<>();
        response.setMessage("Đã xóa thành công");
        return ResponseEntity.ok(response);
    }

//    SELLER
    @GetMapping("/cuahang-{id}/trang_thai/{tt}")
    public List<BaoCaoCuaHang> getMany(@PathVariable int id, @PathVariable int tt) {
        return baoCaoCuaHangDao.findBaoCaoCuaHangByTrangThaiAndMaCH(id, tt);
    }

//    SELLER
    @GetMapping("/cuahang-{id}/da_duyet")
    public List<BaoCaoCuaHang> getDaDuyet(@PathVariable int id) {
        return baoCaoCuaHangDao.findBaoCaoCuaHangByTrangThaiAndMaCHIsDuyet(id);
    }

//    đếm tổng báo cáo - SELLER
    @GetMapping("/cuahang-{id}/count-all")
    public Long countBaoCaoCuaHang(@PathVariable int id){
        return baoCaoCuaHangDao.countBaoCaoCuaHang(id);
    }

    //    đếm tổng báo cáo - ADMIN
    @GetMapping("/admin/count-all")
    public Long countBaoCaoCuaHangForAdmin(){
        return baoCaoCuaHangDao.countBaoCaoCuaHangForAdmin();
    }

//    ADMIN - mới hoặc đã hủy
    @GetMapping("/admin/trang_thai/{tt}")
    public List<BaoCaoCuaHang> getBaoCaoByTT(@PathVariable int tt) {
        return baoCaoCuaHangDao.getBaoCaoCuaHangByTTAdmin(tt);

    }


    //    ADMIN - đã duyệt
    @GetMapping("/admin/da_duyet")
    public List<BaoCaoCuaHang> getBaoCaoByDuyetAdmin() {
        return baoCaoCuaHangDao.getBaoCaoCuaHangByDuyetAdmin();
    }

//    thông tin chi tiết báo cáo
    @GetMapping("/thong-tin-chi-tiet/{id}")
    public BaoCaoCuaHang getThongTinChiTiet(@PathVariable int id) {
        return baoCaoCuaHangDao.getBaoCaoCuaHangById(id);
    }
}
