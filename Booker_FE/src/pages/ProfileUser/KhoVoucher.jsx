import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../utils/Order/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

const KhoVoucher = ({ idTaiKhoan }) => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Hàm fetch dữ liệu từ API

  const fetchVouchers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/save-voucher/get-${idTaiKhoan}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setVouchers(response.data); // Lưu dữ liệu từ API vào state
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, [idTaiKhoan]);

  // hàm xóa voucher ko sử dụng
  const handleUnsaveVoucher = async (idVoucher) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/save-voucher`,
        {
          params: {
            id_voucher: idVoucher,
            id_tai_khoan: idTaiKhoan,
          },
        }
      );

      NotificationManager.success("Đã bỏ lưu voucher thành công!");
      fetchVouchers();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        NotificationManager.warning("Voucher này chưa được lưu.");
      } else {
        NotificationManager.error("Thất bại", "Không thể bỏ lưu voucher.");
      }
      console.error("Error deleting saved voucher:", error);
    }
  };

  if (loading) {
    <Loading />;
  }

  return (
    <div>
      <div className="voucher-user">
        <h2>Kho Voucher</h2>
        <div className="voucher-user_list">
          {vouchers.length === 0 ? (
            <p style={{ fontSize: "20px", color: "red" }}>
              Không có voucher nào được lưu.
            </p>
          ) : (
            vouchers.map((voucher, index) => (
              <div
                key={index}
                className={`voucher-user_item ${
                  voucher.voucher.trangThai === 2
                    ? "cursor"
                    : "voucher-user_item-hover"
                }`}
                onClick={() =>
                  navigate(
                    `/use-voucher-page/code/${voucher.voucher.id_voucher}?store=${voucher.voucher.cua_hang.ma_cua_hang}`
                  )
                }
              >
                <img
                  src={`${voucher.voucher.cua_hang.anh_dai_dien}`}
                  alt="Voucher"
                />
                <div className="voucher-user_item_info">
                  <p>
                    {voucher.voucher?.ten_voucher ||
                      "Tên voucher không xác định"}
                  </p>
                  <p>Giảm ₫{voucher.voucher?.giam_gia.toLocaleString("vi-VN") || 0}</p>
                  <p>Giá tối thiểu ₫{voucher.voucher?.gia_ap_dung.toLocaleString("vi-VN") || 0}</p>
                  <p>HSD: {voucher.voucher?.ngay_het_han || "Không rõ"}</p>
                </div>
                <div className="voucher-user_item_sld">
                  x {voucher.voucher.so_lan_dung || 1}
                </div>
                {voucher.voucher.trangThai === 2 ? (
                  <div className="voucher-user_item_conhan">Còn hạn</div>
                ) : (
                  <div className="voucher-user_item_hethan">Hết hạn</div>
                )}

                <div
                  className="voucher-delete"
                  onClick={() =>
                    handleUnsaveVoucher(voucher.voucher.id_voucher)
                  }
                >
                  <FontAwesomeIcon
                    icon={faX}
                    className="voucher-deleteIcon"
                  ></FontAwesomeIcon>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KhoVoucher;
