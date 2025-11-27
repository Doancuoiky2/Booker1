package com.example.booker.restController;

import com.example.booker.DTO.TopCuaHangDTO;
import com.example.booker.dao.SanPhamDao;
import com.example.booker.entity.SanPham;
import com.example.booker.service.nguoidung.SanPhamService;
import com.example.booker.service.nguoidung.SaveFileExcelService;
import com.example.booker.request.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
    @CrossOrigin("*")
    @RequestMapping("/api/v1/product")
    public class SanPhamRestController {

    @Autowired
    SanPhamService sanPhamService;

    @Autowired
    private SaveFileExcelService saveFileExcelService;

    @Autowired
    private SanPhamDao sanPhamDao;

    @Autowired
    private SanPhamDao sanPhamViewDao;

    @GetMapping("/allinfo")
    public List<SanPham> getAllSanPham(){
        return sanPhamDao.findAll();
    }

    @GetMapping("/cuahang-{maCuaHang}/sanpham-page-seller")
    public List<SanPham> getAllSanPhamByCuaHang(@PathVariable("maCuaHang") int maCuaHang){
        return sanPhamDao.findAllSanPham(maCuaHang);
    }

    @GetMapping("/user")
    public List<SanPham> getSanPhamuser(){
        return sanPhamDao.getSanPhamUser();
    }

    @GetMapping("/sp_co_doanh_thu")
    public List<SanPham> getSPcodaonhthu(){
        return sanPhamDao.getSanPhamCoDoanhThu();
    }


    @GetMapping("/sanpham/{masp}")
        public Optional<SanPham> getSanPhamById(@PathVariable int masp){

        return sanPhamDao.findById(masp);
        }
//    @GetMapping("/cuahang-{id}")
//    public List<SanPhamView> getSp(@PathVariable int id) {
//        return sanPhamService.findAll(id);
//    }

    //  SELLER -  Lấy số lượng sản pham
    @GetMapping("/cuahang-{id}/count")
    public long countSanPhamAll(@PathVariable int id) {
        return sanPhamViewDao.countByMaCuaHang(id);
    }

    //    ADMIN - lấy tất cả sản phẩm
    @GetMapping("/admin/all-san-pham")
    public List<SanPham> getAllSanPhamAdmin(){
        return sanPhamDao.findAll();
    }

    //    lấy sản phẩm thuộc cửa hàng
    @GetMapping("/cuahang-{id}")
    public List<SanPham> getSp(@PathVariable int id) {
        return sanPhamDao.getAllSanPhamByMaCuaHang(id);
    }

    @PostMapping("/cuahang-{id}")
    public ApiResponse<SanPham> create(@PathVariable int id, @RequestBody SanPham sanPham) {
        ApiResponse<SanPham> response = new ApiResponse<>();
        response.setMessage("Tạo sản phẩm thành công");
        response.setResult(sanPhamService.create(id, sanPham));
        return response;
    }

    @PutMapping("/update")
    public ApiResponse<SanPham> update(@RequestBody SanPham sanPham) {
        ApiResponse<SanPham> response = new ApiResponse<>();
        response.setMessage("Cập nhật sản phẩm thành công");
        response.setResult(sanPhamService.update(sanPham));
        return response;
    }



    //khoa san pham
    @PutMapping("/cuahang-{id}/khoasp/{idsp}")
    public ApiResponse<SanPham> update_khoasp(@PathVariable Integer idsp, @RequestBody SanPham sanPham) {
        ApiResponse<SanPham> response = new ApiResponse<>();
        response.setMessage(("Khóa sản phẩm thành công"));
        response.setResult(sanPhamService.khoa_sanpham(idsp, sanPham));
        return response;
    }
    //duyet san pham
    @PutMapping("/cuahang-{id}/duyet_sp/{idsp}")
    public ApiResponse<SanPham> update_duyet_sp(@PathVariable Integer idsp, @RequestBody SanPham sanPham) {
        ApiResponse<SanPham> response = new ApiResponse<>();
        response.setMessage(("duyet sản phẩm thành công"));
        response.setResult(sanPhamService.duyet_sanpham(idsp, sanPham));
        return response;
    }
    @DeleteMapping("/cuahang-{id}/{idsp}")
    public ResponseEntity<ApiResponse<Void>> deleteSanPham(@PathVariable int idsp) {
        sanPhamService.deleteById(idsp);
        ApiResponse<Void> response = new ApiResponse<>();
        response.setMessage("Đã xóa thành công");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cuahang-{id}/{idsp}")
    public SanPham get(@PathVariable Integer idsp) {
        return sanPhamService.findById(idsp);
    }

    @GetMapping("/change-{id}/tim-kiem/theloai")
    public List<SanPham> SearchSanPhamByTheLoai(@PathVariable int id, @RequestParam int category) {
        return sanPhamService.findByTheLoai(id, category);
    }

    @GetMapping("/cuahang-{id}/tim-kiem/ngay-tao")
    public ResponseEntity<List<SanPham>> searchCreateDate(@PathVariable int id,
                                                          @RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate date) {
        List<SanPham> sanPhams = sanPhamService.findByCreateDate(id, date);
        System.out.println(sanPhams);
        return ResponseEntity.ok(sanPhams);
    }

    @GetMapping("/cuahang-{id}/price-asc")
    public List<SanPham> sortPriceAsc(@PathVariable int id) {
        return sanPhamService.sortPriceAsc(id);
    }

    @GetMapping("/cuahang-{id}/price-desc")
    public List<SanPham> sortPriceDesc(@PathVariable int id) {
        return sanPhamService.sortPriceDesc(id);
    }

    //Xuat file excel
    @GetMapping("/cuahang-{id}/save/sanpham/excel/{matt}")
    public ResponseEntity<ApiResponse<String>> saveFilem(@PathVariable int id, @PathVariable int matt) {
        String file = "D:\\duanCaNhan\\5new\\Booker\\sanpham.xlsx";
        saveFileExcelService.saveSanPhamExcel(id,matt, file);
        ApiResponse<String> response = new ApiResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setResult("Lưu file thành công");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @GetMapping("/cuahang-{id}/spbikhoa")
    public List<SanPham> getSpBiKhoa(@PathVariable int id) {
        return sanPhamService.sanPhamByTrangThaiKhoa(id);
    }

    @GetMapping("/cuahang-{id}/choduyet")
    public List<SanPham> getSpChoDuyet(@PathVariable int id) {
        return sanPhamService.sanPhamByChoDuyet(id);
    }

    @GetMapping("/cuahang-{id}/hethang")
    public List<SanPham> getSpHetHang(@PathVariable int id) {
        return sanPhamService.sanPhamByHetHang(id);
    }

    @GetMapping("/cuahang-{id}/conhang")
    public List<SanPham> getSpConHang(@PathVariable int id) {
        return sanPhamService.sanPhamByConHang(id);
    }

    @GetMapping("/cuahang-{id}/yeucaumokhoa")
    public List<SanPham> getSpYeuCauMoKhoa(@PathVariable int id) {
        return sanPhamDao.findAllSanPhamYeuCauMoKhoa(id);
    }

    @GetMapping("/cuahang-{id}/tim-kiem/trangthai/{matt}")
    public List<SanPham> searchSanPhamTrangThai(@PathVariable int id, @PathVariable int matt) {
        return sanPhamService.searchSanPhamByTrangThai(id, matt);
    }

    //lay san pham theo luot ban tu cao den thap
    @GetMapping("/cuahang-{id}/desc")
    public List<SanPham> findAllSanPhamByDabanDesc(@PathVariable int id) {
        return sanPhamService.findAllSanPhamByLuotBan(id);
    }

    //    ADMIN - lấy sản phẩm yêu cầu mở khóa
    @GetMapping("/yeu_cau_duyet")
    public List<SanPham> YeuCauDuyet(){
        return sanPhamDao.getListBookYeuCauMoKhoa();
    }

    //lấy ra sản phẩm bán chạy 7 ngày
//    @GetMapping("/cuahang-{id}/sp-7ngay")
//    public List<SanPham> sanPham7Ngay(@PathVariable int id) {
//        return sanPhamService.sanPham7Day(id);
//    }

    @GetMapping("/cuahang-{id}/sap-xep/diemdanhgia")
    public List<SanPham> getSanPhamOrderByComment(@PathVariable int id) {
        return sanPhamDao.getListProductOrderByComment(id);
    }

    //    lấy danh sách sản phẩm sắp xếp theo bán bán theo
    @GetMapping("/cuahang-{id}/ban-chay")
    public List<SanPham> getSanPhamByBanChay(@PathVariable int id) {
        return sanPhamDao.getListProductOrderByDaBanDesc(id);
    }

    //    Lấy danh sách sản phẩm sắp xê theo doanh thu
    @GetMapping("/cuahang-{id}/doanh-thu")
    public List<SanPham> getSanPhamByDoanhThu(@PathVariable int id) {
        return sanPhamDao.getListProductOrderByDoanhThuDesc(id);
    }

    //    ADMIN - lấy sản phẩm chờ duyê
    @GetMapping("/cho-duyet")
    public List<SanPham> getConHang(){
        return sanPhamDao.getListProductConHang();
    }
    //    ADMIN - lấy sản phẩm bị khóa
    @GetMapping("/vo-hieu-hoa")
    public List<SanPham> getKhoa(){
        return sanPhamDao.getListProductKhoa();
    }
    //    ADMIN - lấy sản phẩm còn hàng  va hết hangf
    @GetMapping("/dang-ban")
    public List<SanPham> DangBan(){
        return sanPhamDao.getListBookDangBan();
    }


    //    ADMIN - lấy sản phẩm còn hàng  va hết hangf
    @GetMapping("/huy-yeu-cau-duyet")
    public List<SanPham> huyYeuCauDuyet(){
        return sanPhamDao.getListBookHuyYeuCauDuyet();
    }


    // lay san pham voi id cua hang
    @GetMapping("/cuahang-{storeId}/allinfo")
    public List<SanPham> getProductsByStoreId(@PathVariable("storeId") int storeId) {
        return sanPhamService.getProductsByStoreId(storeId);
    }

    //    list sản phẩm đang ânr
    @GetMapping("/cuahang-{id}/an/list")
    public List<SanPham> getBookHidden(@PathVariable int id) {
        return sanPhamDao.getBookHidden(id);
    }

    //    list sản phẩm đang ânr
    @GetMapping("/cuahang-{id}/an/length")
    public Long getBookHiddenLength(@PathVariable int id) {
        return sanPhamDao.getBookHiddenLength(id);
    }

    //    ADMIN - lấy sản phẩm vi phạm
    @GetMapping("/sanpham/vipham")
    public List<SanPham> ViPham(){
        return sanPhamDao.findSanphamvipham();
    }

    //    get list saản phẩm theo tên thể loại
    @GetMapping("/tentheloai-{ten_tl}")
    public ResponseEntity<List<SanPham>> getSanPhamByTenTheLoai(@PathVariable String ten_tl) {
        return ResponseEntity.ok(sanPhamDao.findSanPhamByTenTheLoai(ten_tl));
    }

//    get list sản phẩm sắp xếp theo đã bán từ cao đná thấp
    @GetMapping("/banchay")
    public ResponseEntity<List<SanPham>> getAllSanPhamOrderByDaBan() {
        return ResponseEntity.ok(sanPhamDao.sapXepSanPhamByDaBan());
    }

    @GetMapping("/search/{maTheLoai}")
    public List<SanPham> getProductsByMaTheLoai(@PathVariable int maTheLoai){
        return sanPhamDao.findByMaTheLoai(maTheLoai);
    }

    //    tìm tất cả sản phẩm theo mã thể loại và sắp ếp theo lượt bán từ cao --> thấp
    @GetMapping("/banchay/matheloai-{maTheLoai}")
    public List<SanPham> sapXepSanPhamByMaTheLoai(@PathVariable int maTheLoai){
        return sanPhamDao.sapXepSanPhamByMaTheLoai(maTheLoai);
    }

    @GetMapping("/cuahang-{maCuaHang}/tim-kiem/theloai")
    public List<SanPham> findSanPhamByMaTheLoai(
            @PathVariable int maCuaHang,
            @RequestParam("category") int maTheLoai) {
        return sanPhamDao.findSanPhamByMaTheLoaiAndMaCuaHang(maCuaHang, maTheLoai);
    }

    @GetMapping("/cuahang-{maCuaHang}/tim-kiem/tensanpham")
    public List<SanPham> searchSanPhamByTenSanPham(@PathVariable("maCuaHang") int maCuaHang, @RequestParam("ten") String ten) {
        return sanPhamDao.findSanPhamByMaCuaHangAndTenSanPham(maCuaHang, ten);
    }

//    get lượt bán cao nhất theo mã cửa hàng
    @GetMapping("/cuahang-{maCuaHang}/max-da-ban")
    public Integer maxDaBanByMaCuaHang(@PathVariable("maCuaHang") int maCuaHang){
        return sanPhamDao.maxDaBanByMaCuaHang(maCuaHang);
    }

    //    get lượt bán thấp nhất theo mã cửa hàng
    @GetMapping("/cuahang-{maCuaHang}/min-da-ban")
    public Integer minDaBanByMaCuaHang(@PathVariable("maCuaHang") int maCuaHang){
        return sanPhamDao.minDaBanByMaCuaHang(maCuaHang);
    }

//    admin - đếm số lượng cửa hàng đang haotj động
    @GetMapping("/admin/count-distinct-cua-hang-hoat-dong")
    public Long countDistinctCuaHangHoatDongAdmin(){
        return sanPhamDao.countDistinctCuaHangHoatDong();
    }

    @GetMapping("/admin/sum-da-ban")
    public Long tongDaBan(){
        return sanPhamDao.tongDaBan();
    }


}
