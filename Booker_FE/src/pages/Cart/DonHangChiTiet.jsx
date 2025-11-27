import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styles from "./DonHangChiTiet.module.css";
import { faBell, faChevronLeft, faX } from "@fortawesome/free-solid-svg-icons";

import {
  FaListAlt,
  FaMoneyBillWave,
  FaTruck,
  FaBoxOpen,
  FaStar,
  FaTimes,
  FaSyncAlt,
} from "react-icons/fa";
import OrderTimeline from "./OrderTimeline";
import { useNavigate } from "react-router-dom";
import ChatFormUser from "../../chat/ChatFormUser";

const steps = [
  { label: "Đơn Hàng Đã Đặt", icon: <FaListAlt /> },
  { label: "Đã Xác Nhận", icon: <FaMoneyBillWave /> },
  { label: "Đã Giao Cho ĐVVC", icon: <FaTruck /> },
  { label: "Đã Nhận Được Hàng", icon: <FaBoxOpen /> },
  { label: "Hoàn Thành", icon: <FaStar /> },
];

const stepsSync = [
  { label: "Đơn Hàng Đã Đặt", icon: <FaListAlt /> },
  { label: "Đã Xác Nhận", icon: <FaMoneyBillWave /> },
  { label: "Đã Nhận Được Hàng", icon: <FaBoxOpen /> },
  { label: "Trả Hàng/Hoàn Tiền", icon: <FaSyncAlt /> },
  { label: "Chờ xác nhận", icon: <FaStar /> },
];

