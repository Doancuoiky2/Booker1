import React, { useEffect, useState } from "react";

import "./Home.css";
import TickPlacementBars from "../../chart/TickPlacement";
import BoxThongKeBlack from "../Admin/Order/BoxThongKeBlack";
import BoxThongKeBlue from "../Admin/Order/BoxThongKeBlue";
import {
  countAllDonHang,
  countDistinctTaiKhoanDaMua,
  getAllDonHang,
} from "../../utils/API/OrderAPI";
import { getCustomerNumber } from "../../utils/API/CustomerAPI";
import {
  countDistinctCuaHangHoatDong,
  getAllProducts,
  tongDaBan,
} from "../../utils/API/ProductAPI";
import { getAllStoreAdmin } from "../../utils/API/StoreAPI";
import Breadcrumb from "../../utils/Order/Breadcrumb";
import SalesAreaChart from "../../chart/SalesAreaChart";
import {
  faArrowTrendUp,
  faBook,
  faChartLine,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRevenueAdmin } from "../../utils/API/AdminAPI";
import { MdOutlineShoppingCart } from "react-icons/md";

const HomeAdmin = () => {
  const [donHang, setDonHang] = useState(0);
  const [cuaHang, setCuaHang] = useState(0);
  const [sach, setSach] = useState(0);
  const [khachHang, setKhachHang] = useState(0);
  const [taiKhoanHoatDong, setTaiKhoanHoatDong] = useState(0);
  const [cuaHangHoatDong, setCuaHangHoatDong] = useState(0);
  const [tongDaBans, setTongDaBans] = useState(0);
  const [doanhthusan, setDoanhThuSan] = useState({});
  const [allDonHangCount, setAllDonHangCount] = useState({});

  const fetchData = async () => {
    try {
      const donHangs = await getAllDonHang();
      setDonHang(donHangs);

      const khachHangs = await getCustomerNumber();
      setKhachHang(khachHangs);

      const sachs = await getAllProducts();
      setSach(sachs);

      const cuaHangs = await getAllStoreAdmin();
      setCuaHang(cuaHangs.length);

      const taiKhoanHoatDongs = await countDistinctTaiKhoanDaMua();
      setTaiKhoanHoatDong(taiKhoanHoatDongs);

      const cuaHangHoatDongs = await countDistinctCuaHangHoatDong();
      setCuaHangHoatDong(cuaHangHoatDongs);

      const tongDaBanss = await tongDaBan();
      setTongDaBans(tongDaBanss);

      const doanhthusan = await getRevenueAdmin();
      setDoanhThuSan(doanhthusan);

      const countAllDonHangs = await countAllDonHang();
      setAllDonHangCount(countAllDonHangs);
      console.log(countAllDonHangs)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pageMyStore">
      <div className="pageHead">
        <h3>Trang Chủ</h3>
        <Breadcrumb paths={["Trang chủ"]} />
      </div>
      <div className="formHeadInfo">
        <div className="infoOfStore">
          <div className="infoOfStore-item1">
            <p>{khachHang}</p>
            <h3>Số lượng khách hàng</h3>
            <span>Tổng số tài khoản đã đăng ký trên hệ thống.</span>
            <SalesAreaChart status={true} />
            <div className="infoOfStore_footer">
              <div className="infoOfStore_footer-item">
                <span>{taiKhoanHoatDong}</span>
                <p>Tài khoản còn hoạt động</p>
              </div>
              <div className="infoOfStore_footer-item">
                <span>{khachHang - taiKhoanHoatDong}</span>
                <p>Tài khoản tạm ngưng hoạt động</p>
              </div>
            </div>
          </div>
          <div className="infoOfStore-item2">
            <p>{cuaHang}</p>
            <h3>Số lượng cửa hàng</h3>
            <span>Tổng số cửa hàng đã đăng ký trên hệ thống.</span>
            <SalesAreaChart status={false} />
            <div className="infoOfStore_footer2">
              <div className="infoOfStore_footer-item">
                <span>{cuaHangHoatDong}</span>
                <p>Cửa hàng còn hoạt động</p>
              </div>
              <div className="infoOfStore_footer-item">
                <span>{cuaHang - cuaHangHoatDong}</span>
                <p>Cửa hàng tạm ngưng hoạt động</p>
              </div>
            </div>
          </div>

          <div className="infoOfStore-item-small">
            <div className="infoOfStore-item-small_form">
              <div className="infoOfStore-item-small_form__head">
                <div>
                  <p className="numberInfo1">{sach}</p>
                  <span>Sản Phẩm</span>
                </div>
                <FontAwesomeIcon
                  icon={faBook}
                  className="infoOfStore-item-small_form__headIcon"
                />
              </div>
              <div className="infoOfStore-item-small_form__food foodColor1">
                <p>10% thay đổi</p>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>

            <div className="infoOfStore-item-small_form mt-20">
              <div className="infoOfStore-item-small_form__head">
                <div>
                  <p className="numberInfo2">{tongDaBans}</p>
                  <span>Số sách đã bán</span>
                </div>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="infoOfStore-item-small_form__headIcon"
                />
              </div>
              <div className="infoOfStore-item-small_form__food foodColor2">
                <p>10% thay đổi</p>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>
          </div>

          <div className="infoOfStore-item-small">
            <div className="infoOfStore-item-small_form">
              <div className="infoOfStore-item-small_form__head">
                <div>
                  <p className="numberInfo3">
                    {doanhthusan.doanh_thu_san
                      ? doanhthusan.doanh_thu_san.toLocaleString("vi-VN")
                      : 0}
                  </p>
                  <span>Doanh thu hệ thống</span>
                </div>
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="infoOfStore-item-small_form__headIcon"
                />
              </div>
              <div className="infoOfStore-item-small_form__food foodColor3">
                <p>10% thay đổi</p>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>

            <div className="infoOfStore-item-small_form mt-20">
              <div className="infoOfStore-item-small_form__head">
                <div>
                  <p className="numberInfo4">{JSON.stringify(allDonHangCount)}</p>
                  <span>Số đơn hàng</span>
                </div>
                <MdOutlineShoppingCart className="infoOfStore-item-small_form__headIcon" />
              </div>
              <div className="infoOfStore-item-small_form__food foodColor4">
                <p>10% thay đổi</p>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
