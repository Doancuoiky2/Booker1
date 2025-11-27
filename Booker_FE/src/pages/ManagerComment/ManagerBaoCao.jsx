import React, { useEffect, useState } from "react";

import "./ManagerComment.css";
import "../ManageProduct/ManageProduct.css";

import { getSanPhamOrderByComment } from "../../utils/API/ProductAPI";
import Loading from "../../utils/Order/Loading";
import ListBaoCao from "../../utils/ManageListUI/ListBaoCao";
import {
  getAllBaoCaoCuaHangByDaDuyet,
  getAllBaoCaoCuaHangByStatus,
  getCountBaoCaoCuaHang,
} from "../../utils/API/BaoCaoAPI";
import Breadcrumb from "../../utils/Order/Breadcrumb";
import { RiStore2Line } from "react-icons/ri";

const ManagerBaoCao = () => {
  const [isLoading, setIsLoading] = useState(true);

  // * lưu comments
  const [baoCao, setBaoCao] = useState([]);

  // * length
  const [all, setAll] = useState(0);
  const [dangXuLy, setDangXuLy] = useState(0);
  const [duyet, setDuyet] = useState(0);
  const [huy, setHuy] = useState(0);

  // * Title
  const [title, setTitle] = useState("Báo cáo đang xử lý");

  // * Status
  const [status, setStatus] = useState("choduyet");

  const handletrangThai = async (tt) => {
    setIsLoading(true);
    if (tt === 1) {
      setTitle("Báo cáo đang xử lý");
      setStatus("choduyet");
    } else {
      setTitle("Báo cáo không hợp lệ");
      setStatus("huy");
    }

    try {
      const listProduct = await getAllBaoCaoCuaHangByStatus(tt);
      setBaoCao(listProduct);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const handleTrangThaiDuyet = async () => {
    setIsLoading(true);
    setTitle("Báo cáo không hợp lệ");
    setStatus("duyet");
    try {
      const listProduct = await getAllBaoCaoCuaHangByDaDuyet();
      setBaoCao(listProduct);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const fetchData = async () => {
    try {
      const listProduct = await getAllBaoCaoCuaHangByStatus(1);
      setBaoCao(listProduct);
      setDangXuLy(listProduct.length);

      const listProduct1 = await getAllBaoCaoCuaHangByDaDuyet();
      setDuyet(listProduct1.length);

      const listProduct2 = await getAllBaoCaoCuaHangByStatus(3);
      setHuy(listProduct2.length);

      const listAll = await getCountBaoCaoCuaHang();
      setAll(listAll);
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
        <Breadcrumb paths={["Đánh giá sản phẩm", "Đánh giá đã báo cáo"]} />
      </div>
      <div className="containerProduct">
        {isLoading === true ? (
          <Loading />
        ) : (
          <>
            <div className="productbtn-list">
              <div className="productbtn-item productbtn-item_updateInfo2">
                <div className="productbtn-item_flex">
                  <button className=" btn1" onClick={() => handletrangThai(1)}>
                    <RiStore2Line size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{all}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Tổng số báo cáo</p>
                </div>
              </div>

              <div className="productbtn-item productbtn-item_updateInfo2">
                <div className="productbtn-item_flex">
                  <button className=" btn7" onClick={() => handletrangThai(1)}>
                    <RiStore2Line size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{dangXuLy}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Báo cáo đang xử lý</p>
                </div>
              </div>

              <div className="productbtn-item productbtn-item_updateInfo2">
                <div className="productbtn-item_flex">
                  <button className=" btn4" onClick={() => handleTrangThaiDuyet()}>
                    <RiStore2Line size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{duyet}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Báo cáo đã xử lý</p>
                </div>
              </div>

              <div className="productbtn-item productbtn-item_updateInfo2">
                <div className="productbtn-item_flex">
                  <button className=" btn5" onClick={() => handletrangThai(3)}>
                    <RiStore2Line size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{huy}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Báo cáo không hợp lệ</p>
                </div>
              </div>
              {/* <button className="productbtn-item btn1 no-hover btn1" style={{ width: '175px' }}>
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
            <ListBaoCao listBaoCaos={baoCao} title={title} status={status} />
          </>
        )}
      </div>
    </div>
  );
};

export default ManagerBaoCao;
