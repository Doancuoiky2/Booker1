import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "../ManagerVoucher/ManagerVoucher.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ListVoucher from "../../utils/ManageListUI/ListVoucher";
import VoucherForm from "../../utils/FormVisible/VoucherForm";
import Loading from "../../utils/Order/Loading";

import { getCuaHangById } from "../../utils/API/StoreAPI";
import {
  getVouchersByCuaHangId,
  searchVouchersByStatus,
  getCountVoucherByStore,
  getCountVoucherByStatus,
  searchVouchersByName,
  searchVouchersByPrice,
} from "../../utils/API/VoucherAPI";
import Breadcrumb from "../../utils/Order/Breadcrumb";
import { LuPackageCheck } from "react-icons/lu";

const ManagerVoucher = () => {
  const [isLoading, setIsLoading] = useState(true);

  // *Hàm lấy ra tất cả vouchers
  const [vouchers, setVouchers] = useState([]);
  // *Lấy thông tin cửa hàng
  const [shop, setShop] = useState({});
  // * Số lượng voucher theo shop
  const [vouchersCount, setVouchersCount] = useState([]);
  // *Đếm số lượng voucher theo trạng thái
  const [chuaApDung, setChuaApDung] = useState(0);
  const [conHan, setConHan] = useState(0);
  const [hetHan, setHetHan] = useState(0);

  const [isAddVoucherForm, setIsAddVoucherForm] = useState(false);

  // *Hiện, ẩn form tạo voucher mới
  const handleShowAddVoucherForm = () => {
    setIsAddVoucherForm(!isAddVoucherForm);
  };
  const handleCloseAddVoucherForm = () => {
    setIsAddVoucherForm(false);
  };

  // * Hàm tìm kiếm tất cả sản phẩm của cửa hàng
  const handleSeachVouchersAll = () => {
    getVouchersByCuaHangId()
      .then((data) => {
        setVouchers(data);
        if (data.length <= 0) {
          setSearchKey("searchIsNull");
        }
      })
      .catch((error) => {
        setSearchKey("searchIsNull");
        console.error("Error fetching count vouchers:", error);
        throw error;
      });
  };

  // * Hàm tìm kiếm sản phẩm theo trạng thái
  const [searchKey, setSearchKey] = useState("");
  const handleSearchVoucherByStatus = (status) => {
    searchVouchersByStatus(status)
      .then((data) => {
        setVouchers(data);
        if (data.length <= 0) {
          setSearchKey("searchIsNull");
        }
      })
      .catch((error) => {
        setSearchKey("searchIsNull");
        console.error("Error fetching count vouchers:", error);
        throw error;
      });
  };

  // * Hàm tìm kiếm sản phẩm theo tên
  const [searchName, setSearchName] = useState("");
  const handleChangeVoucherName = (e) => {
    setSearchName(e.target.value);
  };
  const handleSearchVoucherByName = (searchName) => {
    searchVouchersByName(searchName)
      .then((data) => {
        setVouchers(data);
        if (data.length <= 0) {
          setSearchKey("searchIsNull");
        }
      })
      .catch((error) => {
        setSearchKey("searchIsNull");
        console.error("Error fetching count vouchers:", error);
        throw error;
      });
  };

  // * Hàm tìm kiếm sản phẩm theo giá giảm
  const [saleOff, setSaleOff] = useState();
  const handleChangeVoucherSaleOff = (e) => {
    let newValue = e.target.value.replace(/[^0-9]/g, "");
    setSaleOff(newValue);
  };
  const handleSearchVoucherBySaleOff = (saleOff) => {
    searchVouchersByPrice(saleOff)
      .then((data) => {
        setVouchers(data);
        if (data.length <= 0) {
          setSearchKey("searchIsNull");
        }
      })
      .catch((error) => {
        setSearchKey("searchIsNull");
        console.error("Error fetching count vouchers:", error);
        throw error;
      });
  };

  // * Hàm focus và thẻ input
  const handleFocusInput = () => {
    setSearchName("");
    setSaleOff("");
  };

  const fetchData = async () => {
    try {
      const listVouchers = await getVouchersByCuaHangId();
      setVouchers(listVouchers);

      const store = await getCuaHangById();
      setShop(store);

      const countVoucherByStore = await getCountVoucherByStore();
      setVouchersCount(countVoucherByStore);

      const [chuaApDungCount, hetHanCount, conHanCount] = await Promise.all([
        getCountVoucherByStatus(0),
        getCountVoucherByStatus(1),
        getCountVoucherByStatus(2),
      ]);
      setChuaApDung(chuaApDungCount);
      setHetHan(hetHanCount);
      setConHan(conHanCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="pageHead">
        <h3>Quản lý sản phẩm</h3>
        <Breadcrumb paths={["Quản lý voucher", ""]} />
      </div>
      <div className="containerProduct">
        {isLoading === true ? (
          <Loading />
        ) : (
          <>
            <div className="productbtn-list">
              <div className="productbtn-item productbtn-item_updateInfo">
                <div className="productbtn-item_flex">
                  <button className=" btn1" onClick={handleSeachVouchersAll}>
                    <LuPackageCheck size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{vouchersCount}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Tổng Voucher</p>
                </div>
              </div>

              <div className="productbtn-item productbtn-item_updateInfo">
                <div className="productbtn-item_flex">
                  <button
                    className=" btn3"
                    onClick={() => handleSearchVoucherByStatus(0)}
                  >
                    <LuPackageCheck size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{chuaApDung}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Voucher chưa áp dụng</p>
                </div>
              </div>

              <div className="productbtn-item productbtn-item_updateInfo">
                <div className="productbtn-item_flex">
                  <button
                    className=" btn4"
                    onClick={() => handleSearchVoucherByStatus(2)}
                  >
                    <LuPackageCheck size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{conHan}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Voucher còn hạn</p>
                </div>
              </div>

              <div className="productbtn-item productbtn-item_updateInfo">
                <div className="productbtn-item_flex">
                  <button
                    className=" btn5"
                    onClick={() => handleSearchVoucherByStatus(1)}
                  >
                    <LuPackageCheck size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{hetHan}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Voucher hết hạn</p>
                </div>
              </div>
            </div>
            {/* 3 thanh tìm kiếm */}
            <div className="product-search_listSearch product-search_listSearchAbsolute">
              <div className="product-search_item">
                <label>Mã voucher</label>
                <div className="product-search_item__flex">
                  <input
                    type="text"
                    className="form-control"
                    value={searchName}
                    onChange={handleChangeVoucherName}
                    onFocus={handleFocusInput}
                  />
                  <button
                    className="product-search_item__btn"
                    onClick={() => handleSearchVoucherByName(searchName)}
                  >
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                  </button>
                </div>
              </div>
              <div className="product-search_item">
                <label>Số tiền giảm</label>
                <div className="product-search_item__flex">
                  <input
                    type="text"
                    className="form-control"
                    value={saleOff}
                    onChange={handleChangeVoucherSaleOff}
                    onFocus={handleFocusInput}
                  />
                  <button
                    className="product-search_item__btn"
                    onClick={() => handleSearchVoucherBySaleOff(saleOff)}
                  >
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                  </button>
                </div>
              </div>
              {/* <div className="product-search_item">
                        <label>Ngày tạo voucher</label>
                        <div className="product-search_item__flex">
                            <input
                                type="date"
                                className="form-control"
                            />
                            <button className="product-search_item__btn">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div> */}
              <div className="voucherAddBtn">
                <button
                  onClick={handleShowAddVoucherForm}
                  className="product-search_btnadd "
                >
                  + Thêm Voucher
                </button>
              </div>
            </div>

            <ListVoucher
              listVouchers={vouchers}
              keySearch={searchKey}
              onReload={fetchData}
            />

            {isAddVoucherForm && (
              <VoucherForm
                keyForm={"addVoucher"}
                onClose={handleCloseAddVoucherForm}
                nameShop={shop.ten_cua_hang}
                onReload={fetchData}
              />
            )}
          </>
        )}

        {/* 4 nút đầu */}
      </div>
    </div>
  );
};

export default ManagerVoucher;
