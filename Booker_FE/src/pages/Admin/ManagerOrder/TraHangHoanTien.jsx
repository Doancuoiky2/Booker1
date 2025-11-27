import React, { useEffect, useState } from "react";
import Loading from "../../../utils/Order/Loading";
import BoxThongKeBlue from "../Order/BoxThongKeBlue";
import { getAllOrderDetailsByStatus } from "../../../utils/API/OrderDetailsAPI";
import BoxThongKeBlack from "../Order/BoxThongKeBlack";
import ListOrder from "../../../utils/ManageListUI/ListOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ListOrderAdmin from "../ListData/ListOrderAdmin";
import Breadcrumb from "../../../utils/Order/Breadcrumb";

const TraHangHoanTien = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [orderListYeuCau, setOrderListYeuCau] = useState([]);
  const [orderListXacNhan, setOrderListXacNhan] = useState([]);
  const [orderListHuy, setOrderListHuy] = useState([]);
  const [orderListClick, setOrderListClick] = useState([]);
  const [statusHead, setStatusHead] = useState([]);

  const handleClickTrangThai = async (maTrangThai) => {
    try {
      const data = await getAllOrderDetailsByStatus(maTrangThai);
      if (maTrangThai === 15) {
        setStatusHead("Yêu cầu trả hàng - hoàn tiền");
      } else if (maTrangThai === 17) {
        setStatusHead("Xác nhận trả hàng- hoàn tiền");
      } else {
        setStatusHead("Hủy yêu cầu trả hàng - hoàn tiền");
      }
      setOrderListClick(data);
    } catch (error) {
      console.log("lỗi khi truy vấn đơn hàng theo trạng thái: ", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const dataYeuCau = await getAllOrderDetailsByStatus(15);
        const dataXacNhan = await getAllOrderDetailsByStatus(17);
        const dataHuy = await getAllOrderDetailsByStatus(18);
        setOrderListYeuCau(dataYeuCau);
        setOrderListXacNhan(dataXacNhan);
        setOrderListHuy(dataHuy);
        setOrderListClick(dataYeuCau);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="page ">
      <div className="pageHead">
        <h3>Đơn hàng</h3>
        <Breadcrumb paths={["Đơn hàng", "Trả hàng - hoàn tiền"]} />
      </div>
      <div className="containerProduct">
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="admin-home">
              <BoxThongKeBlack
                action={() => handleClickTrangThai(15)}
                title={"Yêu cầu trả hàng - hoàn tiền"}
                value={orderListYeuCau.length}
                image={"requisition.png"}
                cursor={"pointer"}
              />
              <BoxThongKeBlue
                action={() => handleClickTrangThai(17)}
                title={"Đã trả hàng - hoàn tiền"}
                value={orderListXacNhan.length}
                image={"requisition.png"}
                cursor={"pointer"}
              />
              <BoxThongKeBlack
                action={() => handleClickTrangThai(18)}
                title={"Hủy trả hàng - hoàn tiền"}
                value={orderListHuy.length}
                image={"requisition.png"}
                cursor={"pointer"}
              />
            </div>

            <div className="product-search_item">
              <label>Mã hóa đơn</label>
              <div
                style={{ width: "350px" }}
                className="product-search_item__flex"
              >
                <input
                  type="text"
                  class="form-control"
                  // value={searchName}
                  // onChange={handleKeySearchByName}
                />
                <button
                  className="product-search_item__btn"
                  // onClick={handleSearchByName}
                >
                  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </button>
              </div>
            </div>

            <ListOrderAdmin
              listOrders={orderListClick}
              status={"trahang"}
              statusHeader={"Trả Hàng"}
              keyForm={"admin"}
              title={statusHead}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TraHangHoanTien;
