import React, { useEffect, useState } from "react";

import {
  getBookByHidden,
  getNumberOfBookByHidden,
  getSanPhamByCuaHangId,
  searchProductsByCategoryID,
  searchSanPhamByName,
  getNumberOfBookByYeuCauMoKhoa,
} from "../../utils/API/ProductAPI";
import { getCategory } from "../../utils/API/CategoryAPI";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./ManageProduct.css";
import Loading from "../../utils/Order/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ListProduct from "../../utils/ManageListUI/ListProduct";
import BookForm from "../../utils/FormVisible/BookForm";

import {
  getCountBooksAll,
  getNumberOfBookByClock,
  getNumberOfBookByInStock,
  getNumberOfBookByOutOfStock,
  getNumberOfBookByBrowse,
  searchBookByStatus,
} from "../../utils/API/ProductAPI";
import { getCuaHangById } from "../../utils/API/StoreAPI";
import SolanaForm from "../../utils/FormVisible/SolanaForm";
import Breadcrumb from "../../utils/Order/Breadcrumb";
import { LuBookOpenCheck, LuBookLock, LuBookKey } from "react-icons/lu";
import { PiBooks, PiBookBookmarkBold } from "react-icons/pi";
import { TbBooksOff } from "react-icons/tb";
import { VscEyeClosed } from "react-icons/vsc";

