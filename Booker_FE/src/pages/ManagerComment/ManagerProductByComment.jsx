import React, { useEffect, useState } from "react";

import "./ManagerComment.css";
import "../ManageProduct/ManageProduct.css";

import ListProductByComment from "../../utils/ManageListUI/ListProductByComment";

import { getListCommentByBookID } from "../../utils/API/DanhGiaAPI";
import { getSanPhamOrderByComment } from "../../utils/API/ProductAPI";
import Loading from "../../utils/Order/Loading";
import { getCuaHangById } from "../../utils/API/StoreAPI";
import Breadcrumb from "../../utils/Order/Breadcrumb";
import { RiStore2Line } from "react-icons/ri";


const ManagerProductByComment = () => {
  const [isLoading, setIsLoading] = useState(true);

  // * lưu comments
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await getCuaHangById();
        setStore(data.diem_cua_hang);
        const listProduct = await getSanPhamOrderByComment();
        setProducts(listProduct);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="pageHead">
        <h3>Quản lý sản phẩm</h3>
        <Breadcrumb paths={["Đánh giá sản phẩm", "Xem đánh giá"]} />
      </div>
      <div className="containerProduct">
        {isLoading === true ? (
          <Loading />
        ) : (
          <>
            <div className="productbtn-list">
              {/* <button
                className="productbtn-item btn1 no-hover btn2"
                style={{ width: "230px" }}
              >
                <p>Điểm cửa hàng</p>
                <h1>{store}</h1>
              </button> */}

              <div className="productbtn-item productbtn-item_updateInfo2">
                <div className="productbtn-item_flex">
                  <button className=" btn3" >
                    <RiStore2Line size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{store}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Điểm cửa hàng</p>
                </div>
              </div>
              {/* <button className="productbtn-item btn1 no-hover btn1" style={{ width: '175px' }}>
                                    <p>Đánh giá 5 sao</p>
                                    <h1>12</h1>
                                </button>
                                <button className="productbtn-item btn1 no-hover btn1" style={{ width: '175px' }}>
                                    <p>Đánh giá 4 sao</p>
                                    <h1>12</h1>
                                </button>
                                <button className="productbtn-item btn1 no-hover btn1" style={{ width: '175px' }}>
                                    <p>Đánh giá 3 sao</p>
                                    <h1>12</h1>
                                </button>
                                <button className="productbtn-item btn1 no-hover btn1" style={{ width: '175px' }}>
                                    <p>Đánh giá 2 sao</p>
                                    <h1>12</h1>
                                </button>
                                <button className="productbtn-item btn1 no-hover btn1" style={{ width: '175px' }}>
                                    <p>Đánh giá 1 sao</p>
                                    <h1>12</h1>
                                </button> */}
            </div>

            {/* Add your code here */}
            <div></div>
            <ListProductByComment listBooks={products} />
          </>
        )}
      </div>
    </div>
  );
};

export default ManagerProductByComment;
