import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./Sidebar.css";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faStore } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faOutdent, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faHireAHelper } from "@fortawesome/free-brands-svg-icons";
import { getCuaHangById } from "../utils/API/StoreAPI";

const SidebarSeller = () => {
  const [openMenu, setOpenMenu] = useState("home"); // Trạng thái lưu mục cha đang được mở
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Hàm để mở hoặc đóng menu
  const handleMenuClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu); // Đóng mục đang mở hoặc mở mục mới
  };

  const [store, setStore] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const store = await getCuaHangById();
        setStore(store);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className="sidebarStyle">
      <div className="sidebarStyleImg">
        <img src={store.tai_khoan?.anh_dai_dien} alt="avt" />
        <div style={{ marginTop: "5px" }}>
          <h3 style={{ fontSize: "16px" }}>{store.tai_khoan?.ho_ten}</h3>
        </div>
      </div>
      <ul className="listStyle">
        <li>
          <Link
            className={
              openMenu === "home" ? "itemStyle-click itemStyle" : "itemStyle"
            }
            onClick={() => handleMenuClick("home")}
            to="/seller"
          >
            <FontAwesomeIcon className="mr-5" icon={faStore}></FontAwesomeIcon>
            Thông tin cửa hàng
          </Link>
        </li>

        <li>
          <Link
            className={
              openMenu === "manage_product_store"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("manage_product_store")}
            to="/seller/manage-product-store"
          >
            <FontAwesomeIcon className="mr-5" icon={faBook}></FontAwesomeIcon>
            Quản lý sản phẩm
          </Link>
        </li>
        {/* Quản lý đơn hàng */}
        <li>
          <div
            className={
              openMenu === "orders" ? "itemStyle-click itemStyle" : "itemStyle"
            }
            onClick={() => handleMenuClick("orders")}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon className="mr-5" icon={faFileInvoice} />
            Quản lý đơn hàng
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "orders" ? faAngleUp : faAngleDown}
            />
          </div>

          {openMenu === "orders" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/seller/orders-new"
                className={`submenu-item ${
                  activeSubmenu === "orders-new" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("orders-new")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Đơn hàng mới</p>
              </Link>
              <Link
                to="/seller/orders-cancel"
                className={`submenu-item ${
                  activeSubmenu === "orders-cancel" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("orders-cancel")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Đơn hàng hủy</p>
              </Link>
              <Link
                to="/seller/orders-is-being-delivered"
                className={`submenu-item ${
                  activeSubmenu === "orders-is-being-delivered"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("orders-is-being-delivered")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Đơn hàng đang giao</p>
              </Link>
              <Link
                to="/seller/orders-delivered"
                className={`submenu-item ${
                  activeSubmenu === "orders-delivered"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("orders-delivered")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Đơn hàng đã giao</p>
              </Link>
              <Link
                to="/seller/orders-return"
                className={`submenu-item mb-20 ${
                  activeSubmenu === "orders-return" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("orders-return")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Trả hàng - Hoàn tiền</p>
              </Link>
            </div>
          )}
        </li>

        <li>
          <Link
            className={
              openMenu === "manage-voucher-store"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("manage-voucher-store")}
            to="/seller/manage-voucher-store"
          >
            <FontAwesomeIcon className="mr-5" icon={faTicket}></FontAwesomeIcon>
            Quản lý Voucher
          </Link>
        </li>

        <li>
          {/* Menu cha */}
          <div
            style={{ marginBottom: "12px", cursor: "pointer" }}
            className={
              openMenu === "manage-comment"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("manage-comment")}
          >
            <FontAwesomeIcon className="mr-5" icon={faCommentDots} />
            Đánh giá sản phẩm
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "manage-comment" ? faAngleUp : faAngleDown}
            />
          </div>

          {/* Menu con */}
          {openMenu === "manage-comment" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/seller/manage-comment"
                className={`submenu-item ${
                  activeSubmenu === "manage-comment"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("manage-comment")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Xem đánh giá</p>
              </Link>

              <Link
                to="/seller/manage-comment-reported"
                className={`submenu-item mb-20 ${
                  activeSubmenu === "manage-comment-reported"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("manage-comment-reported")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p> Đánh giá đã báo cáo</p>
              </Link>
            </div>
          )}
        </li>

        {/* <li>
          
          <div
            style={{ marginBottom: "12px", cursor: "pointer" }}
            className={
              openMenu === "statistical"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("statistical")}
          >
            <FontAwesomeIcon className="mr-5" icon={faChartSimple} />
            Thống kê cửa hàng
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "statistical" ? faAngleUp : faAngleDown}
            />
          </div>

          
          {openMenu === "statistical" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/seller/best-selling-products"
                className={`submenu-item ${
                  activeSubmenu === "best-selling-products"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("best-selling-products")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Sản phẩm bán chạy</p>
              </Link>

              <Link
                to="/seller/order-statistics"
                className={`submenu-item ${
                  activeSubmenu === "order-statistics"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("order-statistics")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Thống kê đơn hàng</p>
              </Link>

              <Link
                to="/seller/revenue-statistics"
                className={`submenu-item mb-20 ${
                  activeSubmenu === "revenue-statistics"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("revenue-statistics")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Thống kê doanh thu</p>
              </Link>
            </div>
          )}
        </li> */}

        <li>
          <Link
            className={
              openMenu === "transaction-history"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("transaction-history")}
            to="/seller/transaction-history"
          >
            <FontAwesomeIcon
              className="mr-5"
              icon={faClockRotateLeft}
            ></FontAwesomeIcon>
            Rút tiền
          </Link>
        </li>

        <li>
          <Link
            className={
              openMenu === "help" ? "itemStyle-click itemStyle" : "itemStyle"
            }
            onClick={() => handleMenuClick("help")}
            to="/seller/help"
          >
            <FontAwesomeIcon
              className="mr-5"
              icon={faHireAHelper}
            ></FontAwesomeIcon>
            Hỗ trợ khách hàng
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarSeller;
