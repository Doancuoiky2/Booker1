package com.example.booker.service.nguoidung.impl;

import com.example.booker.dao.SanPhamDao;
import com.example.booker.entity.SanPham;
import com.example.booker.entity.view.SanPhamView;
import com.example.booker.service.nguoidung.SaveFileExcelService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class SaveFileExcelServiceImpl implements SaveFileExcelService {

    @Autowired
    SanPhamDao sanPhamDao;


    @Override
    public void saveSanPhamExcel(int ma_cua_hang, int ma_trang_thai, String filePath) {
        List<SanPham> listSp = sanPhamDao.findSanPhamByTrangThai(ma_cua_hang, ma_trang_thai);

        try {
            FileOutputStream fileOut = new FileOutputStream(filePath);
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet();

            //Tao header
            Row headerRow = sheet.createRow(0);
            String[] header = {"Mã sản phẩm", "Tên sản phẩm", "Tác giả", "Thể loại", "Giá", "Ngày tạo",
                    "Đã bán", "Còn hàng"};

            // Tạo CellStyle cho ngày tháng
            CellStyle dateCellStyle = workbook.createCellStyle();
            CreationHelper creationHelper = workbook.getCreationHelper();
            short dateFormat = creationHelper.createDataFormat().getFormat("dd-MM-yyyy"); // Định dạng ngày tháng
            dateCellStyle.setDataFormat(dateFormat);

            for (int col = 0; col < header.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(header[col]);
                CellStyle headerStyle = workbook.createCellStyle();
                Font font = workbook.createFont();
                font.setBold(true);
                headerStyle.setFont(font);
                cell.setCellStyle(headerStyle);
            }
            //Tao data row
            int rowIndex = 1;
            for (SanPham sanPham : listSp) {
                Row row = sheet.createRow(rowIndex++);
                row.createCell(0).setCellValue(sanPham.getMa_san_pham());
                row.createCell(1).setCellValue(sanPham.getTen_san_pham());
                row.createCell(2).setCellValue(sanPham.getTac_gia());
                row.createCell(3).setCellValue(sanPham.getThe_loai().getTen_the_loai());
                row.createCell(4).setCellValue(sanPham.getGia());
                Cell cellNgayTao = row.createCell(5);
                if (sanPham.getNgay_tao() != null) {
                    LocalDate localDate = sanPham.getNgay_tao();
                    Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
                    cellNgayTao.setCellValue(date);
                    cellNgayTao.setCellStyle(dateCellStyle);
                } else {
                    cellNgayTao.setCellValue(""); // Hoặc đặt giá trị mặc định
                }
                Cell cellDaban = row.createCell(6);
                if (sanPham.getDa_ban() != null) {
                    cellDaban.setCellValue(sanPham.getDa_ban());
                } else {
                    cellDaban.setCellValue(0);
                }
                row.createCell(7).setCellValue(sanPham.getSo_luong_hang());
            }
            for (int i = 0; i < header.length; i++) {
                sheet.autoSizeColumn(i);
            }
            workbook.write(fileOut);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
