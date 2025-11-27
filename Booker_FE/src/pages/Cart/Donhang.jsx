import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Donhang.module.css";
import RatingForm from "../Rating/RatingForm";
import ReportForm from "../Rating/Report";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faSearch,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ChatFormUser from "../../chat/ChatFormUser";
import { useNavigate } from "react-router-dom";
import DonHangChiTiet from "./DonHangChiTiet";
import { postLichSuTrangThaiGiaoHang } from "../../utils/API/LichSuTrangThaiGiaoHangAPI";

const DonHang = () => {
  const [key, setKey] = useState(1); // đổi giao diện
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [filteredOrderDetails, setFilteredOrderDetails] = useState([]);
  const [selectedReason, setSelectedReason] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderDetailToCancel, setOrderDetailToCancel] = useState(null);
  const [activeStatus, setActiveStatus] = useState("Tất cả");
  const [userId, setUserID] = useState(null);
  const [idProduct, setIdProduct] = useState(null);
  const [idOrderDetail, setIdOrderdetail] = useState(null);
  const [idCuaHang, setIdCuaHang] = useState(null);
  const [stroID, setStoreID] = useState(null); // ID cửa hàng để chat
  const [trangThai, setTrangThai] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllOrderDetails = async () => {
      try {
        const userId = JSON.parse(sessionStorage.getItem("user")).id_tai_khoan;
        setUserID(userId);
        const response = await axios.get(
          `http://localhost:8080/api/v1/donhang/taikhoan-${userId}`
        );
        setOrderDetails(response.data);
        setFilteredOrderDetails(response.data); // Hiển thị tất cả đơn hàng ban đầu
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng chi tiết:", error);
      }
    };
    fetchAllOrderDetails();
  }, []);

  // * hiện form chat
  const [formChat, setFormChat] = useState(false);

  const handleChatOpen = (idCuaHang) => {
    setStoreID(idCuaHang);
    setFormChat(true);
  };
  const handleChatClose = () => {
    setFormChat(false);
  };

  const filterOrderDetails = (status) => {
    // Map trạng thái hiển thị sang trạng thái trong DB
    let dbStatus = status;

    if (status === "Đơn hủy") {
      dbStatus = "Khách hàng hủy";
    }

    setActiveStatus(status); // Cập nhật tab đang chọn

    // Lọc đơn hàng theo trạng thái
    const filteredOrders = orderDetails.filter(
      (order) =>
        dbStatus === "Tất cả" || order.trang_thai?.ten_trang_thai === dbStatus
    );

    setFilteredOrderDetails(filteredOrders);
  };

  const handleCancelOrderDetail = (orderDetailId) => {
    setOrderDetailToCancel(orderDetailId);
    setShowCancelModal(true);
  };

  // Hành động hủy đơn hàng
  const confirmCancelOrderDetail = async () => {
    try {
      const reason = selectedReason;
      await axios.put(
        `http://localhost:8080/api/v1/orderdetail/huy/${orderDetailToCancel}`,
        null,
        {
          params: {
            lyDoHuy: reason,
          },
        }
      );

      const updatedOrderDetails = orderDetails.map((detail) =>
        detail.ma_don_hang_chi_tiet === orderDetailToCancel
          ? {
              ...detail,
              trang_thai: {
                ma_trang_thai: 14,
                ten_trang_thai: "Đã hủy đơn hàng",
              },
            }
          : detail
      );

      const lichSuTrangThaiDonHangItem1 = {
        status: "Đơn hàng đã bị tạm ngưng",
        message: "Bạn đã hủy đơn hàng",
        donHangChiTietId: orderDetailToCancel,
      };

      const lichSuTrangThaiDonHangData = await postLichSuTrangThaiGiaoHang(
        lichSuTrangThaiDonHangItem1
      );

      NotificationManager.success("Đơn hàng đã được hủy", "");

      setOrderDetails(updatedOrderDetails);
      setFilteredOrderDetails(
        updatedOrderDetails.filter(
          (detail) =>
            activeStatus === "Tất cả" ||
            detail.trang_thai?.ten_trang_thai === activeStatus
        )
      );

      setShowCancelModal(false);
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
    }
  };

  const confirmReceivedOrderDetail = async (orderDetailId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/orderdetail/nhan/${orderDetailId}`
      );

      const updatedOrderDetails = orderDetails.map((detail) =>
        detail.ma_don_hang_chi_tiet === orderDetailId
          ? {
              ...detail,
              trang_thai: { ma_trang_thai: 13, ten_trang_thai: "Đã giao hàng" },
            }
          : detail
      );

      setOrderDetails(updatedOrderDetails);
      setFilteredOrderDetails(
        updatedOrderDetails.filter(
          (detail) =>
            activeStatus === "Tất cả" ||
            detail.trang_thai?.ten_trang_thai === activeStatus
        )
      );

      const lichSuTrangThaiDonHangItem2 = {
        status: "Xác nhận đã nhận hàng",
        message: "Giao hàng thành công",
        donHangChiTietId: orderDetailId,
      };

      const lichSuTrangThaiDonHangData = await postLichSuTrangThaiGiaoHang(
        lichSuTrangThaiDonHangItem2
      );

      console.log("lichSuTrangThaiDonHangData: ", lichSuTrangThaiDonHangData);

      NotificationManager.success("Đã xác nhận nhận hàng", "");
    } catch (error) {
      console.error("Lỗi khi xác nhận nhận hàng:", error);
    }
  };

  const confirmTraHang = async (orderDetailId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/orderdetail/tra/${orderDetailId}`
      );

      const updatedOrderDetails = orderDetails.map((detail) =>
        detail.ma_don_hang_chi_tiet === orderDetailId
          ? {
              ...detail,
              trang_thai: {
                ma_trang_thai: 15,
                ten_trang_thai: "Yêu cầu trả hàng / Hoàn tiền",
              },
            }
          : detail
      );

      setOrderDetails(updatedOrderDetails);
      setFilteredOrderDetails(
        updatedOrderDetails.filter(
          (detail) =>
            activeStatus === "Tất cả" ||
            detail.trang_thai?.ten_trang_thai === activeStatus
        )
      );

      const lichSuTrangThaiDonHangItem1 = {
        status: "Yêu cầu trả hàng / hoàn tiền",
        message: "Yêu cầu của bạn đã được gửi đến cửa hàng",
        donHangChiTietId: orderDetailId,
      };

      const lichSuTrangThaiDonHangData = await postLichSuTrangThaiGiaoHang(
        lichSuTrangThaiDonHangItem1
      );

      NotificationManager.success("Đã gửi yêu cầu trả hàng - hoàn tiền", "");
    } catch (error) {
      console.error("Lỗi khi yêu cầu trả hàng/Hoàn tiền:", error);
    }
  };
  const [showForm, setShowForm] = useState(false);
  const [showFormReport, setShowFormReport] = useState(false);

  const handleRateClick = async (orderDetailId, productId) => {
    const userId = JSON.parse(sessionStorage.getItem("user")).id_tai_khoan; // Lấy userId từ sessionStorage
    setUserID(userId);
    setIdOrderdetail(orderDetailId);
    setIdProduct(productId);
    setShowForm(true);
    console.log(productId);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleReportClick = async (idCuaHang, idProduct) => {
    setIdCuaHang(idCuaHang);
    setIdProduct(idProduct);
    setShowFormReport(true);
    console.log(123);
  };
  const handleCloseFormReport = () => {
    setShowFormReport(false);
  };

  // xem chi tiết đơn hàng
  const hanldeChiTietDonHang = (orderDetail) => {
    setKey(2);
    setOrderDetail(orderDetail);
    getMaTrangThaiDonHang(orderDetail?.trang_thai?.ma_trang_thai);
  };

  // xử lý mã trạng thái
  const getMaTrangThaiDonHang = (idTrangThai) => {
    switch (idTrangThai) {
      case 11:
        return setTrangThai(1);
      case 12:
        return setTrangThai(3);
      case 13:
        return setTrangThai(4);
      case 14:
        return setTrangThai(6);
      case 16:
        return setTrangThai(7);
      case 15:
        return setTrangThai(8);
      case 17:
        return setTrangThai(9);
      case 18:
        return setTrangThai(10);
      default:
        return setTrangThai(5);
    }
  };

  // trở lại trang đơn mua
  const handleClickBack = () => {
    setKey(1);
  };

  return (
    <div>
      {/* <HeaderUser/> */}
      {key === 1 ? (
        <>
          <div className={styles.orderContainer}>
            <div className={styles.orderTabs}>
              {[
                "Tất cả",
                "Chờ xác nhận",
                "Đang vận chuyển",
                "Đã giao hàng",
                "Đơn hủy",
                "Trả hàng / Hoàn tiền",
              ].map((status) => (
                <button
                  key={status}
                  className={`${styles.buttonDonHang} ${
                    activeStatus === status ? styles.active : ""
                  }`}
                  onClick={() => filterOrderDetails(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className={styles.donhang_search}>
              <FontAwesomeIcon
                className={styles.donhang_search_icon}
                icon={faSearch}
              ></FontAwesomeIcon>
              <input
                className={styles.donhang_search_input}
                placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản Phẩm"
              />
            </div>

            <div className={styles.orderList}>
              {filteredOrderDetails.map((detail, index) => (
                <div
                  key={detail.ma_don_hang_chi_tiet}
                  className={styles.orderDetailItem}
                >
                  <div className={styles.orderDetailHeaderM}>
                    <div className={styles.orderDetailHeader}>
                      <div className={styles.orderDetailHeaderShop}>
                        <p  >{detail.san_pham.cua_hang.ten_cua_hang}</p>
                        <button
                          onClick={() =>
                            handleChatOpen(detail.san_pham.cua_hang.ma_cua_hang)
                          }
                        >
                          <FontAwesomeIcon
                            className={styles.iconShop}
                            icon={faCommentDots}
                          ></FontAwesomeIcon>
                          Chat
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/PageSeller/${detail.san_pham.cua_hang.ma_cua_hang}`
                            )
                          }
                        >
                          <FontAwesomeIcon
                            className={styles.iconShop}
                            icon={faStore}
                          ></FontAwesomeIcon>
                          Xem Shop
                        </button>
                      </div>
                      <div className={styles.orderDetailStatus}>
                        <p style={{ fontSize: "16px" }}>
                          {detail.trang_thai?.ten_trang_thai ===
                          "Khách hàng hủy"
                            ? "Đã hủy đơn hàng"
                            : detail.trang_thai?.ten_trang_thai ||
                              "Không xác định"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.orderDetailBodyM}
                    onClick={() => {
                      hanldeChiTietDonHang(detail);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <div className={styles.orderDetailBody}>
                      <div style={{ marginRight: "20px" }}>
                        <img
                          src={detail.san_pham?.anh_san_pham}
                          alt={detail.san_pham?.ten_san_pham}
                          className={styles.productImage}
                        />
                      </div>
                      <div className={styles.orderDetailBodyInfo}>
                        <h4 style={{ marginBottom: "10px", fontSize: "17px" }}>
                          {detail.san_pham?.ten_san_pham}
                        </h4>
                        <p style={{ fontSize: "16px" }}>x{detail.so_luong}</p>
                      </div>
                    </div>
                    <div className={styles.orderDetailBodyGiaSoLuong}>
                      {/* <p style={{ fontSize: '16px' }}>₫{(detail.thanh_tien).toLocaleString()}</p> */}
                      {detail.phuong_thuc_thanh_toan?.id !== 3 ? (
                        <>
                          <p style={{ fontSize: "15px" }}>
                            ₫{(detail.gia * detail.so_luong).toLocaleString()}
                          </p>
                        </>
                      ) : (
                        <>
                          <p style={{ fontSize: "15px" }}>
                            {detail.gia * detail.so_luong}
                            <img src="/images/solana.png" alt="solana" />
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.orderDetailFooterM}>
                    <div className={styles.orderDetailFooterMMoney}>
                      {detail.phuong_thuc_thanh_toan?.id !== 3 ? (
                        <p style={{ fontSize: "16px" }}>
                          Thành tiền:{" "}
                          <span>₫{detail.thanh_tien.toLocaleString()}</span>
                        </p>
                      ) : (
                        <p style={{ fontSize: "16px" }}>
                          Thành tiền:{" "}
                          <span>{detail.thanh_tien.toLocaleString()}</span>
                          <img src="/images/solana.png" alt="solana" />
                        </p>
                      )}
                    </div>
                    <div className={styles.orderDetailFooter}>
                      {detail.trang_thai?.ma_trang_thai === 11 && (
                        <button
                          className={styles.cancelButton}
                          onClick={() =>
                            handleCancelOrderDetail(detail.ma_don_hang_chi_tiet)
                          }
                        >
                          Huỷ đơn hàng
                        </button>
                      )}
                      {detail.trang_thai?.ma_trang_thai === 12 && (
                        <button
                          className={styles.confirmOrderButton}
                          onClick={() =>
                            confirmReceivedOrderDetail(
                              detail.ma_don_hang_chi_tiet
                            )
                          }
                        >
                          Đã nhận hàng
                        </button>
                      )}
                      {detail.trang_thai?.ma_trang_thai === 13 && (
                        <>
                          <button
                            onClick={() =>
                              handleRateClick(
                                detail.ma_don_hang_chi_tiet,
                                detail.san_pham.ma_san_pham
                              )
                            }
                            className={styles.rateButton}
                          >
                            Đánh giá
                          </button>
                        </>
                      )}

                      {detail.trang_thai?.ma_trang_thai === 13 && (
                        <button
                          className={styles.returnmoneyButton}
                          onClick={() =>
                            confirmTraHang(detail.ma_don_hang_chi_tiet)
                          }
                        >
                          Yêu cầu trả hàng/Hoàn tiền
                        </button>
                      )}
                      {detail.trang_thai?.ma_trang_thai === 13 && (
                        <button
                          className={styles.returnmoneyButton}
                          onClick={() =>
                            handleReportClick(
                              detail.san_pham.ma_cua_hang,
                              detail.san_pham.ma_san_pham
                            )
                          }
                        >
                          Báo cáo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showCancelModal && (
              <div className={styles.cancelModal}>
                <div className={styles.modalContent}>
                  <h3>Lý do hủy đơn hàng</h3>
                  <div className={styles.reasonOptions}>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="Cập nhật địa chỉ"
                        onChange={(e) => setSelectedReason(e.target.value)}
                      />{" "}
                      Tôi muốn cập nhật địa chỉ / sdt nhận hàng
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="Thay đổi sản phẩm"
                        onChange={(e) => setSelectedReason(e.target.value)}
                      />{" "}
                      Tôi muốn thay đổi sản phẩm
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="Thanh toán rắc rối"
                        onChange={(e) => setSelectedReason(e.target.value)}
                      />{" "}
                      Thủ tục thanh toán rắc rối
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="Tìm chỗ khác"
                        onChange={(e) => setSelectedReason(e.target.value)}
                      />{" "}
                      Tôi tìm thấy chỗ mua khác tốt hơn
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="Không có nhu cầu"
                        onChange={(e) => setSelectedReason(e.target.value)}
                      />{" "}
                      Tôi không có nhu cầu mua nữa
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="Không lý do phù hợp"
                        onChange={(e) => setSelectedReason(e.target.value)}
                      />{" "}
                      Tôi không tìm thấy lý do hủy phù hợp
                    </label>
                  </div>
                  <div className={styles.modalActions}>
                    <button
                      className={styles.confirmCancel}
                      onClick={confirmCancelOrderDetail}
                    >
                      Xác nhận hủy
                    </button>
                    <button
                      className={styles.cancel_huy}
                      onClick={() => setShowCancelModal(false)}
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <DonHangChiTiet
            donHangChiTiet={orderDetail}
            onClose={handleClickBack}
            currentStep={trangThai}
          />
        </>
      )}

      {showForm && (
        <RatingForm
          onClose={handleCloseForm}
          userId={userId} // Truyền userId
          orderDetailId={idOrderDetail} // Truyền orderDetailId
          productId={idProduct} // Truyền productId
        />
      )}
      {showFormReport && (
        <ReportForm
          userId={userId}
          storeId={idCuaHang}
          productId={idProduct}
          onClose={handleCloseFormReport}
        />
      )}

      {/* form chat */}
      {formChat === true && (
        <ChatFormUser storeID={stroID} userID={1} onClose={handleChatClose} />
      )}

      <NotificationContainer />
    </div>
  );
};

export default DonHang;
