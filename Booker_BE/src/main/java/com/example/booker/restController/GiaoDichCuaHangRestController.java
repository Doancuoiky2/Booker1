package com.example.booker.restController;

import com.example.booker.dao.GiaoDichCuaHangDao;
import com.example.booker.entity.GiaoDichCuaHang;
import com.example.booker.service.nguoidung.GiaoDichCuaHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/giaodich")
public class GiaoDichCuaHangRestController {

    @Autowired
    GiaoDichCuaHangService giaoDichCuaHangService;
    @Autowired
    private GiaoDichCuaHangDao giaoDichCuaHangDao;

//    ADMIN - lấy tất cả giao dịch
    @GetMapping
    public List<GiaoDichCuaHang> getGiaoDichCuaHang(){
        return giaoDichCuaHangService.getGiaoDichCuaHang();
    }

//    ADMIN - lấy tất cả giao dịch
    @GetMapping("/admin/get-all")
    public List<GiaoDichCuaHang> getAllGiaoDichCuaHang(){
        return giaoDichCuaHangDao.getAllGiaoDichCuaHang();
    }

//    ADMIN - lấy giao dịch theo trạng thái
    @GetMapping("/admin/trangthai-{ma_trang_thai}")
    public List<GiaoDichCuaHang> getGiaoDichCuaHang(@PathVariable int ma_trang_thai){
        return giaoDichCuaHangService.getGIaoDichCuaHangByTrangThai(ma_trang_thai);
    }

//    Xem chi tiết giao dịch
    @GetMapping("/detail-{id}")
    public GiaoDichCuaHang getDetail(@PathVariable int id){
        return giaoDichCuaHangDao.getGiaoDichCuaHangById(id);
    }

//    lấy giao dịch theo mã cửa hàng
    @GetMapping("/seller/cuahang-{mach}")
    public List<GiaoDichCuaHang> getGiaoDichCuaHangByMach(@PathVariable int mach){
        return giaoDichCuaHangDao.getGiaoDichByMaCuaHang(mach);
    }

//    SELLER - lấy giao dịch theo cửa hàng và trạng thái
    @GetMapping("/seller/cuahang-{mach}/trannthai-{tt}")
    public List<GiaoDichCuaHang> getGiaoDichByCuaHangAndTrangThai(@PathVariable int mach, @PathVariable int tt){
        return giaoDichCuaHangDao.getGiaoDichByMaCuaHangAndTrangThai(mach, tt);
    }

    @PostMapping("/add")
    public GiaoDichCuaHang create(@RequestBody GiaoDichCuaHang giaoDichCuaHang) {
        return giaoDichCuaHangService.create(giaoDichCuaHang);
    }

    @PutMapping("/update")
    public GiaoDichCuaHang update(@RequestBody GiaoDichCuaHang giaoDichCuaHang) {
        return giaoDichCuaHangService.create(giaoDichCuaHang);
    }

}
