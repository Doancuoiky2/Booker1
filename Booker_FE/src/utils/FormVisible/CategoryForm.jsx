import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import {
  addCategory,
  getCategoryByID,
  updateCategory,
} from "../../utils/API/CategoryAPI";
import NotificationUI from "../Notification/NotificationUI";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const CategoryForm = ({ categoryID, keyForm, onClose, onReload }) => {
  const [category, setCategory] = useState({});
  // *Check form
  const [errors, setErrors] = useState({});

  // * Hàm change category
  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // * Hàm kiểm tra dữ liệu đầu vào:  insert, update
  const handleCheckInsertCategory = () => {
    const newErrors = {};
    if (!category.ten_the_loai) {
      newErrors.ten_the_loai = true;
    }
    if (!category.mo_ta_the_loai) {
      newErrors.mo_ta_the_loai = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      handleInsertCategory(category);
    }
  };

  // * Hàm thêm thể loại mới
  const handleInsertCategory = (category) => {
    const fetchData = async () => {
      try {
        const payload = {
          ten_the_loai: category.ten_the_loai,
          mo_ta_the_loai: category.mo_ta_the_loai,
        };

        console.log("POST TO", `http://localhost:8080/api/v1/category/add`);
        console.log("payload", payload);

        const data = await addCategory(payload);
        setCategory(data);
        setErrors({});
        NotificationManager.success("Thành công", "Thêm thể loại mới");
        console.log("CategoryForm onReload:", onReload);

        onReload?.();

        onClose();
      } catch (e) {
        if (
          e.response?.status === 400 &&
          e.response.data?.message === "CATEGORY_EXISTS"
        ) {
          setErrors({ trung_ten_the_loai: true });
          NotificationManager.error("Thất bại", "Tên thể loại đã tồn tại!");
          return;
        }

        NotificationManager.error("Lỗi", "Không thể thêm thể loại");
      }
    };
    fetchData();
  };

  const handleCheckUpdateCategory = () => {
    const newErrors = {};
    if (!category.ten_the_loai) {
      newErrors.ten_the_loai = true;
    }
    if (!category.mo_ta_the_loai) {
      newErrors.mo_ta_the_loai = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      handleUpdateCategory(category);
    }
  };

  // * Hiển thị thông báo
  const [notificationStatus, setNotificationStatus] = useState("");
  const [closeNotification, setCloseNotification] = useState(false);
  const [load, setLoad] = useState(false);

  // * Hàm update category
  const handleUpdateCategory = (category) => {
    const fetchData = async () => {
      try {
        const data = await updateCategory(category);
        if (data) {
          setErrors({});
          NotificationManager.success("Thành công", "Cập nhật thể loại sách");
          setLoad(true);
        } else {
          setErrors({});
          NotificationManager.error("Thất bại", "Cập nhật thể loại sách");
          setLoad(false);
        }
      } catch (e) {
        setErrors({});
        NotificationManager.error("Thất bại", "Cập nhật thể loại sách");
        setLoad(false);
        console.log(e);
      }
    };
    fetchData();
  };

  // * tắt form
  const handleCloseForm = () => {
    onReload?.();
    onClose();
    setCategory({
      ten_the_loai: "",
      mo_ta_the_loai: "",
    });
  };

  const handleCloseNotification = () => {
    setCloseNotification(false);
    setNotificationStatus("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoryByID(categoryID);
        setCategory(category);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [categoryID, onReload, keyForm, onClose]);

  return (
    <div>
      <div className="bg_black">
        <div className=" category-form">
          <div className="addnewbook-header">
            {keyForm === "add" ? (
              <h3>Thêm thể loại cho sách</h3>
            ) : (
              <h3>Thể loại sách</h3>
            )}
            <FontAwesomeIcon
              onClick={handleCloseForm}
              style={{ cursor: "pointer" }}
              className="faXmark"
              icon={faXmark}
            ></FontAwesomeIcon>
          </div>

          <div className="category-form-input">
            <div className="category-form-input_item">
              <label htmlFor="ten_the_loai">
                Tên thể loại <span>*</span>
              </label>
              <input
                className="category-form-input_item_inp"
                type="text"
                value={category.ten_the_loai}
                onChange={handleChangeCategory}
                name="ten_the_loai"
              />
              {errors.ten_the_loai && (
                <span className="notification-err">
                  Tên thể loại không hợp lệ!
                </span>
              )}
              {errors.trung_ten_the_loai && (
                <span className="notification-err">
                  Tên thể loại đã tồn tại!
                </span>
              )}
            </div>
            <div className="category-form-input_item">
              <label htmlFor="mo_ta_the_loai">
                Mô tả thể loại <span>*</span>
              </label>
              <textarea
                className="category-form-input_item_inp textarea-update"
                type="text"
                value={category.mo_ta_the_loai}
                onChange={handleChangeCategory}
                name="mo_ta_the_loai"
              ></textarea>
              {errors.mo_ta_the_loai && (
                <span className="notification-err">Mô tả không hợp lệ!</span>
              )}
            </div>
            {keyForm === "add" && (
              <div className="category-form-button">
                <button className="btn-add-category" onClick={handleCloseForm}>
                  Hủy
                </button>
                <button
                  className="btn-add-category"
                  onClick={handleCheckInsertCategory}
                >
                  Tạo mới
                </button>
              </div>
            )}
            {keyForm === "edit" && (
              <div className="category-form-button">
                <button className="btn-add-category" onClick={handleCloseForm}>
                  Hủy
                </button>
                <button
                  className="btn-add-category"
                  onClick={handleCheckUpdateCategory}
                >
                  Cập nhật
                </button>
              </div>
            )}
          </div>
        </div>

        <NotificationContainer />
      </div>
    </div>
  );
};

export default CategoryForm;