const DonHangChiTiet = ({ donHangChiTiet, onClose, currentStep }) => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [formChat, setFormChat] = useState(false);
  const [stroID, setStoreID] = useState(null);

  const handleChatOpen = () => {
    setFormChat(true);
  };
  const handleChatClose = () => {
    setFormChat(false);
  };

  const stepsCancel = [
    { label: "Đơn Hàng Đã Đặt", icon: <FaListAlt /> },
    {
      label: currentStep === 6 ? "Đã Hủy Đơn Hàng" : "Cửa Hàng Hủy Đơn",
      icon: <FaTimes />,
    },
    { label: "Đã Giao Cho ĐVVC", icon: <FaTruck /> },
    { label: "Đã Nhận Được Hàng", icon: <FaBoxOpen /> },
    { label: "Hoàn Thành", icon: <FaStar /> },
  ];

  const stepsSyncSelected = [
    { label: "Đơn Hàng Đã Đặt", icon: <FaListAlt /> },
    { label: "Đã Xác Nhận", icon: <FaMoneyBillWave /> },
    { label: "Đã Nhận Được Hàng", icon: <FaBoxOpen /> },
    { label: "Trả Hàng/Hoàn Tiền", icon: <FaSyncAlt /> },
    {
      label: currentStep === 9 ? "Xác Nhận Yêu Cầu" : "Bị Hủy Yêu Cầu",
      icon: <FaStar />,
    },
  ];

  const percent = ((currentStep - 1) / (steps.length - 1)) * 85;
  const percentCancel = ((2 - 1) / (steps.length - 1)) * 85;
  const percentSync = ((4 - 1) / (steps.length - 1)) * 85;
  const percentSyncSelected = ((5 - 1) / (steps.length - 1)) * 85;

  const components = (currentStep) => {
    if (currentStep >= 1 && currentStep <= 5) {
      return (
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          <div
            className={styles.timelineLineActive}
            style={{ width: `${percent}%` }}
          ></div>
          {steps.map((step, index) => (
            <div key={index} className={styles.timelineStep}>
              <div
                className={`${styles.circle} ${
                  index < currentStep ? styles.active : ""
                }`}
              >
                {step.icon}
              </div>
              <p>{step.label}</p>
            </div>
          ))}
        </div>
      );
    }

    if (currentStep === 6 || currentStep === 7) {
      return (
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          <div
            className={styles.timelineLineActive}
            style={{ width: `${percentCancel}%` }}
          ></div>
          {stepsCancel.map((step, index) => (
            <div key={index} className={styles.timelineStep}>
              <div
                className={`${styles.circle} ${index < 2 ? styles.active : ""}`}
              >
                {step.icon}
              </div>
              <p>{step.label}</p>
            </div>
          ))}
        </div>
      );
    }

    if (currentStep === 8) {
      return (
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          <div
            className={styles.timelineLineActive}
            style={{ width: `${percentSync}%` }}
          ></div>
          {stepsSync.map((step, index) => (
            <div key={index} className={styles.timelineStep}>
              <div
                className={`${styles.circle} ${index < 4 ? styles.active : ""}`}
              >
                {step.icon}
              </div>
              <p>{step.label}</p>
            </div>
          ))}
        </div>
      );
    }

    if (currentStep === 9 || currentStep === 10) {
      return (
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          <div
            className={styles.timelineLineActive}
            style={{ width: `${percentSyncSelected}%` }}
          ></div>
          {stepsSyncSelected.map((step, index) => (
            <div key={index} className={styles.timelineStep}>
              <div
                className={`${styles.circle} ${index < 5 ? styles.active : ""}`}
              >
                {step.icon}
              </div>
              <p>{step.label}</p>
            </div>
          ))}
        </div>
      );
    }

    return <h2>Trạng thái đơn hàng hiện chưa được cập nhật</h2>;
  };

  // Hàm Mua lại
  const handleMuaLai = () => {
    sessionStorage.setItem(
      "checkoutItem",
      JSON.stringify({ ...product, so_luong: 1 })
    );
    navigate("/checkout");
  };

  useEffect(() => {
    setProduct(donHangChiTiet.san_pham);
    setStoreID(donHangChiTiet?.san_pham?.cua_hang?.ma_cua_hang);
  }, [donHangChiTiet, onClose, currentStep]);

  return (
    <div className={styles.donHangChiTietMain}>
      <div className={styles.donHangChiTietHeader}>
        <div className={styles.donHangChiTietHeaderBack} onClick={onClose}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={styles.donHangChiTietHeaderBackIcon}
          />
          <h3>TRỞ LẠI</h3>
        </div>
        <div className={styles.donHangChiTietHeaderInfo}>
          <h3>MÃ ĐƠN HÀNG: {donHangChiTiet?.don_hang.ma_hien_thi} </h3> |{" "}
          <h3>
            {" "}
            {donHangChiTiet?.trang_thai?.ma_trang_thai === 14
              ? "Đã Hủy Đơn hàng"
              : donHangChiTiet?.trang_thai?.ten_trang_thai}
          </h3>
        </div>
      </div>

      {/* trạng thái */}
      {/* <div className={styles.timelineContainer}>
        <div className={styles.timelineLine}></div>
        <div
          className={styles.timelineLineActive}
          style={{ width: `${percent}%` }}
        ></div> */}

      {/* {steps.map((step, index) => (
          <div key={index} className={styles.timelineStep}>
            <div
              className={`${styles.circle} ${
                index < currentStep ? styles.active : ""
              }`}
            >
              {step.icon}
            </div>
            <p>{step.label}</p>
          </div>
        ))} */}

      {components(currentStep)}
      {/* </div> */}

      <div className={styles.donHangChiTietButton}>
        <div className={styles.donHangChiTietButtonItem}>
          <p>Cảm ơn bạn đã mua sắm tại Booker!</p>
          <button onClick={handleMuaLai}>Mua Lại</button>
        </div>
        <div className={styles.donHangChiTietButtonItem}>
          <div></div>
          <button onClick={handleChatOpen}>Liên hệ người bán</button>
        </div>
      </div>

      <div className={styles.lineBeauti}></div>

      <div className={styles.donHangChiTiet_diaChi}>
        <div className={styles.donHangChiTiet_diaChiUser}>
          <h2>Địa Chỉ Nhận Hàng</h2>
          <p className={styles.donHangChiTiet_diaChiUserName}>
            {donHangChiTiet?.don_hang?.tai_khoan?.ho_ten}
          </p>
          <p className={styles.donHangChiTiet_diaChiUserP}>
            {donHangChiTiet?.don_hang?.tai_khoan?.so_dt}
          </p>
          <p className={styles.donHangChiTiet_diaChiUserP}>
            {donHangChiTiet?.don_hang?.dia_chi?.ten_dia_chi}
          </p>
        </div>
        <div className={styles.donHangChiTiet_diaChiVanChuyen}>
          <OrderTimeline idDhct={donHangChiTiet.ma_don_hang_chi_tiet}/>
        </div>
      </div>

      <div className={styles.donHangChiTiet_sanPham}>
        <h3 className={styles.donHangChiTiet_sanPhamShop}>
          {donHangChiTiet.san_pham?.cua_hang?.ten_cua_hang}
        </h3>
        <div className={styles.donHangChiTiet_sanPhamInfo}>
          <div className={styles.donHangChiTiet_sanPhamInfoImg}>
            <img
              src={donHangChiTiet.san_pham?.anh_san_pham}
              alt={donHangChiTiet.san_pham?.ten_san_pham}
            />
          </div>
          <div className={styles.donHangChiTiet_sanPhamInfoName}>
            <h3>{donHangChiTiet.san_pham?.ten_san_pham}</h3>
            <p className={styles.donHangChiTiet_sanPhamInfoNameTheloai}>
              Thể loại: {donHangChiTiet.san_pham?.the_loai?.ten_the_loai}
            </p>
            <p>
              <FontAwesomeIcon
                icon={faX}
                className={styles.donHangChiTiet_sanPhamInfoNameIcon}
              />{" "}
              {donHangChiTiet?.so_luong}
            </p>
          </div>
          <div className={styles.donHangChiTiet_sanPhamInfoMoney}>
            <p>{donHangChiTiet?.san_pham.gia?.toLocaleString("vi-VN")}₫</p>
          </div>
        </div>
      </div>

      <div className={styles.order_summary}>
        <div className={styles.order_summaryCol}>
          <p>Tổng tiền hàng</p>
          <span>
            {(
              donHangChiTiet?.so_luong * donHangChiTiet?.san_pham.gia
            ).toLocaleString("vi-VN")}
            ₫
          </span>
        </div>
        <div className={styles.order_summaryCol}>
          <p>Phí vận chuyển</p>
          <span>{donHangChiTiet?.phi_van_chuyen.toLocaleString("vi-VN")}₫</span>
        </div>
        <div className={styles.order_summaryCol}>
          <p>Voucher giảm giá</p>
          {donHangChiTiet?.voucher?.giam_gia > 0 ? (
            <span>
              - {donHangChiTiet?.voucher?.giam_gia.toLocaleString("vi-VN")}₫
            </span>
          ) : (
            <span>- 0₫</span>
          )}
        </div>
        <div className={styles.order_summaryCol}>
          <p>Thành tiền</p>
          <span className={styles.order_summarySum}>
            {donHangChiTiet?.thanh_tien.toLocaleString("vi-VN")}₫
          </span>
        </div>
        <div className={styles.order_summaryThongBao}>
          <FontAwesomeIcon
            icon={faBell}
            className={styles.order_summaryThongBaoIcon}
          />
          <p>
            Vui lòng thanh toán
            <span>
              {donHangChiTiet?.thanh_tien.toLocaleString("vi-VN")}₫
            </span>{" "}
            khi nhận hàng.
          </p>
        </div>
        <div className={styles.order_summaryCol2}>
          <p>Phương thức thanh toán</p>
          <span>{donHangChiTiet?.phuong_thuc_tt?.ten_phuong_thuc}</span>
        </div>
      </div>
      {formChat === true && (
        <ChatFormUser storeID={stroID} userID={1} onClose={handleChatClose} />
      )}
    </div>
  );
};

export default DonHangChiTiet;
