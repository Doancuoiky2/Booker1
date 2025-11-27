import React, { useEffect, useState } from "react";
import BoxThongKeBlack from "../Order/BoxThongKeBlack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../utils/Order/Loading";
import { getProductLocked } from "../../../utils/API/ProductAPI";
import ListManagerBookAdmin from "../ListData/ListManagerBookAdmin";
import { GiBlackBook } from "react-icons/gi";
import Breadcrumb from "../../../utils/Order/Breadcrumb";

const BookDisabled = () => {
  const [listBooks, setListBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fecthData = async () => {
    try {
      const data = await getProductLocked();
      setListBooks(data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);

    fecthData();
  }, []);

  return (
    <div className="page">
      <div className="pageHead">
        <h3>Quản lý sách</h3>
        <Breadcrumb paths={["Quản lý sách", "Sách bị vô hiệu hóa"]} />
      </div>
      <div className="containerProduct">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="productbtn-list">
              <div className="productbtn-item productbtn-item_updateInfo">
                <div className="productbtn-item_flex">
                  <button className=" btn3">
                    <GiBlackBook size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{listBooks.length}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Sách bị vô hiệu hóa</p>
                </div>
              </div>
            </div>
            <div className="product-search_item">
              <label style={{ fontWeight: "600" }}>Tên thể loại</label>
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

            <ListManagerBookAdmin
              listBooks={listBooks}
              trangThaiSach={"book_disabled"}
              onReload={fecthData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BookDisabled;
