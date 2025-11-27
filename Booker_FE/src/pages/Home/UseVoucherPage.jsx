import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import HeaderUser from "../Component/HeaderUser";
import FooterUser from "../Component/FooterUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCommentDots,
  faFaceFrown,
  faStar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import styles from "./HomeUser.module.css";
import stylesIndex from "./HomeUserIndex.module.css";
import { useNavigate } from "react-router-dom";
import { faPlus, faShop, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../utils/Order/Loading";
import { searchVouchersByStatusIDStore } from "../../utils/API/VoucherAPI";

const UseVoucherPage = () => {
  const { idVoucher } = useParams(); // Lấy id cửa hàng từ URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idStore = queryParams.get("store");
  const [storeInfo, setStoreInfo] = useState(null); // Thông tin cửa hàng
  const [products, setProducts] = useState([]); // Danh sách sản phẩm cửa hàng
  const [numberProducts, setNumberProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [formChat, setFormChat] = useState(false);
  const [vouchers, setVouchers] = useState([]); // voucher
  const productsPerPage = 20; // Số sản phẩm trên mỗi trang
  const navigate = useNavigate();
  const handleProductClick = (id) => {
    navigate(`/ProductDetail/${id}`);
  };
  const [idUser, setIdUser] = useState(null);

  // * hiện form chat


  // Lấy thông tin cửa hàng và danh sách sản phẩm
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        setIdUser(storedUser.id_tai_khoan);
        // Lấy thông tin cửa hàng
        const storeResponse = await axios.get(
          `http://localhost:8080/api/v1/cuahang/info/${idStore}`
        );
        setStoreInfo(storeResponse.data);

        // Lấy danh sách sản phẩm của cửa hàng
        const productsResponse = await axios.get(
          `http://localhost:8080/api/v1/product/cuahang-${idStore}/allinfo`
        );
        setNumberProducts(productsResponse.data.length);
        setProducts(productsResponse.data);

        const vouchers = await searchVouchersByStatusIDStore(idStore, 2);
        setVouchers(vouchers);
        console.log(vouchers);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu cửa hàng:", error);
      }
    };

    fetchStoreData();
  }, [idVoucher, idStore]);

  // Tính toán chỉ số của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Tổng số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [quantity, setQuantity] = useState(1);

  //* Hàm thêm vào giỏ hàng
  const addToCart = (product) => {
    const user = JSON.parse(sessionStorage.getItem("user")); // Lấy thông tin người dùng từ session
    if (!user) {
      // NotificationManager.warning('Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng!', 'Cảnh báo');
      alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng");
      navigate("/login");
      return;
    }

    const cartKey = `cart_${user.id_tai_khoan}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingProduct = cart.find(
      (item) => item.ma_san_pham === product.ma_san_pham
    );
    if (existingProduct) {
      existingProduct.so_luong += quantity;
    } else {
      cart.push({ ...product, so_luong: quantity });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert("Sản phẩm đã được thêm vào giỏ hàng");
    window.location.reload();
  };

  //* Hàm "Mua ngay"
  const buyNow = (product) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      alert("Vui lòng đăng nhập để mua sản phẩm");
      navigate("/login");
      return;
    }

    sessionStorage.setItem(
      "checkoutItem",
      JSON.stringify({ ...product, so_luong: quantity })
    );
    navigate("/checkout");
  };

  const formatMoney = (amount) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    }
    return amount.toString();
  };

  if (!storeInfo) return <Loading />;

  return (
    <div className={styles.parent}>
      <HeaderUser />
      <div className={styles.storeHeadermain}>
        <div className={styles.storeHeader}>
          <div className={styles.storeHeader_img}>
            <div className={styles.bia_overlay}>
              <img
                className={styles.bgShop}
                src={storeInfo.anh_bia}
                alt="Ảnh bìa"
              />
              <div className={styles.overlay}></div>
            </div>

            <div className={styles.storeInfo}>
              <img
                src={storeInfo.anh_dai_dien}
                alt={`Ảnh đại diện của ${storeInfo.ten_cua_hang}`}
                className={styles.storeAvatar}
              />
              <div
                style={{ fontSize: "16px", fontWeight: "900" }}
                className={styles.info}
              >
                <h1 className={styles.storeName}>{storeInfo.ten_cua_hang}</h1>
                {/* <p>Tham gia: {storeInfo.ngay_tao || "01/01/2024"}</p>
              <p>Địa chỉ: {storeInfo.dia_chi_cua_hang}</p> */}
                <div className={styles.storeButton}>
                  <button>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className={styles.storeButton_icon}
                    />
                    Theo dõi
                  </button>
                  {/* <button onClick={handleChatOpen}>
                    <FontAwesomeIcon
                      icon={faMessage}
                      className={styles.storeButton_icon}
                    />{" "}
                    Chat ngay
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.storeHeader_infoShop}>
            <div className={styles.storeHeader_infoShop_col1}>
              <div className={styles.storeHeader_infoShop_col1_row}>
                <FontAwesomeIcon
                  icon={faShop}
                  className={styles.storeHeader_infoShop_col1_row_icon}
                />
                <span>
                  Sản phẩm: <span>{numberProducts}</span>
                </span>
              </div>
              <div className={styles.storeHeader_infoShop_col1_row}>
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className={styles.storeHeader_infoShop_col1_row_icon}
                />
                <span>
                  Đang theo dõi: <span>100</span>
                </span>
              </div>
              <div className={styles.storeHeader_infoShop_col1_row}>
                <FontAwesomeIcon
                  icon={faCommentDots}
                  className={styles.storeHeader_infoShop_col1_row_icon}
                />
                <span>
                  Tỉ lệ phản hồi chat: <span>100% (Trong Vài Giờ)</span>
                </span>
              </div>
            </div>
            <div className={styles.storeHeader_infoShop_col1}>
              <div className={styles.storeHeader_infoShop_col1_row}>
                <FontAwesomeIcon
                  icon={faUser}
                  className={styles.storeHeader_infoShop_col1_row_icon}
                />
                <span>
                  Người theo dõi: <span>100</span>
                </span>
              </div>
              <div className={styles.storeHeader_infoShop_col1_row}>
                <FontAwesomeIcon
                  icon={faStar}
                  className={styles.storeHeader_infoShop_col1_row_icon}
                />
                <span>
                  Đánh giá: <span>{storeInfo.diem_cua_hang}</span>
                </span>
              </div>
              <div className={styles.storeHeader_infoShop_col1_row}>
                <FontAwesomeIcon
                  icon={faCalendar}
                  className={styles.storeHeader_infoShop_col1_row_icon}
                />
                <span>
                  Tham gia: <span>100</span>
                </span>
              </div>
            </div>
            <div className={styles.storeHeader_infoShop_col1}></div>
          </div>
        </div>
      </div>

      {/* <ChatFormUser/> */}

      <div className={styles.storeVoucher}>
        <h3>VOUCHER</h3>

        <div className={styles.storeVoucherList}>
          {vouchers.length > 0 ? (
            <>
              {vouchers.map((voucher, index) => (
                <div key={index} className={styles.storeVoucherItem}>
                  <div className={styles.storeVoucherItemInfo}>
                    <p className={styles.storeVoucherItemInfoGiam}>
                      Giảm {formatMoney(voucher.giam_gia)}₫
                    </p>
                    <p className={styles.storeVoucherItemInfoToiThieu}>
                      Đơn tối thiểu {formatMoney(voucher.gia_ap_dung)}₫
                    </p>
                    <p className={styles.storeVoucherItemInfoDung}>
                      Số lần sử dụng: {voucher.so_lan_dung}
                    </p>
                    <p className={styles.storeVoucherItemInfoHSD}>
                      HSD: {voucher.ngay_het_han}
                    </p>
                  </div>
                  <div className={styles.storeVoucherItemBtn}>
                    <button>Lưu</button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className={styles.storeVoucherNone}>
              <p>Cửa hàng chưa có Voucher giảm giá</p> 
              <FontAwesomeIcon icon={faFaceFrown} className={styles.storeVoucherNoneIcon}/>
            </div>
          )}
        </div>
      </div>

      <div className={styles.storeTitle}>
        <h2>Sản phẩm của {storeInfo.ten_cua_hang}</h2>
      </div>

      <section className={styles.storeProductList}>
        {/* Hiển thị sản phẩm dựa trên kết quả tìm kiếm hoặc danh sách gốc */}

        {currentProducts.map((product, index) => (
          <div
            onClick={() => handleProductClick(product.ma_san_pham)}
            key={index}
            className={stylesIndex.listBookBannerProductItem}
          >
            <img src={product.anh_san_pham} alt={product.ten_san_pham} />
            <p className={stylesIndex.productName}>{product.ten_san_pham}</p>
            <p className={stylesIndex.tacGiaSmall}>{product.tac_gia}</p>
            <div className={stylesIndex.price}>
              <p className={stylesIndex.productPrice}>
                {product.gia ? product.gia.toLocaleString("vi-VN") : 0}đ
              </p>
              {/* <div className={stylesIndex.listCategoryHayItemSol}>
                <img src="/images/solana.png" alt="solana icon" />
                <p>{product.gia_sol || 0} SOL</p>
              </div> */}
            </div>

            <div className={stylesIndex.starAndBuy}>
              <div className={stylesIndex.star}>
                <FontAwesomeIcon icon={faStar} className={stylesIndex.starIcon} />
                {product.diem_trung_binh}
              </div>
              <div className={stylesIndex.buy}>Đã bán {product.da_ban}</div>
            </div>

            <div className={stylesIndex.formHover}>
              <div className={stylesIndex.formHoverInfo}>
                <h5>{product.ten_san_pham}</h5>
                <p className={stylesIndex.tg}>{product.tac_gia}</p>
                <p className={stylesIndex.mt}>{product.mo_ta}</p>
                <div className={stylesIndex.positionOk}>
                  <span>Xem thêm</span>
                  <div className={stylesIndex.money}>
                    <p className={stylesIndex.productPrice}>
                      {product.gia ? product.gia.toLocaleString("vi-VN") : 0}đ
                    </p>
                    {/* <div className={stylesIndex.listCategoryHayItemSol}>
                      <img src="/images/solana.png" alt="solana icon" />
                      <p>{product.gia_sol || 0} SOL</p>
                    </div> */}
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      addToCart(product);
                    }}
                    className={stylesIndex.addCart}
                  >
                    THÊM VÀO GIỎ HÀNG
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      buyNow(product);
                    }}
                    className={stylesIndex.muangay}
                  >
                    MUA NGAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Điều hướng phân trang */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <FooterUser />
    </div>
  );
};

export default UseVoucherPage;
