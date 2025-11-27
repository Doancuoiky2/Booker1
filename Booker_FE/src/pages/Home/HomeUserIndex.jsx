import React, { useEffect, useState } from "react";
import styles from "./HomeUserIndex.module.css";
import {
  getAllBookUser,
  getProductsByNameCategory,
  findProductsByMaTheLoai,
  getProductsByMaTheLoaiAndSapXep,
} from "../../utils/API/ProductAPI";
import { useNavigate } from "react-router-dom";
import FooterUser from "../Component/FooterUser";
import HeaderUser from "../Component/HeaderUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBook,
  faBookAtlas,
  faBookBible,
  faListUl,
  faMarsDouble,
  faMoneyBillTrendUp,
  faPalette,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import ImageCarousel from "./ImageCarousel";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CamMuaHangForm from "./CamMuaHangForm";

const HomeUserIndex = () => {
  const [products, setProducts] = useState([]); // Toàn bộ sản phẩm
  const [featuredProducts, setFeaturedProducts] = useState([]); // Sản phẩm nổi bật
  const [newProducts, setNewProducts] = useState([]); // Sản phẩm mới
  const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm
  const [isSearching, setIsSearching] = useState(false); // Trạng thái đang tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const productsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang
  const navigate = useNavigate();

  const [vanHoc, setVanHoc] = useState([]);
  const [lichSu, setLichSu] = useState([]);
  const [truyenTranh, setTruyenTranh] = useState([]);
  const [banChays, setBanChays] = useState([]);

  const [hoveredProduct, setHoveredProduct] = useState({});

  const [user, setUser] = useState(null);

  // Lấy danh sách sản phẩm khi load trang
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      // NotificationManager.success('Đăng nhập thành công', '');
      // fetchWalletBalance(storedUser.id_tai_khoan);
    }
    console.log(storedUser);
    const fetchProducts = async () => {
      try {
        const data = await getAllBookUser(); // Lấy toàn bộ sản phẩm từ API
        setProducts(data);
        // Lấy ngẫu nhiên sản phẩm cho từng danh mục
        // setFeaturedProducts(data.sort(() => 0.5 - Math.random()).slice(0, 8));
        // setNewProducts(data.sort(() => 0.5 - Math.random()).slice(0, 8));

        const vanHocData = await getProductsByNameCategory("văn học");
        setVanHoc(vanHocData);
        const lichSuData = await getProductsByNameCategory("lịch sử");
        setLichSu(lichSuData);
        const truyenTranhData = await getProductsByNameCategory("chính trị");
        setTruyenTranh(truyenTranhData);

        const banChayData = await getProductsByMaTheLoaiAndSapXep(1);
        setBanChays(banChayData);
        // const banChayData = await getProductsByDaBanDesc();
        // setBanChays(banChayData);
        const firstProduct = banChayData[0];
        console.log("firstProduct: ", firstProduct);

        setHoveredProduct(firstProduct);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  // Xử lý khi có kết quả tìm kiếm
  const handleSearchResults = (results) => {
    setSearchResults(results); // Cập nhật kết quả tìm kiếm
    setIsSearching(results.length > 0); // Đặt trạng thái đang tìm kiếm
    setCurrentPage(1); // Quay về trang đầu tiên khi tìm kiếm
  };

  // Chuyển hướng đến chi tiết sản phẩm
  const handleProductClick = (id) => {
    navigate(`/ProductDetail/${id}`);
  };

  // Chuyển hướng đến danh mục với mã thể loại
  const handleCategoryClick = (maTheLoai) => {
    navigate(`/HomeUser?ma_the_loai=${maTheLoai}`);
  };

  const handleNameCategoryClick = () => {
    navigate(`/HomeUser`);
  };

  // Tính toán sản phẩm hiển thị cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = (isSearching ? searchResults : products || []).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getProductsByCategory = async (nameCategory) => {
    let data = [];

    if (nameCategory === "Sách kinh tế") {
      data = await findProductsByMaTheLoai(2);
    } else if (nameCategory === "Sách giáo dục") {
      data = await findProductsByMaTheLoai(5);
    } else if (nameCategory === "Sách kỹ năng sống") {
      data = await findProductsByMaTheLoai(3);
    } else {
      data = await getAllBookUser(); // Ví dụ cho "Sách mới"
    }

    setProducts(data);
  };

  //   Click vào các item bảng xếp hạng sản phẩm bán chạy theo từng thể loại
  const sapXepSanPhamByIDTheLoai = async (index) => {
    let id;

    switch (index) {
      case 0:
        id = 1;
        break;
      case 1:
        id = 2;
        break;
      case 2:
        id = 6;
        break;
      case 3:
        id = 4;
        break;
      case 4:
        id = 9;
        break;
      case 5:
        id = 10;
        break;
      case 6:
        id = 3;
        break;
      default:
        id = 7;
    }

    const data = await getProductsByMaTheLoaiAndSapXep(id);
    setBanChays(data);
  };

  const categories1 = [
    "Sách mới",
    "Sách kinh tế",
    "Sách giáo dục",
    "Sách kỹ năng sống",
  ];
  const categories2 = [
    "Văn học",
    "Kinh tế",
    "Lịch sử",
    "Tâm lý - Giới tính",
    "Thiếu nhi",
    "Sách ngoại ngữ",
    "Kỹ năng sống",
    "Anime - Truyện tranh",
  ];
  const [category, setCategory] = useState(categories1[0]);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [category2, setCategory2] = useState(categories2[0]);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const handleItemClick = (index) => {
    setActiveIndex1(index); // Cập nhật trạng thái khi nhấn
    const selectedCategory = categories1[index];
    setCategory(selectedCategory);
    getProductsByCategory(selectedCategory);
  };

  const handleItemClick2 = (index) => {
    setActiveIndex2(index);
    sapXepSanPhamByIDTheLoai(index);
  };

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const [quantity, setQuantity] = useState(1);

  const [hasNotified, setHasNotified] = useState(false);

  //* Hàm thêm vào giỏ hàng
  const addToCart = (product) => {
    const user = JSON.parse(sessionStorage.getItem("user")); // Lấy thông tin người dùng từ session
    if (!user) {
      if (!hasNotified) {
        // Chỉ hiển thị thông báo nếu chưa hiển thị lần nào
        NotificationManager.warning(
          "Vui lòng đăng nhập trước khi thêm vào giỏ hàng",
          "Chưa đăng nhập"
        );
        setHasNotified(true); // Đánh dấu đã hiển thị thông báo

        setTimeout(() => {
          navigate("/login");
          setHasNotified(false); // Reset trạng thái để thông báo lại khi cần
        }, 3000);
      }
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
    NotificationManager.success("Thành công", "Thêm sản phẩm vào giỏ hàng");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  // const [hienalert, setHienalert] = useState(false);
  //* Hàm "Mua ngay"
  const buyNow = (product) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      // if (!hienalert) {
        // Chỉ hiển thị thông báo nếu chưa hiển thị lần nào
        NotificationManager.warning(
          "Vui lòng đăng nhập để mua sản phẩm",
          "Chưa đăng nhập"
        );
        // setHienalert(true); 

        // setTimeout(() => {
        //   navigate("/login");
        //   setHienalert(false); 
        // }, 3000);
      // }
      return;
    }

    sessionStorage.setItem(
      "checkoutItem",
      JSON.stringify({ ...product, so_luong: quantity })
    );
    navigate("/checkout");
  };

  return (
    <>
      <div className={styles.menuBarHeader}>
        <div className={styles.parent2}>
          <div className={styles.menuBarHeaderBox1}>
            <FontAwesomeIcon icon={faListUl} className={styles.listUlIcon} />
            <h3>Danh mục sản phẩm</h3>
          </div>
          <div className={styles.menuBarHeaderBox2}>
            <img
              className={styles.imgMenuBar}
              src="images/saleoff.png"
              alt="Sale 2%"
            />
            <h3>Giảm thêm 2%</h3>
          </div>
          <div
            className={styles.menuBarHeaderBox2}
            style={{ marginLeft: "200px" }}
          >
            <img
              className={styles.imgMenuBar}
              src="images/hot.jpg"
              alt="Sale 2%"
            />
            <h3>Chương Trình Khuyến Mãi </h3>
          </div>
          <div className={styles.menuBarHeaderBox3}>
            <h3>Sale Sốc Xả Kho</h3>
          </div>
        </div>
      </div>
      <div className={styles.parent}>
        <HeaderUser
          onSearchResults={handleSearchResults} // Truyền callback xử lý kết quả tìm kiếm
          fixed={true}
        />

        {user?.trang_thai_tk === true && <CamMuaHangForm />}

        {/* Banner */}

        <section className={styles.bannerSection}>
          {/* <div classs>
                <p>Tài khoản đã bị cấm MUA HÀNG</p>
            </div> */}

          <div className={styles.menuBar}>
            <ul>
              <li onClick={() => handleCategoryClick(1)}>
                <FontAwesomeIcon icon={faBook} style={{ marginRight: "7px"}} />
                Văn học
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.arrowR}
                />
              </li>
              <li onClick={() => handleCategoryClick(2)}>
                <FontAwesomeIcon
                  icon={faMoneyBillTrendUp}
                  style={{ marginRight: "7px" }}
                />
                Kinh tế
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.arrowR}
                />
              </li>
              <li onClick={() => handleCategoryClick(3)}>
                <FontAwesomeIcon
                  icon={faBookBible}
                  style={{ marginRight: "7px" }}
                />
                Kỹ năng sống
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.arrowR}
                />
              </li>
              <li onClick={() => handleCategoryClick(4)}>
                <FontAwesomeIcon
                  icon={faMarsDouble}
                  style={{ marginRight: "7px" }}
                />
                Tâm lý - giới tính
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.arrowR}
                />
              </li>
              <li onClick={() => handleCategoryClick(5)}>
                <FontAwesomeIcon
                  icon={faPalette}
                  style={{ marginRight: "7px" }}
                />
                Sách - Truyện tranh
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.arrowR}
                />
              </li>
              <li onClick={() => handleCategoryClick(6)}>
                <FontAwesomeIcon
                  icon={faBookAtlas}
                  style={{ marginRight: "7px" }}
                />
                Giáo dục - lịch sử
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.arrowR}
                />
              </li>
            </ul>
          </div>
          <div className={styles.bannerMain}>
            <ImageCarousel />
          </div>
        </section>

        {/* Hiển thị sản phẩm */}
        <section className={styles.section}>
          {/* <h2>{isSearching ? 'Kết Quả Tìm Kiếm' : 'Sách Hay'}</h2> */}
          <div className={styles.bannerImgList}>
            <img
              className={styles.bannerImg}
              src="/images/banner_1.jpg"
              alt="Banner"
            />
            <img
              className={styles.bannerImg}
              src="/images/banner_2.jpg"
              alt="Banner"
            />
            <img
              className={styles.bannerImg}
              src="/images/banner_3.jpg"
              alt="Banner"
            />
          </div>

          <div className={styles.listBook}>
            <div className={styles.listBookHeader}>
              <h3>{category}</h3>
              <div className={styles.listBookOption}>
                <ul>
                  {categories1.map((category, index) => (
                    <li
                      key={index}
                      className={index === activeIndex1 ? styles.li_active : ""}
                      onClick={() => handleItemClick(index)}
                    >
                      {category}
                    </li>
                  ))}
                  <p onClick={() => handleNameCategoryClick()}>
                    Xem thêm{" "}
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                  </p>
                </ul>
              </div>
            </div>

            <Slider {...settings} className={styles.sliderCss}>
              {currentProducts.map((product, index) => (
                <div
                  className={styles.productCard}
                  key={index}
                  onClick={() => handleProductClick(product.ma_san_pham)}
                >
                  <div className={styles.imageContainer}>
                    <img
                      className={styles.productImage}
                      src={product.anh_san_pham}
                      alt={product.ten_san_pham}
                    />
                  </div>

                  <div className={styles.productInfo}>
                    <p className={styles.productName}>{product.ten_san_pham}</p>
                    <p className={styles.tacGia}>{product.tac_gia}</p>
                    <div className={styles.price}>
                      <p className={styles.productPrice}>
                        {product.gia ? product.gia.toLocaleString("vi-VN") : 0}đ
                      </p>
                      {/* <div className={styles.listCategoryHayItemSol}>
                        <img src="./images/solana.png" alt="solana icon" />
                        <p>{product.gia_sol || 0} SOL</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className={styles.listBookBanner}>
            <div className={styles.listBookHeader}>
              <h3>TÁC PHẨM VĂN HỌC</h3>
              <div className={styles.listBookOption}>
                <ul>
                  <p onClick={() => handleCategoryClick(1)}>
                    Xem thêm{" "}
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                  </p>
                </ul>
              </div>
            </div>
            <div className={styles.listBookBannerBox}>
              <img
                className={styles.listBookBannerBoxImg}
                src="/images/banner_vanhoc.jpg"
                alt="Banner"
              />
              <div className={styles.listBookBannerProduct}>
                {vanHoc.slice(0, 8).map((product, index) => (
                  <div
                    key={index}
                    className={styles.listBookBannerProductItem}
                    onClick={() => handleProductClick(product.ma_san_pham)}
                  >
                    <img
                      src={product.anh_san_pham}
                      alt={product.ten_san_pham}
                    />
                    <p className={styles.productName}>{product.ten_san_pham}</p>
                    <p className={styles.tacGiaSmall}>{product.tac_gia}</p>
                    <div className={styles.price}>
                      <p className={styles.productPrice}>
                        {product.gia ? product.gia.toLocaleString("vi-VN") : 0}đ
                      </p>
                      {/* <div className={styles.listCategoryHayItemSol}>
                        <img src="./images/solana.png" alt="solana icon" />
                        <p>{product.gia_sol || 0} SOL</p>
                      </div> */}
                    </div>

                    <div className={styles.starAndBuy}>
                      <div className={styles.star}>
                        <FontAwesomeIcon icon={faStar} className={styles.starIcon}/>
                        {product.diem_trung_binh}
                      </div>
                      <div className={styles.buy}>Đã bán {product.da_ban}</div>
                    </div>

                    <div className={styles.formHover}>
                      <div className={styles.formHoverInfo}>
                        <h5>{product.ten_san_pham}</h5>
                        <p className={styles.tg}>{product.tac_gia}</p>
                        <p className={styles.mt}>{product.mo_ta}</p>
                        <div className={styles.positionOk}>
                          <span onClick={() => handleNameCategoryClick()}>
                            Xem thêm
                          </span>
                          <div className={styles.money}>
                            <p className={styles.productPrice}>
                              {product.gia
                                ? product.gia.toLocaleString("vi-VN")
                                : 0}
                              đ
                            </p>
                            {/* <div className={styles.listCategoryHayItemSol}>
                              <img
                                src="./images/solana.png"
                                alt="solana icon"
                              />
                              <p>{product.gia_sol || 0} SOL</p>
                            </div> */}
                          </div>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              addToCart(product);
                            }}
                            className={styles.addCart}
                          >
                            THÊM VÀO GIỎ HÀNG
                          </button>

                          {user === null && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                buyNow(product);
                              }}
                              className={styles.muangay}
                            >
                              MUA NGAY
                            </button>
                          )}

                          {user?.trang_thai_tk === false && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                buyNow(product);
                              }}
                              className={styles.muangay}
                            >
                              MUA NGAY
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.bangXepHang}>
            <div className={styles.bangXepHangHeader}>
              <img src="/images/banner_vote_06_2020.png" />
              <h3>Bảng xếp hạng sách bán chạy</h3>
            </div>
            <div className={styles.categoryXepHang}>
              <ul>
                {categories2.map((category, index) => (
                  <li
                    key={index}
                    className={
                      index === activeIndex2
                        ? styles.categoryXepHang_active
                        : ""
                    }
                    onClick={() => handleItemClick2(index)}
                  >
                    {category}
                  </li>
                ))}
                {/* <li className={styles.categoryXepHang_active}>Văn học</li>
                <li>Kinh tế</li>
                <li>Lịch sử</li>
                <li>Tâm lý - kỹ năng sống</li>
                <li>Thiếu nhi</li>
                <li>Sách học ngoại ngữ</li>
                <li>Anime - truyện tranh</li> */}
              </ul>
            </div>
            <div className={styles.bangXepHangContent}>
              <div className={styles.bangXepHangProduct}>
                {banChays.slice(0, 5).map((product, index) => (
                  <div
                    key={index}
                    className={styles.bangXepHangProductItem}
                    onMouseEnter={() => handleMouseEnter(product)}
                    onClick={() => handleProductClick(product.ma_san_pham)}
                  >
                    <h3 className={styles.xepHang}>0{index + 1}</h3>
                    <img
                      src={product.anh_san_pham}
                      alt={product.ten_san_pham}
                    />
                    <div>
                      <p className={styles.productNameXepHang}>
                        {product.ten_san_pham}
                      </p>
                      <p className={styles.tacGiaXepHang}>{product.tac_gia}</p>
                      <div className={styles.price}>
                        <p className={styles.productPrice}>
                          {product.gia
                            ? product.gia.toLocaleString("vi-VN")
                            : 0}
                          đ
                        </p>
                        {/* <div className={styles.listCategoryHayItemSol}>
                          <img src="./images/solana.png" alt="solana icon" />
                          <p>{product.gia_sol || 0} SOL</p>
                        </div> */}
                      </div>
                      <p className={styles.daBan}>Đã bán: {product.da_ban}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.bangXepHangProductInfo}>
                <div className={styles.bangXepHangProductInfoImage}>
                  <img
                    src={hoveredProduct.anh_san_pham}
                    alt={hoveredProduct.ten_san_pham}
                  />
                </div>
                <div className={styles.bangXepHangProductInfoText}>
                  <h4>{hoveredProduct.ten_san_pham}</h4>
                  <p>Tác giả: {hoveredProduct.tac_gia}</p>
                  <p>Thể loại: {hoveredProduct.the_loai?.ten_the_loai}</p>
                  <div className={styles.price}>
                    <p className={styles.productPrice}>
                      ₫{hoveredProduct.gia?.toLocaleString("vi-VN") || 0}
                    </p>
                    {/* <div className={styles.listCategoryHayItemSol}>
                      <img src="./images/solana.png" alt="solana icon" />
                      <p>{hoveredProduct.gia_sol || 0}</p>
                    </div> */}
                  </div>
                  <strong>
                    {hoveredProduct.ten_san_pham} ( {hoveredProduct.phien_ban} )
                  </strong>
                  <p>{hoveredProduct.mo_ta}</p>
                  <div className={styles.formHoverInfo}>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        addToCart(hoveredProduct);
                      }}
                      className={styles.addCart}
                    >
                      THÊM VÀO GIỎ HÀNG
                    </button>

                    {user === null && (
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          buyNow(hoveredProduct);
                        }}
                        className={styles.muangay}
                      >
                        MUA NGAY
                      </button>
                    )}
                    {user?.trang_thai_tk === false && (
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          buyNow(hoveredProduct);
                        }}
                        className={styles.muangay}
                      >
                        MUA NGAY
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.listBookBanner}>
            <div className={styles.listBookHeader}>
              <h3>SÁCH LỊCH SỬ</h3>
              <div className={styles.listBookOption}>
                <ul>
                  <p onClick={() => handleCategoryClick(6)}>
                    Xem thêm{" "}
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                  </p>
                </ul>
              </div>
            </div>
            <div className={styles.listBookBannerBox}>
              <img
                className={styles.listBookBannerBoxImg2}
                src="/images/banner_lichsu.jpg"
                alt="Banner"
              />
              <div className={styles.listBookBannerProduct}>
                {lichSu.slice(0, 8).map((product, index) => (
                  <div
                    key={index}
                    className={styles.listBookBannerProductItem}
                    onClick={() => handleProductClick(product.ma_san_pham)}
                  >
                    <img
                      src={product.anh_san_pham}
                      alt={product.ten_san_pham}
                    />
                    <p className={styles.productName}>{product.ten_san_pham}</p>
                    <p className={styles.tacGiaSmall}>{product.tac_gia}</p>
                    <div className={styles.price}>
                      <p className={styles.productPrice}>
                        {product.gia ? product.gia.toLocaleString("vi-VN") : 0}đ
                      </p>
                      {/* <div className={styles.listCategoryHayItemSol}>
                        <img src="./images/solana.png" alt="solana icon" />
                        <p>{product.gia_sol || 0} SOL</p>
                      </div> */}
                    </div>

                    <div className={styles.starAndBuy}>
                      <div className={styles.star}>
                        <FontAwesomeIcon icon={faStar} className={styles.starIcon}/>
                        {product.diem_trung_binh}
                      </div>
                      <div className={styles.buy}>Đã bán {product.da_ban}</div>
                    </div>

                    <div className={styles.formHover}>
                      <div className={styles.formHoverInfo}>
                        <h5>{product.ten_san_pham}</h5>
                        <p className={styles.tg}>{product.tac_gia}</p>
                        <p className={styles.mt}>{product.mo_ta}</p>
                        <div className={styles.positionOk}>
                          <span onClick={() => handleNameCategoryClick()}>
                            Xem thêm
                          </span>
                          <div className={styles.money}>
                            <p className={styles.productPrice}>
                              {product.gia
                                ? product.gia.toLocaleString("vi-VN")
                                : 0}
                              đ
                            </p>
                            {/* <div className={styles.listCategoryHayItemSol}>
                              <img
                                src="./images/solana.png"
                                alt="solana icon"
                              />
                              <p>{product.gia_sol || 0} SOL</p>
                            </div> */}
                          </div>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              addToCart(product);
                            }}
                            className={styles.addCart}
                          >
                            THÊM VÀO GIỎ HÀNG
                          </button>

                          {user === null && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                buyNow(product);
                              }}
                              className={styles.muangay}
                            >
                              MUA NGAY
                            </button>
                          )}
                          {user?.trang_thai_tk === false && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                buyNow(product);
                              }}
                              className={styles.muangay}
                            >
                              MUA NGAY
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.listBookBanner}>
            <div className={styles.listBookHeader}>
              <h3>TRUYỆN TRANH - ANIME</h3>
              <div className={styles.listBookOption}>
                <ul>
                  <p onClick={() => handleCategoryClick(7)}>
                    Xem thêm{" "}
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                  </p>
                </ul>
              </div>
            </div>
            <div className={styles.listBookBannerBox}>
              <img
                className={styles.listBookBannerBoxImg2}
                src="/images/banner_truyentranh.jpg"
                alt="Banner"
              />
              <div className={styles.listBookBannerProduct}>
                {truyenTranh.slice(0, 8).map((product, index) => (
                  <div
                    onClick={() => handleProductClick(product.ma_san_pham)}
                    key={index}
                    className={styles.listBookBannerProductItem}
                  >
                    <img
                      src={product.anh_san_pham}
                      alt={product.ten_san_pham}
                    />
                    <p className={styles.productName}>{product.ten_san_pham}</p>
                    <p className={styles.tacGiaSmall}>{product.tac_gia}</p>
                    <div className={styles.price}>
                      <p className={styles.productPrice}>
                        {product.gia ? product.gia.toLocaleString("vi-VN") : 0}đ
                      </p>
                      {/* <div className={styles.listCategoryHayItemSol}>
                        <img src="./images/solana.png" alt="solana icon" />
                        <p>{product.gia_sol || 0} SOL</p>
                      </div> */}
                    </div>

                    <div className={styles.starAndBuy}>
                      <div className={styles.star}>
                        <FontAwesomeIcon icon={faStar} className={styles.starIcon}/>
                        {product.diem_trung_binh}
                      </div>
                      <div className={styles.buy}>Đã bán {product.da_ban}</div>
                    </div>

                    <div className={styles.formHover}>
                      <div className={styles.formHoverInfo}>
                        <h5>{product.ten_san_pham}</h5>
                        <p className={styles.tg}>{product.tac_gia}</p>
                        <p className={styles.mt}>{product.mo_ta}</p>
                        <div className={styles.positionOk}>
                          <span onClick={() => handleNameCategoryClick()}>
                            Xem thêm
                          </span>
                          <div className={styles.money}>
                            <p className={styles.productPrice}>
                              {product.gia
                                ? product.gia.toLocaleString("vi-VN")
                                : 0}
                              đ
                            </p>
                            {/* <div className={styles.listCategoryHayItemSol}>
                              <img
                                src="./images/solana.png"
                                alt="solana icon"
                              />
                              <p>{product.gia_sol || 0} SOL</p>
                            </div> */}
                          </div>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              addToCart(product);
                            }}
                            className={styles.addCart}
                          >
                            THÊM VÀO GIỎ HÀNG
                          </button>
                          {user === null && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                buyNow(product);
                              }}
                              className={styles.muangay}
                            >
                              MUA NGAY
                            </button>
                          )}
                          {user?.trang_thai_tk === false && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                buyNow(product);
                              }}
                              className={styles.muangay}
                            >
                              MUA NGAY
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <button onClick={handleViewMore} className={styles.viewMoreButton}>
            Xem Thêm
          </button>

          <div className={styles.pagination}>
            {getPaginationButtons(currentPage, totalPages).map(
              (button, index) =>
                button === "..." ? (
                  <span key={index} className={styles.ellipsis}>
                    ...
                  </span>
                ) : (
                  <button
                    key={button}
                    className={`${styles.pageButton} ${
                      currentPage === button ? styles.activePage : ""
                    }`}
                    onClick={() => handlePageChange(button)}
                    style={{ marginLeft: " 10px" }}
                  >
                    {button}
                  </button>
                )
            )}
          </div> */}

          <NotificationContainer />
        </section>

        <FooterUser />
      </div>
    </>
  );
};

export default HomeUserIndex;
