package com.example.booker;

import com.itextpdf.kernel.colors.ColorConstants;
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

import java.io.File;
import java.io.FileNotFoundException;

public class XuatPDF {
    public static void main(String[] args) throws FileNotFoundException {
        try {
            // Đường dẫn tới file PDF xuất ra và file font
            String dest = "hoa_don.pdf";
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
            document.add(new Paragraph("Người gửi: NameOfShop")
                    .setFont(font).setFontSize(10).setBold());
            document.add(new Paragraph("Số 1 đường b21 khu dân cư 91b, phường An Khánh, quận Ninh Kiều, Cần Thơ")
                    .setFont(font).setFontSize(10));

            document.add(new Paragraph("Người nhận: Phan Trọng Nghĩa")
                    .setFont(font).setFontSize(10).setBold());
            document.add(new Paragraph("0972376536\n18/45 hẻm 470 Tô Ký, phường Tân Chánh Hiệp, Tô Ký, quận 12, TP Hồ Chí Minh")
                    .setFont(font).setFontSize(10));
            document.add(new Paragraph("anh giao hàng sau 12h trưa giúp em, giờ đó em mới ngủ dậy")
                    .setFont(font).setFontSize(10).setItalic());

            // Chi tiết đơn hàng
            document.add(new Paragraph("Mã đơn hàng: 201").setFont(font).setFontSize(10).setBold());
            document.add(new Paragraph("Ngày đặt hàng: 20h13m8s 22/9/2024").setFont(font).setFontSize(10));

            // Bảng chi tiết sản phẩm
            float[] columnWidths = {3, 1, 2};
            Table table = new Table(UnitValue.createPercentArray(columnWidths));
            table.setWidth(UnitValue.createPercentValue(100));

            table.addCell(new Paragraph("Sản phẩm").setFont(font).setBold());
            table.addCell(new Paragraph("Số lượng").setFont(font).setBold());
            table.addCell(new Paragraph("Giá").setFont(font).setBold());

            table.addCell(new Paragraph("Hướng dẫn trade coin cho người mới").setFont(font));
            table.addCell(new Paragraph("2").setFont(font));
            table.addCell(new Paragraph("100.240.000").setFont(font));

            document.add(table);

            // Thông tin chi phí
            document.add(new Paragraph("Phí vận chuyển: 10.000").setFont(font).setFontSize(10));
            document.add(new Paragraph("Giảm giá: 60.000").setFont(font).setFontSize(10));
            document.add(new Paragraph("Thanh toán: 2.420.000").setFont(font).setFontSize(12).setBold());

            // Chân trang
            document.add(new Paragraph("Cảm ơn bạn đã mua hàng, bạn đánh giá 5 sao cho shop nhé")
                    .setFont(font).setFontSize(10).setItalic().setTextAlignment(TextAlignment.CENTER));

            // Đóng tài liệu
            document.close();
            System.out.println("PDF đã được tạo: " + new File(dest).getAbsolutePath());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
