import React, { useEffect, useState } from "react";
import ListCategory from "../../../utils/AdminList/ListCategory";

import {
  getCategory,
  searchCategoryByName,
  getCountAllCategory,
} from "../../../utils/API/CategoryAPI";
import Loading from "../../../utils/Order/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CategoryForm from "../../../utils/FormVisible/CategoryForm";
import Breadcrumb from "../../../utils/Order/Breadcrumb";
import { BiCategory } from "react-icons/bi";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [categorys, setCategorys] = useState([]);
  // * Search By Name
  const [searchName, setSearchName] = useState("");

  const [count, setCount] = useState(0);

  const handleKeySearchByName = (e) => {
    setSearchName(e.target.value);
  };
  const handleSearchByName = () => {
    if (searchName !== null && searchName !== undefined && searchName !== "") {
      searchCategoryByName(searchName)
        .then((data) => {
          setCategorys(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      handleGetAllCategory();
    }
  };

  const handleGetAllCategory = async () => {
    try {
      const data = await getCategory();
      setCategorys(data);
    } catch (error) {
      console.log(error);
      console.log("lỗi chó: ", error);
    }
  };

  // * trạng thái category
  const [categoryID, setCategoryID] = useState(0);
  const [key, setKey] = useState("");
  const [isDetailVisible, setDetailVisible] = useState(false);

  // ** Ẩn hiện form chi tiết sản phẩm
  const handleShowDetails = (voucherID, key) => {
    // setSelectedBook(book); // Lưu thông tin sách vào state
    setDetailVisible(true); // Hiển thị giao diện chi tiết
    setCategoryID(voucherID);
    setKey(key);
  };
  const handleCloseDetails = () => {
    setDetailVisible(false); // Đóng giao diện chi tiết
  };

  const fetchData = async () => {
    try {
      const data = await getCategory();
      setCategorys(data);

      const countAll = await getCountAllCategory();
      setCount(countAll);
    } catch (error) {
      console.error(error);
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
        <h3>Thể loại sách</h3>
        <Breadcrumb paths={["Thể loại sách"]} />
      </div>
      <div className="containerProduct">
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="productbtn-list">
              <div className="productbtn-item productbtn-item_updateInfo">
                <div className="productbtn-item_flex">
                  <button
                    className=" btn1"
                    onClick={() => handleGetAllCategory()}
                  >
                    <BiCategory  size={33} color="#fff" />
                  </button>
                  <div className="productbtn-itemInfo">
                    <h1>{count}</h1>
                  </div>
                </div>
                <div className="productbtn-item_name">
                  <p>Thể loại sách</p>
                </div>
              </div>
            </div>

            <div className="product-search_list">
              <div className="product-search_item">
                <label>Tên thể loại</label>
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

              <button
                onClick={() => handleShowDetails(null, "add")}
                className="product-search_btnadd"
              >
                + Thêm thể loại
              </button>
            </div>

            <ListCategory listCategory={categorys} onReload={fetchData} />
          </>
        )}

        {isDetailVisible && (
          <CategoryForm
            keyForm={key}
            onClose={handleCloseDetails}
            categoryID={categoryID}
            onReload={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default Category;
