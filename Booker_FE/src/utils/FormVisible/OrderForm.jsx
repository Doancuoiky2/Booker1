import React, { useEffect, useState } from "react";

import "./FormVisibleAll.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Notification from "../Notification/Notification";
import PrintBill from "./PrintBill";

import {
  getInfoOfOrderDetailById,
  updateOrderDetailStatus,
} from "../../utils/API/OrderDetailsAPI";
import Alert from "../../utils/Order/Alert";
import { getDonHangById } from "../API/OrderAPI";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { postLichSuTrangThaiGiaoHang } from "../API/LichSuTrangThaiGiaoHangAPI";

const OrderForm = ({
  onClose,
  status,
  statusHeader,
  orderDetailID,
  trangThaiBtn,
  setButton,
  onReload,
}) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // *Hiện thông báo thất bại hay thành công
  const [alert, setAlert] = useState({ message: "", type: "" });
  // * In hóa đơn
  const [isPrintBill, setIsPrintBill] = useState(false);
  // * Lưu thông tin đơn hàng chi tiết
  const [orderDetail, setOrderDetail] = useState({});
  const [donHang, setDonHang] = useState({});

  const fetchData = async () => {
    try {
      const orderDetailData = await getInfoOfOrderDetailById(orderDetailID);
      const idOrder = orderDetailData.don_hang?.ma_don_hang;
      setOrderDetail(orderDetailData);

      const orderData = await getDonHangById(idOrder);
      setDonHang(orderData);
    } catch (error) {
      console.log("Lỗi lấy thông tin 1 hóa đơn chi tiết: " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderDetailID]);

  const orderRows = () => {
    const rows = [];

    if (orderDetail) {
      rows.push(
        <tr className="order-form_tbody__row">
          {/* <td style={{ width: "20px" }}>1</td> */}
          <td style={{ width: "100px" }}>
            <img
              className="order-form_img"
              src={`${orderDetail.san_pham?.anh_san_pham}`}
              alt={`${orderDetail.san_pham?.ten_san_pham}`}
            />
          </td>
          <td style={{ width: "200px", color: "black" }}>
            {orderDetail.san_pham?.ten_san_pham}
          </td>
          <td style={{ width: "100px", color: "#888992" }}>
            {orderDetail.so_luong}
          </td>
          {orderDetail.phuong_thuc_thanh_toan?.id === 3 ? (
            <>
              {/* <td style={{ width: "120px, color: '#888992' " }}>
                {orderDetail.san_pham?.gia_sol} SOL
              </td>
              <td style={{ width: "120px, color: '#888992' " }}>{orderDetail.thanh_tien} SOL</td> */}
            </>
          ) : (
            <>
              <td style={{ width: "120px ", color: "#888992" }}>
                {orderDetail.san_pham?.gia?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td style={{ width: "120px ", color: "#888992" }}>
                {orderDetail.thanh_tien?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </>
          )}
        </tr>
      );
    }
    return rows;
  };

  // * Thông báo khi bấm nút hủy đơn hàng
  const [thongBaoHuyDon, setThongBaoHuyDon] = useState(false);
  // * * ẩn hiện form thông báo hủy đơn
  const handleShowCancelOrder = () => {
    setThongBaoHuyDon(true);
  };
  const handleCloseCancelOrder = () => {
    setThongBaoHuyDon(false);
  };
  const handleApplyCancelOrder = () => {
    alert("Close order" + orderDetailID);
  };

  // * Thông báo khi bấm nút xác nhận đơn hàng
  const [thongBaoXacNhanDatHang, setThongBaoXacNhanDatHang] = useState(false);
  // * * ẩn hiện form thông báo xác nhận đơn hàng
  const handleShowApplyOrder = () => {
    setThongBaoXacNhanDatHang(true);
  };
  const handleCloseApplyOrder = () => {
    setThongBaoXacNhanDatHang(false);
  };
  const handleApplyApplyOrder = () => {
    handleUpdateOrderStatus();
  };

  // * Thông báo khi bấm nút hủy yêu cầu trả hàng
  const [thongBaoHuyTraHang, setThongBaoHuyTraHang] = useState(false);
  // * * ẩn hiện form thông báo Hủy yêu cầu trả hàng
  const handleShowThongBaoHuyTraHang = () => {
    setThongBaoHuyTraHang(true);
  };
  const handleCloseThongBaoHuyTraHang = () => {
    setThongBaoHuyTraHang(false);
  };
  const handleApplyThongBaoHuyTraHang = () => {
    handleUpdateOrderStatus();
  };

  // * Thông báo khi bấm nút xác nhận yêu cầu trả hàng
  const [thongBaoXacNhanTraHang, setThongBaoXacNhanTraHang] = useState(false);
  // * * ẩn hiện form thông báo Xác nhận yêu cầu trả hàng
  const handleShowXacNhanThongBaoHuyTraHang = () => {
    setThongBaoXacNhanTraHang(true);
  };
  const handleCloseXacNhanThongBaoHuyTraHang = () => {
    setThongBaoXacNhanTraHang(false);
  };
  const handleApplyXacNhanThongBaoHuyTraHang = () => {
    handleUpdateOrderStatus();
  };

  // * Hàm cập nhật order

  const handleUpdateOrderStatus = async (maTrangThai) => {
    try {
      const orderDataUpdate = {
        ...orderDetail,
        ma_don_hang_chi_tiet: orderDetail.ma_don_hang_chi_tiet,
        trang_thai: {
          ma_trang_thai: maTrangThai,
        },
      };
      const data = await updateOrderDetailStatus(orderDataUpdate);

      setThongBaoHuyDon(false);
      setThongBaoXacNhanDatHang(false);
      setThongBaoHuyTraHang(false);
      setThongBaoXacNhanTraHang(false);

      console.log("Update trạng thái:", data);

      postLichSuTrangThaiDonHangChiTiet(maTrangThai);

      if (data) {
        NotificationManager.success(
          "Thành công",
          "Cập nhật trạng thái đơn hàng thành công"
        );
        onClose();
        onReload();
      } else {
        NotificationManager.error(
          "Thất bại",
          "Cập nhật trạng thái đơn hàng thất bại"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Thất bại",
        "Cập nhật trạng thái đơn hàng thất bại"
      );
      console.log("Lỗi khi cập nhật trạng thái đơn hàng: " + error);
    }
  };

  const postLichSuTrangThaiDonHangChiTiet = async (maTrangThai) => {
    let lichSuTrangThaiDonHangItem = null;
    try {
      if (maTrangThai === 12) {
        lichSuTrangThaiDonHangItem = {
          status: "Đã xác nhận đơn hàng",
          message:
            "Đơn hàng đã được đóng gói và bàn giao cho đơn vị vận chuyển",
          donHangChiTietId: orderDetailID,
        };
      } else if (maTrangThai === 16) {
        lichSuTrangThaiDonHangItem = {
          status: "Đơn hàng đã bị hủy",
          message: "Cửa hàng đã hủy đơn do một vài sự cố",
          donHangChiTietId: orderDetailID,
        };
      } else if (maTrangThai === 18) {
        lichSuTrangThaiDonHangItem = {
          status: "Hủy yêu cầu trả hàng - hoàn tiền",
          message: "Cửa hàng đã hủy yêu cầu trả hàng - hoàn tiền",
          donHangChiTietId: orderDetailID,
        };
      } else if (maTrangThai === 17) {
        lichSuTrangThaiDonHangItem = {
          status: "Xác nhận trả hàng - hoàn tiền",
          message:
            "Cửa hàng đã đồng ý với yêu cầu trả hàng - hoàn tiền của bạn",
          donHangChiTietId: orderDetailID,
        };
      }

      const lichSuTrangThaiDonHangData = await postLichSuTrangThaiGiaoHang(
        lichSuTrangThaiDonHangItem
      );

      console.log("lichSuTrangThaiDonHangData: ", lichSuTrangThaiDonHangData);
    } catch (error) {
      console.log("Lỗi khi postLichSuTrangThaiDonHangChiTiet: ", error);
    }
  };

  //* hiện form printbill
  const handleShowPrintBill = () => {
    setIsPrintBill(true);
  };
  const handleClosePrintBill = () => {
    setIsPrintBill(false);
  };
  const handleApplyPrintBill = () => {};

  return (
    <div className="bg_black">
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
      {orderDetail && (
        <div className="order-form scroll-container3">
          <div className="scroll-container3">
            <div className="order-form_title">
              <h1>Chi tiết đơn hàng</h1>
            </div>

            <div className="order-form_body">
              {/* form1 */}
              <div className="order-form_bodyInfo">
                <div className="order-form_body__id">
                  <div className="order-form_body__id-col">
                    <div>
                      <strong>Đơn hàng:</strong>
                      <p>{orderDetail.don_hang?.ma_hien_thi}</p>
                    </div>
                    <p className="order-form_body__id-col-date">
                      {new Date(
                        orderDetail.don_hang?.ngay_tao
                      ).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div className="order-form_body__id-col">
                    <p className={status}>{statusHeader}</p>
                  </div>
                </div>

                <div className="order-form_bodyInfo-buyer">
                  <div className="order-form_bodyInfo-buyer-form1">
                    <div className="order-form_bodyInfo-buyer-form_title">
                      <h3>KHÁCH HÀNG</h3>
                    </div>
                    <div className="order-form_bodyInfo-buyer-form_info">
                      <p>{orderDetail.don_hang?.tai_khoan?.ho_ten}</p>
                      <p>{orderDetail.don_hang?.tai_khoan?.so_dt}</p>
                    </div>
                  </div>

                  <div className="order-form_bodyInfo-buyer-form2">
                    <div className="order-form_bodyInfo-buyer-form_title">
                      <h3>NGƯỜI NHẬN</h3>
                    </div>
                    <div className="order-form_bodyInfo-buyer-form_info">
                      <p>{orderDetail.don_hang?.tai_khoan?.ho_ten}</p>
                      <p>{orderDetail.don_hang?.tai_khoan?.so_dt}</p>
                      <p>{orderDetail.don_hang?.dia_chi?.ten_dia_chi}</p>
                    </div>
                  </div>
                </div>

                <div className="order-form_bodyInfo-buyer-message">
                  <div className="order-form_bodyInfo-buyer-form_title">
                    <h3>GHI CHÚ CỦA KHÁCH HÀNG</h3>
                  </div>
                  <div className="order-form_bodyInfo-buyer-messageInfo">
                    <p>
                      {donHang.loi_nhan
                        ? donHang.loi_nhan
                        : "Không có ghi chú."}
                    </p>
                  </div>
                </div>

                <div>
                  <table>
                    <thead>
                      <tr>
                        {/* <th style={{ width: "20px" }}>Stt</th> */}
                        <th style={{ width: "100px" }}>Hình ảnh</th>
                        <th style={{ width: "200px" }}>Tên sản phẩm</th>
                        <th style={{ width: "100px" }}>Số lượng</th>
                        <th style={{ width: "120px" }}>Đơn giá</th>
                        <th style={{ width: "120px" }}>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody
                      className="order-form_tbody"
                      style={{ marginTop: "10px" }}
                    >
                      {orderRows()}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* form 2 */}
              <div className="order-form_bodyMoney">
                <div className="order-form_bodyMoney-pttt">
                  <h3>PHƯƠNG THỨC THANH TOÁN</h3>
                  <div className="order-form_bodyMoney-pttt_info">
                    <p>{orderDetail.phuong_thuc_tt?.ten_phuong_thuc}</p>
                    <p>
                      {orderDetail.thanh_tien?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>

                <div className="order-form_bodyMoney-main">
                  <div className="order-form_bodyMoney-main_info">
                    <p>Tạm tính</p>
                    <p>
                      {(orderDetail.so_luong * orderDetail.gia)?.toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </p>
                  </div>
                  <div className="order-form_bodyMoney-main_info">
                    <p>Phí vận chuyển</p>
                    <p>
                      {orderDetail.phi_van_chuyen?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="order-form_bodyMoney-main_info">
                    <p>
                      Mã giảm giá{" "}
                      <p>
                        {orderDetail.voucher
                          ? orderDetail.voucher?.ten_voucher
                          : "Chưa áp dụng"}
                      </p>
                    </p>
                    {/* <p>{orderDetail.voucher?.ten_voucher}</p> */}

                    <p className="colorRed">
                      -{" "}
                      {orderDetail.voucher
                        ? orderDetail.voucher?.giam_gia?.toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )
                        : "0đ"}{" "}
                    </p>
                  </div>

                  <div className="order-form_bodyMoney-main_info">
                    <p>Thành tiền</p>
                    <p>
                      {orderDetail.thanh_tien?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>

                  <div className="order-form_bodyMoney-main_dvvc">
                    <p>Đơn vị vận chuyển</p>
                    <p>{orderDetail.don_vi_van_chuyen}</p>
                  </div>

                  <div className="order-form_bodyMoney-main_form">
                    <div className="order-form_bodyMoney-main_thanhtoan">
                      <p>Cần thanh toán</p>
                      <p>
                        {orderDetail.thanh_tien?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                    <div className="order-form_bodyMoney-main_vat">
                      <p>Phí VAT (10%) / Phí sàn</p>
                      <p className="colorRed">
                        -{" "}
                        {orderDetail.phi_dich_vu?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* tổng quan lợi nhuận */}
                <div className="order-form_bodyMoney-main_end">
                  <h3>TỔNG KẾT</h3>
                  <div className="order-form_bodyMoney-main_end--item">
                    <p>Tổng cộng người mua trả</p>
                    <p>
                      {orderDetail.thanh_tien?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="order-form_bodyMoney-main_end--item">
                    <p>Lợi nhuận shop nhận được</p>
                    <p>
                      {orderDetail.doanh_thu?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>

                <div className="order-form_button">
                  {status === "xacnhan" && (
                    <>
                      <div className="order-form_button-item">
                        <button
                          className="buttonDefault"
                          onClick={handleShowCancelOrder}
                        >
                          Hủy đơn
                        </button>

                        <button
                          className="buttonDefault"
                          onClick={handleShowPrintBill}
                        >
                          In hóa đơn
                        </button>

                        <button className="buttonDefault" onClick={onClose}>
                          Đóng
                        </button>
                      </div>

                      <button
                        className="buttonMain"
                        onClick={handleShowApplyOrder}
                      >
                        Xác nhận đặt hàng
                      </button>
                    </>
                  )}
                  {status === "trahang" && trangThaiBtn === true && (
                    <>
                      <div className="order-form_button-item">
                        <button
                          className="buttonDefault2"
                          onClick={handleShowThongBaoHuyTraHang}
                        >
                          Hủy yêu vầu
                        </button>
                        <button
                          className="buttonDefault2"
                          onClick={handleShowXacNhanThongBaoHuyTraHang}
                        >
                          Xác nhận trả hàng
                        </button>
                      </div>
                      <button className="buttonMain" onClick={onClose}>
                        Đóng
                      </button>
                    </>
                  )}
                  {setButton === true && (
                    <>
                      <button className="buttonMain" onClick={onClose}>
                        Đóng
                      </button>
                    </>
                  )}
                  {status === "huydon" && (
                    <>
                      <button className="buttonMain" onClick={onClose}>
                        Đóng
                      </button>
                    </>
                  )}
                  {status === "dangvanchuyen" && (
                    <>
                      <button className="buttonMain" onClick={onClose}>
                        Đóng
                      </button>
                    </>
                  )}
                  {status === "dagiao" && (
                    <>
                      <button className="buttonMain" onClick={onClose}>
                        Đóng
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="addnewbook-header">
            <h3>
              Mã đơn hàng: {orderDetail.don_hang?.ma_hien_thi}{" "}
              <span className={status}>{statusHeader}</span>
            </h3>
            <FontAwesomeIcon
              onClick={onClose}
              style={{ cursor: "pointer" }}
              className="faXmark"
              icon={faXmark}
            ></FontAwesomeIcon>
          </div> */}
            {/* table thông tin từng sản phẩm trong đơn hàng */}
            {/* <h3 style={{ marginTop: "10px" }}>Thông tin đơn hàng:</h3> */}

            {/* ======================== */}

            {/* thông tin chi tiết */}
            {/* <div className="order-form_info">
            <h3>Ngày đặt hàng: {orderDetail.don_hang?.ngay_tao}</h3>
            <p style={{ marginTop: "10px" }}>
              <strong>Người nhận:</strong>{" "}
              {orderDetail.don_hang?.tai_khoan?.ho_ten}
              <strong style={{ marginLeft: "70px" }}>Số điện thoại: </strong>
              {orderDetail.don_hang?.tai_khoan?.so_dt}
            </p>
            <p>
              <strong>Địa chỉ:</strong>{" "}
              {orderDetail.don_hang?.dia_chi?.ten_dia_chi}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {orderDetail.phuong_thuc_thanh_toan?.ten_phuong_thuc}
            </p>
            <p>
              <strong>Đơn vị vận chuyển:</strong>{" "}
              {orderDetail.don_vi_van_chuyen}
            </p>
            <p>
              <strong>Phí vận chuyển:</strong> {orderDetail.phi_van_chuyen}
            </p>
            <p>
              <strong>Giảm giá: </strong>
              {orderDetail.voucher
                ? orderDetail.voucher?.giam_gia?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : "0đ"}{" "}
              {orderDetail.voucher ? orderDetail.voucher?.ten_voucher : ""}
            </p>
            <p>
              <strong>Lời nhắn:</strong>{" "}
              {donHang.loi_nhan ? donHang.loi_nhan : "không có lời nhắn"}
            </p>
            {status === "trahang" && (
              <p>
                <strong>Lý do Trả hàng- Hoàn tiền:</strong> Sản phẩm không giống
                mẫu.
              </p>
            )}
            {orderDetail.phuong_thuc_thanh_toan?.id === 3 ? (
              <p style={{ fontSize: "23px" }}>
                <strong>Tổng tiền:</strong> {orderDetail.thanh_tien} SOL
              </p>
            ) : (
              <p style={{ fontSize: "23px" }}>
                <strong>Tổng tiền:</strong>{" "}
                {orderDetail.thanh_tien?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            )}
          </div> */}

            {/* button */}
            {/* <div className="order-form_button">
            {status === "xacnhan" && (
              <>
                <button onClick={handleShowCancelOrder}>Hủy đơn</button>
                <button onClick={handleShowApplyOrder}>
                  Xác nhận đặt hàng
                </button>
                <button onClick={handleShowPrintBill}>In hóa đơn</button>
              </>
            )}
            {status === "trahang" && trangThaiBtn == true && (
              <>
                <button onClick={handleShowThongBaoHuyTraHang}>
                  Hủy yêu vầu
                </button>
                <button onClick={handleShowXacNhanThongBaoHuyTraHang}>
                  Xác nhận trả hàng
                </button>
              </>
            )}
          </div> */}
          </div>
        </div>
      )}

      {thongBaoXacNhanDatHang && status === "xacnhan" && (
        <Notification
          title={"Xác nhận đơn hàng"}
          content1={
            'Khi bấm xác nhận đồng nghĩa với việc bạn thông báo cho khách hàng biết rằng: “Sản phẩm đã được đóng gói và chuyển giao cho dịch vụ vận chuyển"'
          }
          onClose={handleCloseApplyOrder}
          onApply={() => handleUpdateOrderStatus(12)}
        />
      )}
      {thongBaoHuyDon && status === "xacnhan" && (
        <Notification
          title={"Hủy đơn hàng"}
          content1={"Bạn chắc chắn muốn hủy đơn hàng này?"}
          onClose={handleCloseCancelOrder}
          onApply={() => handleUpdateOrderStatus(16)}
        />
      )}
      {thongBaoHuyTraHang && status === "trahang" && (
        <Notification
          title={"Hủy yêu cầu Trả hàng - hoàn tiền"}
          content1={
            'Khi bấm xác nhận đồng nghĩa với việc bạn thông báo cho khách hàng biết rằng: “Tôi đồng ý với yêu cầu Trả hàng - Hoàn tiền."'
          }
          onClose={handleCloseThongBaoHuyTraHang}
          onApply={() => handleUpdateOrderStatus(18)}
        />
      )}
      {thongBaoXacNhanTraHang && status === "trahang" && (
        <Notification
          title={"Xác nhận Trả hàng - Hoàn tiền"}
          content1={
            'Khi bấm xác nhận đồng nghĩa với việc bạn thông báo cho khách hàng biết rằng: “Tôi đồng ý với yêu cầu Trả hàng - Hoàn tiền."'
          }
          onClose={handleCloseXacNhanThongBaoHuyTraHang}
          onApply={() => handleUpdateOrderStatus(17)}
        />
      )}
      {isPrintBill && (
        <PrintBill
          listOrder={orderDetail}
          onClose={handleClosePrintBill}
          onApply={handleApplyPrintBill}
        />
      )}

      <NotificationContainer />
    </div>
  );
};

export default OrderForm;
