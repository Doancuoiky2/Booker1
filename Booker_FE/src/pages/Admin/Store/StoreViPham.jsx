import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import BoxThongKeBlue from "../Order/BoxThongKeBlue";
import Loading from "../../../utils/Order/Loading";
import ListStoreSeller from "../ListData/ListStoreSeller";
import {
  getCuaHangChoDuyet,
  getStoreViPham,
} from "../../../utils/API/StoreAPI";
import BoxThongKeBlack from "../Order/BoxThongKeBlack";
import Breadcrumb from "../../../utils/Order/Breadcrumb";

const StoreViPham = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getStoreViPham();
      setData(data);
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
    <div className="page ">
      <div className="pageHead">
        <h3>Quản lý cửa hàng</h3>
        <Breadcrumb paths={["Quản lý cửa hàng", "Cửa hàng vi phạm"]} />
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
                // action={handleGetAllCategory}
                title={"Cửa hàng vi phạm"}
                value={data.length}
                image={"ecommerce.png"}
                cursor={"pointer"}
              />
            </div>
            <div className="product-search_item">
              <label style={{ fontWeight: "600" }}>Tên cửa hàng</label>
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

            <ListStoreSeller
              storeList={data}
              trangThaiTK={"yeucau"}
              keyForm={1}
              onReload={fetchData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default StoreViPham;
