import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import BoxThongKeBlue from "../Order/BoxThongKeBlue";
import Loading from "../../../utils/Order/Loading";
import ListStoreSeller from "../ListData/ListStoreSeller";
import { getCuaHangChoDuyet } from "../../../utils/API/StoreAPI";
import Breadcrumb from "../../../utils/Order/Breadcrumb";

const NewStore = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  const fetchData = async () => {
      try {
        const data = await getCuaHangChoDuyet(11);
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
        <Breadcrumb paths={["Quản lý cửa hàng", "Cửa hàng"]} />
      </div>
      <div className="containerProduct">
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="admin-home">
              <BoxThongKeBlue
                // action={handleGetAllCategory}
                title={"Cửa hàng mới"}
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

            {/* 0 - cửa hàng chở duyệt */}
            <ListStoreSeller storeList={data} trangThaiTK={11} keyForm={0} onReload={fetchData}/>
          </>
        )}
      </div>
    </div>
  );
};

export default NewStore;
