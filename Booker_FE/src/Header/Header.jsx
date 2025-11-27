import React, { useEffect, useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleCheck,
  faMoneyBill1,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBan,
  faBarsStaggered,
  faU,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import { getCuaHangById } from "../utils/API/StoreAPI";
import Breadcrumb from "../utils/Order/Breadcrumb";

const Header = () => {
  const [store, setStore] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const store = await getCuaHangById();
        setStore(store);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [showNotification, setShowNotification] = useState(false);
  const handleClickShowNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <header className="headerStyle">
      <div className="headerForm">
        <div className="logoStyle">
          <Link to="/seller">
            <img className="logo" src="/images/logoAdmin.png" alt="Booker.vn" />
          </Link>
          <FontAwesomeIcon icon={faBarsStaggered} className="iconMenu" />
        </div>
        <div className="accountStyle">
          <FontAwesomeIcon
            className="custom-icon"
            icon={faBell}
            onClick={handleClickShowNotification}
          ></FontAwesomeIcon>

          {/* {showNotification && (
            <div className="thongbao">
              <div className="thongbao-header">
                <h2>Thông báo</h2>
              </div>
              <div className="thongbao-item">
                <img
                  className="thongbao-item-img"
                  src="/images/logoBooker.png"
                />
                <p>
                  <strong>Thông báo:</strong> chúng tôi đã xem xét và đánh giá
                  mức độ vi phạm của người dùng: <strong>nghiadubay0230</strong>
                  . Booker cảm ơn bạn đã báo cáo, chúng tôi rất cần những đóng
                  góp của bạn để giúp môi trường mua sắm trở nên tốt đẹp và văn
                  minh hơn.
                </p>
                <FontAwesomeIcon
                  className="custom-icon-hidden"
                  icon={faXmark}
                ></FontAwesomeIcon>
              </div>
              <div className="thongbao-item thongbao-ok">
                <img
                  className="thongbao-item-img"
                  src="/images/logoBooker.png"
                />
                <p>
                  <strong>Thông báo:</strong> chúng tôi đã xem xét và đánh giá
                  mức độ vi phạm của người dùng: <strong>nghiadubay0230</strong>
                  . Booker cảm ơn bạn đã báo cáo, chúng tôi rất cần những đóng
                  góp của bạn để giúp môi trường mua sắm trở nên tốt đẹp và văn
                  minh hơn.
                </p>
                <img className="anh-san-pham" src="/images/25.jpg" />
                <FontAwesomeIcon
                  className="custom-icon-check"
                  icon={faCircleCheck}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="custom-icon-hidden"
                  icon={faXmark}
                ></FontAwesomeIcon>
              </div>
              <div className="thongbao-item">
                <img
                  className="thongbao-item-img"
                  src="/images/logoBooker.png"
                />
                <p>
                  <strong>Thông báo:</strong> chúng tôi đã xem xét và đánh giá
                  mức độ vi phạm của người dùng: <strong>nghiadubay0230</strong>
                  . Booker cảm ơn bạn đã báo cáo, chúng tôi rất cần những đóng
                  góp của bạn để giúp môi trường mua sắm trở nên tốt đẹp và văn
                  minh hơn.
                </p>
                <FontAwesomeIcon
                  className="custom-icon-hidden"
                  icon={faXmark}
                ></FontAwesomeIcon>
              </div>
              <div className="thongbao-item thongbao-no">
                <img
                  className="thongbao-item-img"
                  src="/images/logoBooker.png"
                />
                <p>
                  <strong>Thông báo:</strong> chúng tôi đã xem xét và đánh giá
                  mức độ vi phạm của người dùng: <strong>nghiadubay0230</strong>
                  . Booker cảm ơn bạn đã báo cáo, chúng tôi rất cần những đóng
                  góp của bạn để giúp môi trường mua sắm trở nên tốt đẹp và văn
                  minh hơn.
                </p>
                <img className="anh-san-pham" src="/images/21.jpg" />
                <FontAwesomeIcon
                  className="custom-icon-ban"
                  icon={faBan}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="custom-icon-hidden"
                  icon={faXmark}
                ></FontAwesomeIcon>
              </div>
              <div className="thongbao-item">
                <img
                  className="thongbao-item-img"
                  src="/images/logoBooker.png"
                />
                <p>
                  <strong>Thông báo:</strong> chúng tôi đã xem xét và đánh giá
                  mức độ vi phạm của người dùng: <strong>nghiadubay0230</strong>
                  . Booker cảm ơn bạn đã báo cáo, chúng tôi rất cần những đóng
                  góp của bạn để giúp môi trường mua sắm trở nên tốt đẹp và văn
                  minh hơn.
                </p>
                <FontAwesomeIcon
                  className="custom-icon-hidden"
                  icon={faXmark}
                ></FontAwesomeIcon>
              </div>
              <div className="thongbao-item">
                <img
                  className="thongbao-item-img"
                  src="/images/logoBooker.png"
                />
                <p>
                  <strong>Thông báo:</strong> chúng tôi đã xem xét và đánh giá
                  mức độ vi phạm của người dùng: <strong>nghiadubay0230</strong>
                  . Booker cảm ơn bạn đã báo cáo, chúng tôi rất cần những đóng
                  góp của bạn để giúp môi trường mua sắm trở nên tốt đẹp và văn
                  minh hơn.
                </p>
                <FontAwesomeIcon
                  className="custom-icon-hidden"
                  icon={faXmark}
                ></FontAwesomeIcon>
              </div>
            </div>
          )} */}

          <div className="accountStyle-details">
            <FontAwesomeIcon icon={faUser} className="iconUser" />

            <div className="accountStyle-details_hover_ok">
              <div className="accountStyle-details_hover_ok_header">
                <img src={store.tai_khoan?.anh_dai_dien} alt="avt" />
                <div style={{ marginTop: "10px" }}>
                  <h3>{store.tai_khoan?.ho_ten}</h3>
                </div>
              </div>
              <div className="accountStyle-details_hover_ok_link">
                <Link to="/booker.vn/profile">
                  <li> <FontAwesomeIcon icon={faUser}  className="iconLink"/> Tài khoản</li>
                </Link>
                <Link to="/booker.vn">
                  <li> <FontAwesomeIcon icon={faMoneyBill1} className="iconLink"/> Tiếp tục mua hàng</li>
                </Link>
                <Link to="/booker.vn/close-store">
                  <li> <FontAwesomeIcon icon={faBan} className="iconLink"/> Hủy cửa hàng</li>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="nameFormClicked">
        <h3>Trang chủ</h3>
        <Breadcrumb  paths={["Basic Components", "Button"]} />
      </div> */}
    </header>
  );
};

export default Header;
