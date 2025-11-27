import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "../ManageProduct/ManageProduct.css";
import "./ManagerOrder.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../utils/Order/Loading";

import ListOrder from "../../utils/ManageListUI/ListOrder";

import {
  getOrderDetailsByTrangThai,
  calculateNewOrderRevenue,
  countOrderDetailsByStatus,
  searchOrderDetailsByDateCreated,
  searchOrderDetailsByOrderID,
} from "../../utils/API/OrderDetailsAPI";
import Breadcrumb from "../../utils/Order/Breadcrumb";
import { LuChartNoAxesCombined, LuPackageCheck } from "react-icons/lu";

const ManagerOrder = () => {
  const maTrangThai = 11;

  const [listOrder, setListOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // * Số lượng đơn hàng chi tiết
  const [orderDetailsCount, setOrderDetailsCount] = useState(0);
  // * doanh thu tạm tính
  const [totalRevenue, setTotalRevenue] = useState(0);
  // * lưu thông tin tìm kiếm theo mã
  const [searchOrderID, setSearchOrderID] = useState("");
  // * lưu thông tin tìm kiếm theo ngày tạo
  const [searchDateCreated, setSearchDateCreated] = useState("");
  const [keySearch, setKeySearch] = useState(false);

  const handleChangeInputOrderID = (e) => {
    // const maHoaDonChiTiet = e.target.value.replace(/[^0-9]/g, '');
    setSearchOrderID(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeInputCreateDate = (e) => {
    setSearchDateCreated(e.target.value);
  };

  // * Tìm kiếm theo ID
  const handleSearchOrderID = async () => {
    setKeySearch(true);
    try {
      const listOrderData = await searchOrderDetailsByOrderID(
        maTrangThai,
        searchOrderID
      );
      setListOrder(listOrderData);
    } catch (err) {
      console.log("Lỗii khi tìm kiếm theo mã đơn hàng" + err);
    }
  };

  // * Tìm kiếm theo ngày tạo
  const handleSearchByDateCreated = async () => {
    setKeySearch(true);
    try {
      const listOrderData = await searchOrderDetailsByDateCreated(
        maTrangThai,
        searchDateCreated
      );
      setListOrder(listOrderData);
    } catch (err) {
      console.log("L��i khi tìm kiếm theo ngày tạo đơn hàng" + err);
    }
  };

  // * Tìm kiếm tất cả
  const handleResetSearch = () => {
    setSearchOrderID("");
    setSearchDateCreated("");
    setKeySearch(false);

    const fetchOrderData = async () => {
      try {
        const listOrderData = await getOrderDetailsByTrangThai(maTrangThai);
        setListOrder(listOrderData);
      } catch (err) {
        console.log("Lỗi khi load order mới" + err);
      }
    };
    fetchOrderData();
  };

  const fetchOrderData = async () => {
    try {
      const listOrderData = await getOrderDetailsByTrangThai(maTrangThai);
      setListOrder(listOrderData);

      const revenueData = await calculateNewOrderRevenue(maTrangThai);
      setTotalRevenue(revenueData);

      const countOrderDetailsByStatusData = await countOrderDetailsByStatus(
        maTrangThai
      );
      setOrderDetailsCount(countOrderDetailsByStatusData);
    } catch (err) {
      console.log("Lỗi khi load order mới" + err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);

    fetchOrderData();
  }, []);

  return (
    <div className="page">
      <div className="pageHead">
        <h3>Quản lý đơn hàng</h3>
        <Breadcrumb paths={["Quản lý đơn hàng", "Đơn hàng mới"]} />
      </div>
      <div className="containerProduct">
        {isLoading === true ? (
          <Loading />
        ) : (
          <>
            <div className="productbtn-list">
              <div className="productbtn-item productbtn-item_updateInfo">
                <div className="productbtn-item_flex">
                  <button className=" btn1" onClick={handleResetSearch}>
                    <LuPackageCheck size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{orderDetailsCount}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Đơn hàng mới</p>
                </div>
              </div>

              <div className="productbtn-item productbtn-item_updateInfo">
                <div className="productbtn-item_flex">
                  <button className=" btn7" onClick={handleResetSearch}>
                    <LuChartNoAxesCombined size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>
                      {totalRevenue ? totalRevenue.toLocaleString("vi-VN") : 0}
                      <span>₫</span>
                    </h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Doanh thu ước tính</p>
                </div>
              </div>

              {/* <button className="productbtn-item btn7 no-hover productbtn-item_update">
                <p>Doanh thu ước tính</p>
                <h1>
                  {totalRevenue ? totalRevenue.toLocaleString("vi-VN") : 0}
                  <span> VNĐ</span>
                </h1>
              </button> */}
            </div>
            {/* 3 thanh tìm kiếm */}
            <div className="product-search_listSearch">
              <div className="product-search_item">
                <label>Mã đơn hàng</label>
                <div className="product-search_item__flex">
                  <input
                    type="text"
                    className="form-control"
                    value={searchOrderID}
                    onChange={handleChangeInputOrderID}
                  />
                  <button
                    onClick={handleSearchOrderID}
                    className="product-search_item__btn"
                  >
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                  </button>
                </div>
              </div>
              <div className="product-search_item">
                <label>Ngày đặt hàng</label>
                <div className="product-search_item__flex">
                  <input
                    type="date"
                    className="form-control"
                    value={searchDateCreated}
                    onChange={handleChangeInputCreateDate}
                  />
                  <button
                    onClick={handleSearchByDateCreated}
                    className="product-search_item__btn"
                  >
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                  </button>
                </div>
              </div>
              {/* <div className="product-search_item">
                                        <label>Tên sách</label>
                                        <div
                                            style={{ width: "350px" }}
                                            className="product-search_item__flex"
                                        >
                                            <input
                                                type="text"
                                                className="form-control"
                                            />
                                            <button className="product-search_item__btn">
                                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                            </button>
                                        </div>
                                    </div> */}
            </div>

            <ListOrder
              listOrders={listOrder}
              keySearch={keySearch}
              status="xacnhan"
              statusHeader={"Xác nhận đơn hàng"}
              keyForm={"seller"}
              onReload = {fetchOrderData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ManagerOrder;
