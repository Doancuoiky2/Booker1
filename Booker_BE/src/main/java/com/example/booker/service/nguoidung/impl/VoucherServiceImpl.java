package com.example.booker.service.nguoidung.impl;

import com.example.booker.dao.VoucherDao;
import com.example.booker.entity.Voucher;
import com.example.booker.service.nguoidung.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    VoucherDao voucherDao;

    @Override
    public Voucher createVoucher(Voucher voucher) {
        return voucherDao.save(voucher);
    }

    @Override
    public Voucher updateVoucher(Voucher voucher) {
        Voucher vc = new Voucher();
        return voucherDao.save(voucher);
    }

//    @Override
//    public void deleteVoucher(int idch, String ma_voucher) {
//
//    }

    @Override
    public void deleteVoucher(int ma) {
        voucherDao.deleteById(ma);
    }

    @Override
    public List<Voucher> getVouchers(int idch) {
        return voucherDao.findByCuaHang(idch);
    }

    @Override
    public Voucher getVoucherByMaVoucher(int idch, int ma_voucher) {
        return voucherDao.findVoucherByMaVoucher(idch, ma_voucher);
    }
}
