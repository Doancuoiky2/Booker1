package com.example.booker.restController;

import com.example.booker.dao.DonHangChiTietDao;
import com.example.booker.entity.DonHangChiTiet;
import com.example.booker.request.ApiResponse;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@RequestMapping("/xuat-hoa-don")
public class InHoaDonPdf {

    @Autowired
    DonHangChiTietDao donHangChiTietDao;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> inHoaDonPdf(@PathVariable int id) {
        ApiResponse<Void> apiResponse = new ApiResponse<>();
        DonHangChiTiet dhct = donHangChiTietDao.findById(id).get();
        try {
            // Đường dẫn tới file PDF xuất ra và file font
//            String dest = System.getProperty("user.home") + "/Desktop/hoa_don.pdf";
            String dest = "D:\\du_an_tot_nghiep\\hoa_don.pdf";
            String fontPath = "font/arial.ttf"; // Thay bằng đường dẫn chính xác tới file font của bạn

            PdfWriter writer = new PdfWriter(dest);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf, PageSize.A5);

            document.setMargins(20, 20, 20, 20);

            // Tải font tùy chỉnh
            PdfFont font = PdfFontFactory.createFont(fontPath);

            // Tiêu đề
            document.add(new Paragraph("Booker").setFont(font).setFontSize(16).setBold().setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph("Giao hàng hoả tốc").setFont(font).setFontSize(12).setTextAlignment(TextAlignment.CENTER));

            // Thông tin người gửi và người nhận
            document.add(new Paragraph("Người gửi: " + dhct.getSan_pham().getCua_hang().getTen_cua_hang())
                    .setFont(font).setFontSize(10).setBold());
            document.add(new Paragraph(dhct.getSan_pham().getCua_hang().getDia_chi_cua_hang())
                    .setFont(font).setFontSize(10));

            document.add(new Paragraph("Người nhận: " + dhct.getDon_hang().getTai_khoan().getHo_ten())
                    .setFont(font).setFontSize(10).setBold());
            document.add(new Paragraph(dhct.getDon_hang().getTai_khoan().getSo_dt()+"\n" + dhct.getDon_hang().getDia_chi().getTen_dia_chi())
                    .setFont(font).setFontSize(10));

            // Chi tiết đơn hàng
            document.add(new Paragraph("Mã đơn hàng: " + dhct.getMa_don_hang_chi_tiet()).setFont(font).setFontSize(10).setBold());
            document.add(new Paragraph("Ngày đặt hàng: " + dhct.getDon_hang().getNgay_tao()).setFont(font).setFontSize(10));

            // Bảng chi tiết sản phẩm
            float[] columnWidths = {3, 1, 2};
            Table table = new Table(UnitValue.createPercentArray(columnWidths));
            table.setWidth(UnitValue.createPercentValue(100));

            table.addCell(new Paragraph("Sản phẩm").setFont(font).setBold());
            table.addCell(new Paragraph("Số lượng").setFont(font).setBold());
            table.addCell(new Paragraph("Giá").setFont(font).setBold());

            table.addCell(new Paragraph(dhct.getSan_pham().getTen_san_pham()).setFont(font));
            table.addCell(new Paragraph(String.valueOf(dhct.getSo_luong())).setFont(font));
            table.addCell(new Paragraph(String.valueOf(dhct.getThanh_tien())).setFont(font));

            document.add(table);

            // Thông tin chi phí
            document.add(new Paragraph("Phí vận chuyển: 10.000").setFont(font).setFontSize(10));
            document.add(new Paragraph("Giảm giá: " + dhct.getVoucher().getGiam_gia()).setFont(font).setFontSize(10));
            document.add(new Paragraph("Thanh toán: " + dhct.getThanh_tien()).setFont(font).setFontSize(12).setBold());

            // Chân trang
            document.add(new Paragraph("Cảm ơn bạn đã mua hàng, bạn đánh giá 5 sao cho shop nhé")
                    .setFont(font).setFontSize(10).setItalic().setTextAlignment(TextAlignment.CENTER));

            // Đóng tài liệu
            document.close();
            System.out.println("PDF đã được tạo: " + new File(dest).getAbsolutePath());
            apiResponse.setCode(HttpStatus.OK.value());
            apiResponse.setMessage("Xuất pdf thành công");
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
