import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./Sidebar.css";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faComments,
  faMoneyBillTransfer,
  faRectangleAd,
  faSackDollar,
  faStore,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faBtc } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faHouse,
  faList,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

const SidebarAdmin = () => {
  const [openMenu, setOpenMenu] = useState("home"); // Trạng thái lưu mục cha đang được mở

  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Hàm để mở hoặc đóng menu
  const handleMenuClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu); // Đóng mục đang mở hoặc mở mục mới
  };

  return (
    <nav className="sidebarStyle">
      <ul className="listStyle">
        <li>
          <Link
            className={
              openMenu === "home" ? "itemStyle-click itemStyle" : "itemStyle"
            }
            onClick={() => handleMenuClick("home")}
            to="/admin"
          >
            <FontAwesomeIcon className="mr-5" icon={faHouse}></FontAwesomeIcon>
            Trang chủ
          </Link>
        </li>
        {/* <li>
                    <Link className={openMenu === "info" ? 'itemStyle-click itemStyle' : 'itemStyle'} onClick={() => handleMenuClick("info")} to="/admin/information-store">
                        <FontAwesomeIcon className='mr-5' icon={faShopify}></FontAwesomeIcon>
                        Thông tin cửa hàng</Link>
                </li> */}
        <li>
          <Link
            className={
              openMenu === "manage-category"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("manage-category")}
            to="/admin/manage-category"
          >
            <FontAwesomeIcon className="mr-5" icon={faList}></FontAwesomeIcon>
            Thể loại sách
          </Link>
        </li>
        {/* <li>
                    <Link className={openMenu === "manage-banner" ? 'itemStyle-click itemStyle' : 'itemStyle'} onClick={() => handleMenuClick("manage-banner")} to="/admin/manage-banner">
                        <FontAwesomeIcon className='mr-5' icon={faRectangleAd}></FontAwesomeIcon>
                        Quản lý banner</Link>
                </li> */}
        <li>
          <div
            className={
              openMenu === "manager-book"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("manager-book")}
          >
            <FontAwesomeIcon className="mr-5" icon={faBook}></FontAwesomeIcon>
            Quản lý sách
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "manager-book" ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
          </div>
          {openMenu === "manager-book" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/admin/new-book"
                className={`submenu-item ${
                  activeSubmenu === "book-new" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("book-new")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Sách mới</p>
              </Link>
              <Link
                to="/admin/huy-yeu-cau-duyet"
                className={`submenu-item ${
                  activeSubmenu === "book-cancel" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("book-cancel")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Sách bị hủy duyệt</p>
              </Link>
              <Link
                to="/admin/book-infringed"
                className={`submenu-item ${
                  activeSubmenu === "book-vipham" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("book-vipham")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Sách bị vi phạm</p>
              </Link>
              <Link
                to="/admin/book-disabled"
                className={`submenu-item ${
                  activeSubmenu === "book-vohieuhoa"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("book-vohieuhoa")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Sách bị vô hiệu hóa</p>
              </Link>
              <Link
                to="/admin/unlock-book"
                className={`submenu-item ${
                  activeSubmenu === "book-open" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("book-open")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Mở khóa sách</p>
              </Link>
              <Link
                to="/admin/books-for-sale"
                className={`submenu-item ${
                  activeSubmenu === "book-buy" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("book-buy")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Sách đang bán</p>
              </Link>
              {/* <Link to="/admin/orders-return" className='submenu-item'>
                                        Trả hàng - Hoàn tiền
                                    </Link> */}
            </div>
          )}
        </li>

        {/* <li>
                    <Link className={openMenu === "manage-voucher-store" ? 'itemStyle-click itemStyle' : 'itemStyle'} onClick={() => handleMenuClick("manage-voucher-store")} to="/admin/manage-voucher-store">
                        <FontAwesomeIcon className='mr-5' icon={faTicket}></FontAwesomeIcon>
                        Khách hàng</Link>
                </li> */}
        <li>
          <div
            className={
              openMenu === "manager-user"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("manager-user")}
          >
            <FontAwesomeIcon className="mr-5" icon={faUsers}></FontAwesomeIcon>
            Quản lý khách hàng
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "manager-user" ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
          </div>
          {openMenu === "manager-user" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/admin/my-customers"
                className={`submenu-item ${
                  activeSubmenu === "my-customers" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("my-customers")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Khách hàng</p>
              </Link>
              <Link
                to="/admin/account-disabled"
                className={`submenu-item ${
                  activeSubmenu === "account-disabled"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("account-disabled")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Yêu cầu mở khóa</p>
              </Link>
            </div>
          )}
        </li>

        <li>
          <div
            className={
              openMenu === "manager-store"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("manager-store")}
          >
            <FontAwesomeIcon className="mr-5" icon={faStore}></FontAwesomeIcon>
            Quản lý cửa hàng
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "manager-store" ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
          </div>
          {openMenu === "manager-store" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/admin/new-store"
                className={`submenu-item ${
                  activeSubmenu === "new-store" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("new-store")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Cửa hàng mới</p>
              </Link>
              <Link
                to="/admin/violation-store"
                className={`submenu-item ${
                  activeSubmenu === "violation-store"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("violation-store")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Cửa hàng vi phạm</p>
              </Link>
              <Link
                to="/admin/disable-store"
                className={`submenu-item ${
                  activeSubmenu === "disable-store" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("disable-store")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Cửa hàng vô hiệu hóa</p>
              </Link>
              <Link
                to="/admin/unclok-store"
                className={`submenu-item ${
                  activeSubmenu === "unclok-store" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("unclok-store")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Mở khóa cửa hàng</p>
              </Link>
              <Link
                to="/admin/store-is-operating"
                className={`submenu-item ${
                  activeSubmenu === "store-is-operating"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("store-is-operating")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Đang hoạt động</p>
              </Link>
            </div>
          )}
        </li>

        <li>
          <div
            className={
              openMenu === "orders" ? "itemStyle-click itemStyle" : "itemStyle"
            }
            onClick={() => handleMenuClick("orders")}
          >
            <FontAwesomeIcon
              className="mr-5"
              icon={faFileInvoice}
            ></FontAwesomeIcon>
            Đơn hàng
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "orders" ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
          </div>
          {openMenu === "orders" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/admin/orders-new"
                className={`submenu-item ${
                  activeSubmenu === "orders-new" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("orders-new")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Đơn hàng mới</p>
              </Link>
              <Link
                to="/admin/orders-cancel"
                className={`submenu-item ${
                  activeSubmenu === "orders-cancel" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("orders-cancel")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Đơn hàng hủy</p>
              </Link>
              <Link
                to="/admin/orders-is-being-delivered"
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
                to="/admin/orders-delivered"
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
                to="/admin/orders-return"
                className={`submenu-item ${
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

        

        {/* <li>
                    <Link className={openMenu === "voucher" ? 'itemStyle-click itemStyle' : 'itemStyle'} onClick={() => handleMenuClick("voucher")} to="/admin/manager-voucher">
                        <FontAwesomeIcon className='mr-5' icon={faTicket}></FontAwesomeIcon>
                        Voucher</Link>
                </li> */}

        {/* <li>
                    <Link style={{marginBottom: '12px'}} className={openMenu === "comments" ? 'itemStyle-click itemStyle' : 'itemStyle'} onClick={() => handleMenuClick("comments")}>
                        <FontAwesomeIcon className='mr-5' icon={faComments}></FontAwesomeIcon>
                        Bình luận sản phẩm
                        <FontAwesomeIcon className='faAngleDown' icon={openMenu === "comments" ? faAngleUp : faAngleDown}></FontAwesomeIcon>

                        <div className='bg_white'>
                            {openMenu === "comments" && (
                                <div className={openMenu === "comments" ? "submenu submenu-open" : "submenu"}>
                                    <Link to="/admin/all-comments" className='submenu-item'>
                                        Tất cả
                                    </Link>
                                    <Link to="/admin/comment-report" className='submenu-item '>
                                        Bình luận vi phạm
                                    </Link>
                                    <Link to="/admin/comment-disabled" className='submenu-item'>
                                        Bình luận đã khóa
                                    </Link>
                                </div>
                            )}
                        </div>

                    </Link>
                </li> */}

        <li>
          <div
            className={
              openMenu === "reportall"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("reportall")}
          >
            <FontAwesomeIcon
              className="mr-5"
              icon={faTriangleExclamation}
            ></FontAwesomeIcon>
            Báo cáo vi phạm
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "reportall" ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
          </div>

          {openMenu === "reportall" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/admin/report-store"
                className={`submenu-item ${
                  activeSubmenu === "report-store" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("report-store")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Báo cáo cửa hàng</p>
              </Link>
              <Link
                to="/admin/report-comment"
                className={`submenu-item ${
                  activeSubmenu === "report-comment"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("report-comment")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Báo cáo đánh giá</p>
              </Link>
              <Link
                to="/admin/infringing-product"
                className={`submenu-item ${
                  activeSubmenu === "infringing-product"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("infringing-product")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Sản phẩm vi phạm</p>
              </Link>
              <Link
                to="/admin/infringing-user"
                className={`submenu-item ${
                  activeSubmenu === "infringing-user"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("infringing-user")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p> Người dùng vi phạm</p>
              </Link>
              <Link
                to="/admin/infringing-store"
                className={`submenu-item ${
                  activeSubmenu === "infringing-store"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("infringing-store")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Cửa hàng vi phạm</p>
              </Link>
            </div>
          )}
        </li>

        <li>
          <div
            className={
              openMenu === "ruttien" ? "itemStyle-click itemStyle" : "itemStyle"
            }
            onClick={() => handleMenuClick("ruttien")}
          >
            <FontAwesomeIcon
              className="mr-5"
              icon={faSackDollar}
            ></FontAwesomeIcon>
            Yêu cầu rút tiền
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "ruttien" ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
          </div>
          {openMenu === "ruttien" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/admin/ruttien-new"
                className={`submenu-item ${
                  activeSubmenu === "ruttien-new" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("ruttien-new")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Yêu cầu rút tiền mới</p>
              </Link>
              <Link
                to="/admin/ruttien-success"
                className={`submenu-item ${
                  activeSubmenu === "ruttien-success"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("ruttien-success")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Rút tiền thành công</p>
              </Link>
              <Link
                to="/admin/ruttien-fail"
                className={`submenu-item ${
                  activeSubmenu === "ruttien-fail" ? "submenu-item-active" : ""
                }`}
                onClick={() => setActiveSubmenu("ruttien-fail")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Yêu cầu đã hủy</p>
              </Link>
            </div>
          )}
        </li>

        <li>
          <div
            className={
              openMenu === "p2p" ? "itemStyle-click itemStyle" : "itemStyle"
            }
            onClick={() => handleMenuClick("p2p")}
          >
            <FontAwesomeIcon
              className="mr-5"
              icon={faMoneyBillTransfer}
            ></FontAwesomeIcon>
            Lịch sử nạp - rút
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "p2p" ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
          </div>
          {openMenu === "p2p" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/admin/p2p-transaction-nap"
                className={`submenu-item ${
                  activeSubmenu === "p2p-transaction-nap"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("p2p-transaction-nap")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Nạp tiền</p>
              </Link>
              <Link
                to="/admin/p2p-transaction-rut"
                className={`submenu-item ${
                  activeSubmenu === "p2p-transaction-rut"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("p2p-transaction-rut")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Rút tiền</p>
              </Link>
            </div>
          )}
        </li>

        {/* <li>
                    <Link className={openMenu === "btc" ? 'itemStyle-click itemStyle' : 'itemStyle'} onClick={() => handleMenuClick("btc")} to="/admin">
                        <FontAwesomeIcon className='mr-5' icon={faBtc}></FontAwesomeIcon>
                        Doanh thu tiền mã hóa</Link>
                </li> */}

        <li>
          <div
            className={
              openMenu === "statistical"
                ? "itemStyle-click itemStyle"
                : "itemStyle"
            }
            onClick={() => handleMenuClick("statistical")}
          >
            <FontAwesomeIcon
              className="mr-5"
              icon={faChartSimple}
            ></FontAwesomeIcon>
            Doanh thu
            <FontAwesomeIcon
              className="faAngleDown"
              icon={openMenu === "statistical" ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
          </div>
          {openMenu === "statistical" && (
            <div className="submenu submenu-open bg_white">
              <Link
                to="/admin/statistical-store"
                className={`submenu-item ${
                  activeSubmenu === "statistical-store"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("statistical-store")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Doanh thu cửa hàng</p>
              </Link>
              <Link
                to="/admin/statistical-my-money"
                className={`submenu-item ${
                  activeSubmenu === "statistical-my-money"
                    ? "submenu-item-active"
                    : ""
                }`}
                onClick={() => setActiveSubmenu("statistical-my-money")}
              >
                <FontAwesomeIcon icon={faAngleRight} className="submenuIcon" />
                <p>Doanh thu hệ thống</p>
              </Link>
            </div>
          )}
        </li>

        {/* <li>
                    <Link className={openMenu === "bankrupt" ? 'itemStyle-click itemStyle' : 'itemStyle'} onClick={() => handleMenuClick("bankrupt")} to="/admin/bankrupt">
                        <FontAwesomeIcon className='mr-5' icon={faOutdent}></FontAwesomeIcon>
                        Đóng cửa hàng</Link>
                </li> */}
      </ul>
    </nav>
  );
};

export default SidebarAdmin;
