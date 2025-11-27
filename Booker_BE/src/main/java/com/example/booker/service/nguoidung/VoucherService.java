package com.example.booker.service.nguoidung;

import com.example.booker.entity.Voucher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VoucherService {

    Voucher createVoucher(Voucher voucher);

    Voucher updateVoucher(Voucher voucher);

    //void deleteVoucher(int idch, String ma_voucher);

    void deleteVoucher(int ma);

    List<Voucher> getVouchers(int idch);

    Voucher getVoucherByMaVoucher(int idch, int ma_voucher);

}
