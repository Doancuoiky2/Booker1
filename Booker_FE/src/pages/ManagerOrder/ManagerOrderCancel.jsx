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
import { GoPeople } from "react-icons/go";
import { RiStore2Line } from "react-icons/ri";

const ManagerOrder = () => {
  //* Khách hàng hủy
  const maTrangThai = 14;
  // * Cửa hàng hủy
  const maTrangThai2 = 16;

  const [title, setTitle] = useState('Khách Hàng Hủy Đơn')
  const [statusHeader, setStatusHeader] = useState('Khách hàng hủy đơn')
  const [listOrder, setListOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // * Số lượng đơn hàng chi tiết
  const [orderDetailsCount, setOrderDetailsCount] = useState(0);
  const [orderDetailsCountStore, setOrderDetailsCountStore] = useState(0);
  // * doanh thu tạm tính đơn hủy của người mua
  const [totalRevenue, setTotalRevenue] = useState(0);
  // * Doanh thu tạm tính của cửa hàng hủy
  const [totalRevenueStore, setTotalRevenueStore] = useState(0);
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
      console.log("L��i khi tìm kiếm theo mã đơn hàng" + err);
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
    setTitle('Khách Hàng Hủy Đơn')
    setStatusHeader('Khách hàng hủy đơn')

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

  // * Hàm list order theo mã Cửa hàng hủy đơn
  const handleListOrderStore = () => {
    setSearchOrderID("");
    setSearchDateCreated("");
    setKeySearch(false);
    setIsLoading(true);
    setTitle('Cửa Hàng Hủy Đơn')
    setStatusHeader('Cửa hàng hủy đơn')

    const fetchOrderData = async () => {
      try {
        const listOrderData = await getOrderDetailsByTrangThai(maTrangThai2);
        setListOrder(listOrderData);
      } catch (err) {
        console.log("Lỗi khi load order mới" + err);
      }
      setIsLoading(false);
    };

    fetchOrderData();
  };

  useEffect(() => {
    setIsLoading(true);
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
        // * * * * * * * * * * * * * * * *
        const countOrderDetailsByStatusData2 = await countOrderDetailsByStatus(
          maTrangThai2
        );
        setOrderDetailsCountStore(countOrderDetailsByStatusData2);

        const revenueDataStore = await calculateNewOrderRevenue(maTrangThai2);
        setTotalRevenueStore(revenueDataStore);
      } catch (err) {
        console.log("Lỗi khi load order mới" + err);
      }
      setIsLoading(false);
    };

    fetchOrderData();
  }, []);

  return (
    <div className="page">
      <div className="pageHead">
        <h3>Quản lý đơn hàng</h3>
        <Breadcrumb paths={["Quản lý đơn hàng", "Đơn hàng hủy"]} />
      </div>
      <div className="containerProduct">
        {isLoading === true ? (
          <Loading />
        ) : (
          <>
            <div
              className="productbtn-list"
              //   style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="productbtn-list--form">
                <div className="productbtn-item productbtn-item--update">
                  <div className="productbtn-item_flex">
                    <button className=" btn1" onClick={handleResetSearch}>
                      <GoPeople  size={33} color="#fff" />
                    </button>
                    <div className="productbtn-itemInfo">
                      <h1>{orderDetailsCount}</h1>
                    </div>
                  </div>
                  <div className="productbtn-item_name">
                    <p>Khách hàng hủy đơn</p>
                  </div>
                </div>
                <div className="product-item--earning">
                  <p>Doanh thu ước tính</p>
                  <h1>
                    {totalRevenue ? totalRevenue.toLocaleString("vi-VN") : 0}
                    <span>₫</span>
                  </h1>
                </div>
              </div>

              <div className="productbtn-list--form2">
                <div className="product-item--earning">
                  <p>Doanh thu ước tính</p>
                  <h1>
                    {totalRevenueStore
                      ? totalRevenueStore.toLocaleString("vi-VN")
                      : 0}
                    <span>₫</span>
                  </h1>
                </div>
                <div className="productbtn-item productbtn-item--update flex-right">
                  <div className="productbtn-item_flex">
                    <button className=" btn1" onClick={handleListOrderStore}>
                      <RiStore2Line  size={33} color="#fff" />
                    </button>
                    <div className="productbtn-itemInfo">
                      <h1>{orderDetailsCountStore}</h1>
                    </div>
                  </div>
                  <div className="productbtn-item_name">
                    <p>Cửa hàng hủy đơn</p>
                  </div>
                </div>

                {/* <button
                  onClick={handleListOrderStore}
                  className="productbtn-item btn3"
                >
                  <p>Cửa hàng hủy đơn</p>
                  <h1>{orderDetailsCountStore}</h1>
                </button> */}
              </div>
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
              status="huydon"
              statusHeader={statusHeader}
              title={title}
              keyForm={"seller"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ManagerOrder;
