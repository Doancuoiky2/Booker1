package com.example.booker.restController;

import com.example.booker.dao.BaoCaoNguoiDungDao;
import com.example.booker.entity.BaoCaoCuaHang;
import com.example.booker.entity.BaoCaoNguoiDung;
import com.example.booker.request.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/baocaonguoidung")
@CrossOrigin("*")
public class BaoCaoNguoiDungController  {
    @Autowired
    BaoCaoNguoiDungDao baoCaoNguoiDungDao;


    @GetMapping
    public List<BaoCaoNguoiDung> getAll() {
        return baoCaoNguoiDungDao.findAll();
    }

    // lấy báo cáo theo id Bao cáo
    @GetMapping("/{id}")
    public ApiResponse<BaoCaoNguoiDung> getIDBaocao(@PathVariable int id) {
        ApiResponse<BaoCaoNguoiDung> response = new ApiResponse<>();
        response.setResult(baoCaoNguoiDungDao.findById(id).orElseThrow(() -> new RuntimeException("Category not found")));
        return response;
    }

    // get theo ma_cua_hang_bi_bao_cao  báo cáo cho cửa hàng (thông báo các lỗi cửa cửa hàng đã duyệt và chưa ẩn)
    @GetMapping("/thongbao-taikhoan/{ma_cua_hang}")
    public List<BaoCaoNguoiDung> getThongbaosIdTK(@PathVariable int ma_cua_hang) {

        // Lấy danh sách báo cáo từ Repository
        List<BaoCaoNguoiDung> thongBaos = baoCaoNguoiDungDao.findThongbaochocauhang(ma_cua_hang);
        // Kiểm tra nếu không có báo cáo
        if (thongBaos.isEmpty()) {
            throw new RuntimeException("Không có thông báo nào cho tài khoản với ID: " + ma_cua_hang);
        }
        return thongBaos;
    }
    @PostMapping("/save")
    public ApiResponse<BaoCaoNguoiDung> createBaoCaoCuaHang(@RequestBody BaoCaoNguoiDung baoCao) {
        ApiResponse<BaoCaoNguoiDung> response = new ApiResponse<>();
        try {
            baoCao.setTrang_thai_bao_cao(1);
            response.setMessage("Báo cáo đã được tạo thành công.");
            response.setResult(baoCaoNguoiDungDao.save(baoCao));
        } catch (Exception e) {
            // Xử lý lỗi

            response.setMessage("Đã xảy ra lỗi khi tạo báo cáo : " + e.getMessage());
        }

        return response;
    }
    @PutMapping("/update")
    public BaoCaoNguoiDung update(@RequestBody BaoCaoNguoiDung baoCaos) {
        return baoCaoNguoiDungDao.save(baoCaos);
    }
    //duyệt báo cáo
    @PutMapping("/update/update_baocao_duyet/{id}")
    public ApiResponse<BaoCaoNguoiDung> duyetBaoCao(@PathVariable int id) {
        ApiResponse<BaoCaoNguoiDung> response = new ApiResponse<>();

        try {
            BaoCaoNguoiDung  baoCao = baoCaoNguoiDungDao.findById(id).get();
            if (baoCao != null) {

                baoCao.setTrang_thai_bao_cao(2);
                response.setMessage("Báo cáo đã được duyet thành công.");
                response.setResult(baoCaoNguoiDungDao.save(baoCao));
            }
        } catch (Exception e) {
            response.setMessage("Đã xảy ra lỗi khi " + e.getMessage());
        }

        return response;
    }
    @PutMapping("/update/update_baocao_daxem/{id}")
    public ApiResponse<BaoCaoNguoiDung> xemBaoCao(@PathVariable int id) {
        ApiResponse<BaoCaoNguoiDung> response = new ApiResponse<>();

        try {
            BaoCaoNguoiDung  baoCao = baoCaoNguoiDungDao.findById(id).get();
            if (baoCao != null) {

                baoCao.setTrang_thai_bao_cao(3);
                response.setMessage("Báo cáo đã được xem .");
                response.setResult(baoCaoNguoiDungDao.save(baoCao));
            }
        } catch (Exception e) {
            response.setMessage("Đã xảy ra lỗi khi " + e.getMessage());
        }

        return response;
    }
    @PutMapping("/update/update_baocao_an/{id}")
    public ApiResponse<BaoCaoNguoiDung> anBaoCao(@PathVariable int id) {
        ApiResponse<BaoCaoNguoiDung> response = new ApiResponse<>();

        try {
            BaoCaoNguoiDung  baoCao = baoCaoNguoiDungDao.findById(id).get();
            if (baoCao != null) {

                baoCao.setTrang_thai_bao_cao(4);
                response.setMessage("Báo cáo đã được ẩn thành công.");
                response.setResult(baoCaoNguoiDungDao.save(baoCao));
            }
        } catch (Exception e) {
            response.setMessage("Đã xảy ra lỗi khi " + e.getMessage());
        }

        return response;
    }
    @PostMapping("/report")
    public ResponseEntity<ApiResponse<BaoCaoNguoiDung>> reportUser(@RequestBody BaoCaoNguoiDung baoCaoNguoiDung) {
        ApiResponse<BaoCaoNguoiDung> response = new ApiResponse<>();
        try {
            baoCaoNguoiDung.setTrang_thai_bao_cao(1);
            baoCaoNguoiDung.setNgay_bao_cao(LocalDate.now());

            BaoCaoNguoiDung savedReport = baoCaoNguoiDungDao.save(baoCaoNguoiDung);

            response.setMessage("Báo cáo đã được gửi thành công.");
            response.setResult(savedReport);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.setMessage("Đã xảy ra lỗi khi gửi báo cáo: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



    }

