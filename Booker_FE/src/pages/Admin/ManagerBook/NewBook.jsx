import React, { useEffect, useState } from "react";

import "./ManagerBook.css";
import BoxThongKeBlue from "../Order/BoxThongKeBlue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getProductToBrowse } from "../../../utils/API/ProductAPI";
import Loading from "../../../utils/Order/Loading";
import ListManagerBookAdmin from "../ListData/ListManagerBookAdmin";
import Pagination from "../../../utils/Pagination/Pagination";
import Breadcrumb from "../../../utils/Order/Breadcrumb";
import { GiBlackBook } from "react-icons/gi";

const NewBook = () => {
  const [listBooks, setListBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fecthData = async () => {
      try {
        const data = await getProductToBrowse();
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
        <Breadcrumb paths={["Quản lý sách", "Sách mới"]} />
      </div>
      <div className="containerProduct">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="productbtn-list">
              <div className="productbtn-item productbtn-item_updateInfo">
                <div className="productbtn-item_flex">
                  <button className=" btn1">
                    <GiBlackBook  size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{listBooks.length}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Sách mới</p>
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
              trangThaiSach={"new_book"}
              onReload = {fecthData}
              keyBook={'newBook'}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NewBook;
