import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faStore,
  faGift,
  faBox,
  faUser,
  faUserPlus,
  faPhoneAlt,
  faShoppingCart,
  faChevronDown,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../Home/SearchBar";
import styles from "../Home/HomeUser.module.css";
import logo from "../Home/logoBooker.png";
import { useCart } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import RechargeForm from "../Wallet/wallet"; // Import RechargeForm
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const HeaderUser = ({ logout, onSearchResults, fixed }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortOption, setSortOption] = useState(""); // Thêm state để lưu lựa chọn sắp xếp
  const [showRechargeForm, setShowRechargeForm] = useState(false); // State để hiển thị form nạp tiền
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ sessionStorage khi component được mount
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchWalletBalance(storedUser.id_tai_khoan);
    }

    // Lắng nghe sự kiện cập nhật số dư ví
    const handleWalletBalanceUpdate = () => {
      // Lấy user mới nhất từ sessionStorage mỗi lần để tránh closure issues
      const currentUser = JSON.parse(sessionStorage.getItem("user"));
      if (currentUser) {
        console.log('🔄 Nhận event walletBalanceUpdated, đang refresh wallet balance...');
        fetchWalletBalance(currentUser.id_tai_khoan);
      }
    };

    window.addEventListener('walletBalanceUpdated', handleWalletBalanceUpdate);

    return () => {
      window.removeEventListener('walletBalanceUpdated', handleWalletBalanceUpdate);
    };
  }, []);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.so_luong, 0);

  const fetchWalletBalance = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/get-vi/${userId}`
      );
      const newBalance = response.data.so_tien;
      setWalletBalance(newBalance);
      console.log('✅ Đã cập nhật wallet balance:', newBalance);
    } catch (error) {
      console.error("Lỗi khi lấy số dư ví:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    if (logout) logout();
    NotificationManager.success("Đăng xuất tài khoản thành công");
  };

  const handleSearch = async () => {
    let url = `http://localhost:8080/api/v1/sanpham/${query}`;

    // Kiểm tra lựa chọn sắp xếp và cập nhật URL
    if (sortOption) {
      switch (sortOption) {
        case "new":
          url = `http://localhost:8080/api/v1/sanpham/00000-1000000/orderBy-lastest/theloai?ma_the_loai`; // Ví dụ: truyền ma_the_loai là 1
          break;
        case "price-high-to-low":
          url = `http://localhost:8080/api/v1/sanpham/00000-1000000/orderBy-price%20desc/theloai?ma_the_loai`;
          break;
        case "price-low-to-high":
          url = `http://localhost:8080/api/v1/sanpham/00000-1000000/orderBy-price%20asce/theloai?ma_the_loai`;
          break;
        default:
          break;
      }
    }

    try {
      const response = await axios.get(url);
      const results = response.data;
      onSearchResults(results); // Gọi callback từ HomeUser
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      onSearchResults([]);
    }
  };
  const handleCartClick = () => {
    navigate("/shopping");
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductDetail/${productId}`);
  };
  const handleSortChange = async (option) => {
    setSortOption(option);
    let url = `http://localhost:8080/api/v1/sanpham/${query}`;

    switch (option) {
      case "new":
        url = `http://localhost:8080/api/v1/sanpham/00000-1000000/orderBy-lastest/theloai?ma_the_loai`;
        break;
      case "price-low-to-high":
        url = `http://localhost:8080/api/v1/sanpham/00000-1000000/orderBy-price%20asce/theloai?ma_the_loai`;
        break;
      case "price-high-to-low":
        url = `http://localhost:8080/api/v1/sanpham/00000-1000000/orderBy-price%20desc/theloai?ma_the_loai`;
        break;
      default:
        break;
    }

    try {
      const response = await axios.get(url);
      onSearchResults(response.data); // Truyền kết quả về component cha
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      onSearchResults([]); // Truyền mảng rỗng khi lỗi
    }
  };

  // Mở/đóng form nạp tiền
  const toggleRechargeForm = () => {
    setShowRechargeForm(true);
  };

  const handleClickAdd = (key) => {
    navigate("/profile-user", { state: { key } });
  };

  return (
    <div
      className={fixed === true ? styles.header_fixed : styles.header_no_fixed}
    >
      <div className={styles.toppp}>
        <div className={styles.w100}>
          <div className={styles.marginHandle}>
            <div className={styles.help}>
              <span>
                <FontAwesomeIcon icon={faQuestionCircle} /> Trợ giúp
              </span>
              {user?.vai_tro?.ma_vai_tro === 2 && (
                <Link to={`/seller`}>
                  <span>
                    <FontAwesomeIcon icon={faStore} /> Kênh người bán hàng
                  </span>
                </Link>
              )}
            </div>
            <div className={styles.wallet}>
              {/* Ví người dùng */}
              {user && (
                <div className={styles.walletInfo}>
                  <FontAwesomeIcon
                    icon={faWallet}
                    style={{ marginRight: "5px" }}
                  />
                  Ví BookerPay:{" "}
                  {walletBalance ? walletBalance.toLocaleString("vi-VN") : 0}{" "}
                  VNĐ
                </div>
              )}
            </div>
            <div className={styles.userOptions}>
              <span>
                <FontAwesomeIcon icon={faGift} style={{ marginRight: "4px" }} />{" "}
                Ưu đãi & tiện ích
              </span>

              {user && (
                <span onClick={() => handleClickAdd(4)}>
                  <FontAwesomeIcon
                    icon={faBox}
                    style={{ marginRight: "4px" }}
                  />{" "}
                  Kiểm tra đơn hàng
                </span>
              )}

              <div>
                {user ? (
                  <div
                    className={styles.userMenu}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <span className={styles.userName}>
                      {user.ho_ten}{" "}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        style={{ marginRight: "4px", marginLeft: "10px" }}
                      />
                    </span>
                    {isDropdownOpen && (
                      <div className={styles.dropdownMenu}>
                        <Link to="/profile-user">
                          <span>Quản lý tài khoản</span>
                        </Link>
                        <span onClick={toggleRechargeForm}>Nạp tiền</span>{" "}
                        {/* Nút Nạp Tiền */}
                        <Link to="/shopping">
                          <span>Giỏ hàng</span>
                        </Link>
                        {user.vai_tro.ma_vai_tro === 2 ? (
                          <Link to="/seller">
                            <span>Cửa hàng của tôi</span>
                          </Link>
                        ) : (
                          <Link to="/sellerRegister">
                            <span>Đăng ký trở thành người bán</span>
                          </Link>
                        )}
                        <Link to="/booker.vn">
                          <span onClick={handleLogout}>Đăng xuất</span>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Link to="/login">
                      <span>
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ marginRight: "4px", marginTop: "5px" }}
                        />{" "}
                        Đăng Nhập
                      </span>
                    </Link>
                    <Link to="/register">
                      <span>
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          style={{ marginRight: "4px", marginTop: "5px" }}
                        />{" "}
                        Đăng Ký
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className={styles.header}>
        <div className={styles.mainHeader}>
          <Link to={`/booker.vn`}>
            <div className={styles.logo}>
              <img src={logo} alt="Booker Logo" />
            </div>
          </Link>

          {/* Search Bar */}
          <SearchBar
            onSearchResults={handleSearch}
            setQuery={setQuery}
            query={query}
            ma_the_loai={null}
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />

          {/* Contact Section */}
          <div className={styles.contact}>
            <FontAwesomeIcon
              style={{ fontSize: "24px", color: "#ed8a47", marginRight: "6px" }}
              icon={faPhoneAlt}
            />
            <div className={styles.floatL}>
              <span className={styles.hotline}>0365 412 270</span>
              <span>Hotline</span>
            </div>
          </div>

          {/* Giỏ hàng */}
          <div
            className={styles.cart}
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
            onClick={handleCartClick}
          >
            <FontAwesomeIcon
              style={{ fontSize: "26px", color: "#ed8a47" }}
              icon={faShoppingCart}
            />
            <span>{totalQuantity}</span>

            {/* Giỏ hàng nhỏ khi hover */}
            {isCartOpen && (
              <div className={styles.cartDropdown}>
                <div>
                  <h3>Giỏ hàng của tôi</h3>
                </div>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div
                      key={index}
                      className={styles.cartItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(item.ma_san_pham);
                      }}
                    >
                      <img
                        src={item.anh_san_pham}
                        alt={item.ten_san_pham}
                        className={styles.cartItemImage}
                      />
                      <div className={styles.cartItemInfo}>
                        <h4 className={styles.cartItemName}>
                          {item.ten_san_pham}phan trọng nghĩa đẹp trai số 1
                        </h4>
                        <p>x {item.so_luong}</p>
                        <p className={styles.cartItemPrice}>
                          {item.gia ? item.gia.toLocaleString("vi-VN") : 0}₫
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.emptyCart}>Giỏ hàng trống!</p>
                )}
                <div className={styles.cartButton}>
                  <p>{cartItems.length} thêm vào giỏ hàng</p>
                  <button>Xem giỏ hàng</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Bar */}
        {/* <nav className={styles.navBar}>
                    <div
                        className={styles.navItem}
                        onMouseEnter={() => setShowCategories(true)}
                        onMouseLeave={() => setShowCategories(false)}
                    >
                        <div className={styles.navItemCss}>
                            <span
                                className={styles.menuToggle}
                                onMouseEnter={() => setIsDropdownOpen1(true)}
                                onMouseLeave={() => setIsDropdownOpen1(false)}
                            >
                                <FontAwesomeIcon icon={faBars} style={{ marginRight: '10px' }} /> Danh mục sản phẩm
                                {isDropdownOpen1 && (
                                    <div
                                        className={styles.dropdownMenu}
                                        onMouseEnter={() => setIsDropdownOpen1(true)} // Giữ dropdown mở khi chuột di chuyển vào dropdown
                                        onMouseLeave={() => setIsDropdownOpen1(false)} // Đóng dropdown khi chuột rời khỏi dropdown
                                    >
                                        <ul>
                                            <li onClick={() => handleCategoryClick(1)}>Văn học</li>
                                            <li onClick={() => handleCategoryClick(2)}>Kinh tế</li>
                                            <li onClick={() => handleCategoryClick(3)}>Kỹ năng sống</li>
                                            <li onClick={() => handleCategoryClick(4)}>Tâm lý - giới tính</li>
                                            <li onClick={() => handleCategoryClick(5)}>Sách - Truyện tranh</li>
                                            <li onClick={() => handleCategoryClick(6)}>Giáo dục - lịch sử</li>
                                        </ul>
                                    </div>
                                )}
                            </span>

                            <span>
                                <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: '10px' }} />
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.navItem} ${styles.mgR50}`}>
                        <img src='/images/sale1.png' alt='sale' />
                        Giảm thêm 5%
                    </div>
                    <div className={`${styles.navItem} ${styles.mgR50}`}>
                        <img src='/images/sale2.jpg' alt='sale' />
                        Chương trình khuyến mãi
                    </div>
                    <div className={styles.sale}>Sale Sốc Xả Kho</div>
                </nav> */}
      </header>

      {/* Modal cho Form Nạp Tiền */}
      {showRechargeForm && (
        <RechargeForm 
          onClose={() => setShowRechargeForm(false)} 
          onTransactionSuccess={() => {
            // Refresh wallet balance khi có giao dịch thành công
            if (user) {
              fetchWalletBalance(user.id_tai_khoan);
            }
          }}
        />
      )}

      <NotificationContainer />
    </div>
  );
};

export default HeaderUser;
