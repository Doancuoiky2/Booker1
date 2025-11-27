import React, { useEffect, useState } from "react";
import { getProductForSelling } from "../../../utils/API/ProductAPI";
import Loading from "../../../utils/Order/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ListManagerBookAdmin from "../ListData/ListManagerBookAdmin";
import Breadcrumb from "../../../utils/Order/Breadcrumb";
import { GiBlackBook } from "react-icons/gi";

const BookForSale = () => {
  const [listBooks, setListBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fecthData = async () => {
    try {
      const data = await getProductForSelling();
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
    <div className="page ">
      <div className="pageHead">
        <h3>Quản lý sách</h3>
        <Breadcrumb paths={["Quản lý sách", "Sách đang bán"]} />
      </div>
      <div className="containerProduct">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="productbtn-list">
              <div className="productbtn-item productbtn-item_updateInfo">
                <div className="productbtn-item_flex">
                  <button className=" btn4">
                    <GiBlackBook size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{listBooks.length}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Sách đang bán</p>
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
              trangThaiSach={"for_sale"}
              onReload={fecthData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BookForSale;