const ManageProduct = () => {
  // *Lấy số lượng sản phẩm
  const [productCount, setProductCount] = useState(0);

  // * KeySearch
  const [searchKey, setSearchKey] = useState("");

  // *Form xem chi tiết, thêm sách mới
  const [isAddBookVisible, setAddBookVisible] = useState(false);
  // *Lấy tất cả sản phẩm thuộc cửa hàng
  const [products, setProducts] = useState([]);
  // * Thể loại
  const [category, setCategory] = useState([]);

  // * Search By Name
  const [searchName, setSearchName] = useState("");

  // const [solForm, setSolForm] = useState(false);

  const handleVisibleForm = () => {
    // store.dia_chi_vi_sol === null ? setSolForm(true) :
    setAddBookVisible(true);
  };

  const handleHiddenForm = () => {
    setAddBookVisible(false);
  };

  // const handleCloseSOLForm = () => {
  //   setSolForm(false);
  // };

  //* Tìm kiếm sản phẩm theo thể loại
  const handleSelectChange = (e) => {
    setSearchName("");
    if (e.target.value >= 0) {
      searchProductsByCategoryID(Number(e.target.value))
        .then((data) => {
          setProducts(data);
          if (data.length <= 0) {
            setSearchKey("searchIsNull");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      getProductsAllByStoreID();
    }
  };

  // * Tìm kiếm sản phẩm theo tên
  const handleKeySearchByName = (e) => {
    setSearchName(e.target.value);
  };
  const handleSearchByName = () => {
    if (searchName !== null && searchName !== undefined && searchName !== "") {
      searchSanPhamByName(searchName)
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          setSearchKey("searchIsNull");
          console.error("Error fetching data:", error);
        });
    } else {
      getProductsAllByStoreID();
    }
  };

  // * Hàm tìm kiếm sản phẩm theo mã trạng thái
  const handleSearchByStatus = (statusInt) => {
    setSearchName("");
    searchBookByStatus(statusInt)
      .then((data) => {
        setProducts(data);
        if (data.length <= 0) {
          setSearchKey("searchIsNull");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // * hàm lấy sản phẩm đang ẩn
  const handleSearchBookHidden = async () => {
    try {
      const data = await getBookByHidden();
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

  // * Hàm lấy ra tất cả sản phẩm
  const getProductsAllByStoreID = () => {
    setSearchName("");
    getSanPhamByCuaHangId()
      .then((data) => {
        // console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const [clock, setClock] = useState();
  const [inStock, setInStock] = useState();
  const [outOfStock, setOutOfStock] = useState();
  const [browse, setBrowse] = useState();
  const [an, setAn] = useState();
  const [yeucaumokhoa, setyeucaumokhoa] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [store, setStore] = useState({});

  const fetchData = async () => {
    try {
      const store = await getCuaHangById();
      setStore(store);

      const productsAll = await getSanPhamByCuaHangId();
      setProducts(productsAll);

      const categoryData = await getCategory();
      setCategory(categoryData);

      const countBooks = await getCountBooksAll();
      setProductCount(countBooks);

      const countClock = await getNumberOfBookByClock();
      setClock(countClock);

      const countInStock = await getNumberOfBookByInStock();
      setInStock(countInStock);

      const countOutOfStock = await getNumberOfBookByOutOfStock();
      setOutOfStock(countOutOfStock);

      const countBrose = await getNumberOfBookByBrowse();
      setBrowse(countBrose);

      const countAn = await getNumberOfBookByHidden();
      setAn(countAn);

      const datayeucau = await getNumberOfBookByYeuCauMoKhoa();
      setyeucaumokhoa(datayeucau);
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
        <Breadcrumb paths={["Quản lý sản phẩm"]} />
      </div>
      <div className="containerProduct">
        {isLoading === true ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="productbtn-listUpdate">
              <div className="productbtn-listUpdate_flex">
                <div className="productbtn-item productbtn-item_update">
                  <div className="productbtn-item_flex">
                    <button
                      className=" btn1"
                      onClick={() => getProductsAllByStoreID()}
                    >
                      <PiBookBookmarkBold size={33} color="#fff" />
                    </button>
                    <div className="productbtn-itemInfo">
                      <h1>{productCount}</h1>
                    </div>
                  </div>
                  <div className="productbtn-item_name">
                    <p>Tổng sản phẩm</p>
                  </div>
                </div>

                <div className="productbtn-item productbtn-item_update">
                  <div className="productbtn-item_flex">
                    <button
                      className=" btn2"
                      onClick={() => handleSearchByStatus(2)}
                    >
                      <LuBookLock size={30} color="#fff" />
                    </button>
                    <div className="productbtn-itemInfo">
                      <h1>{clock}</h1>
                    </div>
                  </div>
                  <div className="productbtn-item_name">
                    <p>Sách bị khóa</p>
                  </div>
                </div>

                <div className="productbtn-item productbtn-item_update">
                  <div className="productbtn-item_flex">
                    <button
                      className=" btn3"
                      onClick={() => handleSearchByStatus(1)}
                    >
                      <LuBookOpenCheck size={30} color="#fff" />
                    </button>
                    <div className="productbtn-itemInfo">
                      <h1>{browse}</h1>
                    </div>
                  </div>
                  <div className="productbtn-item_name">
                    <p>Sách chờ duyệt</p>
                  </div>
                </div>

                <div className="productbtn-item productbtn-item_update">
                  <div className="productbtn-item_flex">
                    <button
                      className=" btn4"
                      onClick={() => handleSearchByStatus(3)}
                    >
                      <PiBooks size={34} color="#fff" />
                    </button>
                    <div className="productbtn-itemInfo">
                      <h1>{inStock}</h1>
                    </div>
                  </div>
                  <div className="productbtn-item_name">
                    <p>Sách còn hàng</p>
                  </div>
                </div>
              </div>

              <div className="productbtn-listUpdate_flex mt-30">
                <div className="productbtn-item productbtn-item_update">
                  <div className="productbtn-item_flex">
                    <button
                      className=" btn5"
                      onClick={() => handleSearchByStatus(4)}
                    >
                      <TbBooksOff size={33} color="#fff" />
                    </button>
                    <div className="productbtn-itemInfo">
                      <h1>{outOfStock}</h1>
                    </div>
                  </div>
                  <div className="productbtn-item_name">
                    <p>Sách hết hàng</p>
                  </div>
                </div>

                <div className="productbtn-item productbtn-item_update">
                  <div className="productbtn-item_flex">
                    <button
                      className=" btn6"
                      onClick={() => handleSearchBookHidden()}
                    >
                      <VscEyeClosed size={33} color="#fff" />
                    </button>
                    <div className="productbtn-itemInfo">
                      <h1>{an}</h1>
                    </div>
                  </div>
                  <div className="productbtn-item_name">
                    <p>Sách đang ẩn</p>
                  </div>
                </div>

                <div className="productbtn-item productbtn-item_update">
                  <div className="productbtn-item_flex">
                    <button
                      className=" btn7"
                      onClick={() => handleSearchByStatus(5)}
                    >
                      <LuBookKey size={33} color="#fff" />
                    </button>
                    <div className="productbtn-itemInfo">
                      <h1>{yeucaumokhoa}</h1>
                    </div>
                  </div>
                  <div className="productbtn-item_name">
                    <p>Yêu cầu mở khóa</p>
                  </div>
                </div>

                <div className="productbtn-item productbtn-item_update">
                  <div className="productbtn-item_flex">
                    <button
                      className=" btn7"
                      onClick={() => handleSearchByStatus(5)}
                    >
                      <LuBookKey size={33} color="#fff" />
                    </button>
                    <div className="productbtn-itemInfo">
                      <h1>{yeucaumokhoa}</h1>
                    </div>
                  </div>
                  <div className="productbtn-item_name">
                    <p>Sách không được duyệt</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-search_list">
              <div className="product-search_list__flex">
                <div className="product-search_item">
                  <label>Thể loại sách</label>
                  <div className="product-search_item__flex">
                    <select
                      className="form-select"
                      aria-label="Danh sách danh mục sản phẩm"
                      onChange={handleSelectChange}
                    >
                      <option value={-1}>-- Tất cả --</option>
                      {category.map((cat, index) => (
                        <option key={index} value={cat.ma_the_loai}>
                          {cat.ten_the_loai}
                        </option>
                      ))}
                    </select>
                    {/* <button>
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button> */}
                  </div>
                </div>
                {/* <div className="product-search_item">
                        <label>Tên tác giả</label>
                        <div className="product-search_item__flex">
                            <input type="text" class="form-control" />
                            <button className="product-search_item__btn">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div> */}
                <div className="product-search_item">
                  <label>Tên sách</label>
                  <div
                    style={{ width: "350px" }}
                    className="product-search_item__flex"
                  >
                    <input
                      type="text"
                      class="form-control"
                      value={searchName}
                      onChange={handleKeySearchByName}
                    />
                    <button
                      className="product-search_item__btn"
                      onClick={handleSearchByName}
                    >
                      <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={handleVisibleForm}
                  className="product-search_btnadd"
                  style={{ marginLeft: "414px" }}
                >
                  + Thêm sản phẩm
                </button>
              </div>
            </div>

            <ListProduct
              listBooks={products}
              keySearch={searchKey}
              searchName={searchName}
              isLoading={isLoading}
              onReload={fetchData}
            ></ListProduct>

            {/* Thông tin sách */}
            {isAddBookVisible && (
              <BookForm
                keyForm={"add-book"}
                onClose={handleHiddenForm}
                onReload={fetchData}
              />
            )}
            {/* {solForm && (
              <SolanaForm store={store} onClose={handleCloseSOLForm} />
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageProduct;
