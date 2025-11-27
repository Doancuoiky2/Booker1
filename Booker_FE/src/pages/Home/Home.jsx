import { useEffect, useState } from "react";

import { countUp } from "../countUp";

import { getCuaHangById } from "../../utils/API/StoreAPI";
import {
  getMaxDaBanByMaCuaHang,
  getMinDaBanByMaCuaHang,
  getSanPhamByCuaHangId,
} from "../../utils/API/ProductAPI";
import { getVouchersByCuaHangId } from "../../utils/API/VoucherAPI";

import "./Home.css";

import StoreForm from "../../utils/FormVisible/StoreForm";
import ChuaDuyetCuaHang from "./ChuaDuyetCuaHang";
import Breadcrumb from "../../utils/Order/Breadcrumb";
import SalesAreaChart from "../../chart/SalesAreaChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faBook,
  faChartLine,
  faCheck,
  faPenToSquare,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import EarningChart from "../../chart/EarningChart";
import SimpleLineChart from "../../chart/SimpleLineChart";
import { countOrderDetailsByStatus } from "../../utils/API/OrderDetailsAPI";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [store, setStore] = useState({});

  // * ẩn hiện form chỉnh sửa thông tin cửa hàng
  const [isShowStore, setIsShowStore] = useState(false);
  const [diemCuaHang, setDiemCuaHang] = useState(0);

  const [choDuyet, setChoDuyet] = useState(false);
  const [huyDuyet, setHuyDuyet] = useState(false);
  const [khoa, setKhoa] = useState(false);
  const [yeuCauMoKhoa, setYeuCauMoKhoa] = useState(false);
  const [huyYeuCauMoKhoa, setHuyYeuCauMoKhoa] = useState(false);

  // count đơn hàng
  const [donMoi, setDonMoi] = useState(0);
  const [hoanThanh, setHoanThanh] = useState(0);
  const [daHuy, setDaHuy] = useState(0);
  const [sumDonHang, setSumDonHang] = useState(0);

  // lượt ban
  const [maxDaBan, setMaxDaBan] = useState(0);
  const [minDaBan, setMinDaBan] = useState(0);

  const handleShowStore = () => {
    setIsShowStore(true);
  };
  const handleCloseStore = () => {
    setIsShowStore(false);
  };

  // const handleUpdateDoanhThuCuaHang = async (doanhThu) => {
  //     const data =
  // }

  const fetchDataStore = async () => {
    try {
      const data = await getCuaHangById();
      setStore(data);
    } catch (error) {
      console.log("Lỗi khi tải cửa hàng: ", error);
    }
  };

  useEffect(() => {
    // * Hàm lấy doanh thu theo đơn hàng đã giao của cửa hàng
    const fetchData = async () => {
      try {
        const data = await getCuaHangById();
        setStore(data);

        const donMoiData = await countOrderDetailsByStatus(11);
        setDonMoi(donMoiData);
        const hoanThanhData = await countOrderDetailsByStatus(13);
        setHoanThanh(hoanThanhData);
        const khachHuyData = await countOrderDetailsByStatus(14);
        const cuaHangHuyData = await countOrderDetailsByStatus(16);
        setDaHuy(khachHuyData + cuaHangHuyData);
        const dangVanChuyenData = await countOrderDetailsByStatus(12);
        const traHangHoanTienData = await countOrderDetailsByStatus(15);
        const traHangHoanTienYesData = await countOrderDetailsByStatus(17);
        const traHangHoanTienNoData = await countOrderDetailsByStatus(18);
        setSumDonHang(
          donMoiData +
            hoanThanhData +
            khachHuyData +
            cuaHangHuyData +
            dangVanChuyenData +
            traHangHoanTienData +
            traHangHoanTienYesData +
            traHangHoanTienNoData
        );

        const maxDaBanData = await getMaxDaBanByMaCuaHang();
        const minDaBanData = await getMinDaBanByMaCuaHang();
        setMaxDaBan(maxDaBanData);
        setMinDaBan(minDaBanData);

        if (data.trang_thai_cua_hang?.ma_trang_thai_cua_hang === 11) {
          setChoDuyet(true);
        } else if (data.trang_thai_cua_hang?.ma_trang_thai_cua_hang === 12) {
          setHuyDuyet(true);
        } else if (data.trang_thai_cua_hang?.ma_trang_thai_cua_hang === 14) {
          setKhoa(true);
        } else if (data.trang_thai_cua_hang?.ma_trang_thai_cua_hang === 15) {
          setYeuCauMoKhoa(true);
        } else if (data.trang_thai_cua_hang?.ma_trang_thai_cua_hang === 16) {
          setHuyYeuCauMoKhoa(true);
        }

        const numberDanhGia = data.diem_cua_hang
          ? Math.round(data.diem_cua_hang * 10) / 10
          : 0;

        setDiemCuaHang(numberDanhGia);
        countUp("countdt", 0, data.doanh_thu, 1200);
        countUp("countlb", 0, data.tong_luot_ban, 1200);

        const demSanPham = await getSanPhamByCuaHangId();
        setProducts(demSanPham); // Đặt giá trị sản phẩm sau khi lấy dữ liệu
        countUp("countsp", 0, demSanPham.length, 1200);
        countUp("countsp2", 0, demSanPham.length, 1200);

        const demVoucher = await getVouchersByCuaHangId();
        setVouchers(demVoucher);
        countUp("countvc", 0, demVoucher.length, 1200);
        countUp("countvc2", 0, demVoucher.length, 1200);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

    return () => {
      // Dọn dẹp tất cả các phần tử đã sử dụng trong countUp
      const ids = ["countlb", "countsp", "countvc", "countdt"];
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          element.innerText = ""; // Reset giá trị nếu cần thiết
        }
      });
    };
  }, []);

  return (
    <div className="pageMyStore">
      <div className="pageHead">
        <h3>Thông tin cửa hàng</h3>
        <Breadcrumb paths={["Thông tin cửa hàng"]} />
      </div>
      <div className="formHeadInfo">
        <div className="infoOfStore">
          <div className="infoOfStore-item1">
            <p id="countlb"></p>
            <h3>Số lượt bán</h3>
            <span>Tổng số lượt bán của cửa hàng.</span>
            <SalesAreaChart status={true} />
            <div className="infoOfStore_footer">
              <div className="infoOfStore_footer-item">
                <span>{maxDaBan}</span>
                <p>Lượt bán cao nhất</p>
              </div>
              <div className="infoOfStore_footer-item">
                <span>{minDaBan}</span>
                <p>Lượt bán thấp nhất</p>
              </div>
              {/* <div className="infoOfStore_footer-item">
                <span>10</span>
                <p>Hủy đơn</p>
              </div> */}
            </div>
          </div>
          <div className="infoOfStore-item2">
            <p id="">{sumDonHang ? sumDonHang : 0}</p>
            <h3>Số lượng đơn hàng</h3>
            <span>Tổng số lượng đơn hàng đã được thống kê. </span>
            <SalesAreaChart status={false} />
            <div className="infoOfStore_footer2">
              <div className="infoOfStore_footer-item">
                <span>{donMoi}</span>
                <p>Đơn mới</p>
              </div>
              <div className="infoOfStore_footer-item">
                <span>{hoanThanh}</span>
                <p>Hoàn thành</p>
              </div>
              <div className="infoOfStore_footer-item">
                <span>{daHuy}</span>
                <p>Hủy đơn</p>
              </div>
            </div>
          </div>

          <div className="infoOfStore-item-small">
            <div className="infoOfStore-item-small_form">
              <div className="infoOfStore-item-small_form__head">
                <div>
                  <p className="numberInfo1" id="countdt"></p>
                  <span>Doanh thu</span>
                </div>
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="infoOfStore-item-small_form__headIcon"
                />
              </div>
              <div className="infoOfStore-item-small_form__food foodColor1">
                <p>10% thay đổi</p>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>

            <div className="infoOfStore-item-small_form mt-20">
              <div className="infoOfStore-item-small_form__head">
                <div>
                  <p className="numberInfo2">{diemCuaHang} / 5</p>
                  <span>Điểm cửa hàng</span>
                </div>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="infoOfStore-item-small_form__headIcon"
                />
              </div>
              <div className="infoOfStore-item-small_form__food foodColor2">
                <p>10% thay đổi</p>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>
          </div>

          <div className="infoOfStore-item-small">
            <div className="infoOfStore-item-small_form">
              <div className="infoOfStore-item-small_form__head">
                <div>
                  <p id="countsp" className="numberInfo3"></p>
                  <span>Sản phẩm</span>
                </div>
                <FontAwesomeIcon
                  icon={faBook}
                  className="infoOfStore-item-small_form__headIcon"
                />
              </div>
              <div className="infoOfStore-item-small_form__food foodColor3">
                <p>10% thay đổi</p>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>

            <div className="infoOfStore-item-small_form mt-20">
              <div className="infoOfStore-item-small_form__head">
                <div>
                  <p id="countvc" className="numberInfo4"></p>
                  <span>Voucher</span>
                </div>
                <FontAwesomeIcon
                  icon={faTicket}
                  className="infoOfStore-item-small_form__headIcon"
                />
              </div>
              <div className="infoOfStore-item-small_form__food foodColor4">
                <p>10% thay đổi</p>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="info-basicForm">
          <div className="info-basic">
            <div className="info-store">
              <img
                src={`${
                  store.anh_bia ? store.anh_bia : "/images/bia_default.jpg"
                }`}
                alt="Ảnh bìa"
              />
              <div className="info-store_detail">
                <div className="info-store_avatar">
                  <img
                    src={`${
                      store.anh_dai_dien
                        ? store.anh_dai_dien
                        : "/images/avt_default.png"
                    }`}
                    alt="Ảnh đại diện cửa hàng"
                  />
                  <p>My store</p>
                </div>
                <div className="info-store_name">
                  <h1>{store.ten_cua_hang}</h1>
                  <p>{store.dia_chi_cua_hang}</p>
                </div>
              </div>
              <div onClick={handleShowStore} className="info-store_icon">
                <div className="info-store_icon--layout2">
                  <FontAwesomeIcon
                    className="faCheck"
                    icon={faPenToSquare}
                  ></FontAwesomeIcon>
                </div>
              </div>
            </div>

            <div className="chartSmall-info">
              <div className="chartSmall-infoItem">
                <div className="chartSmall-infoItem_head">
                  <h1 id="countsp2"></h1>
                  <p>Sản phẩm</p>
                </div>
                <SimpleLineChart status={true} />
              </div>

              <div className="chartSmall-infoItem">
                <div className="chartSmall-infoItem_head">
                  <h1 id="countvc2"></h1>
                  <p>Voucher</p>
                </div>
                <SimpleLineChart status={false} />
              </div>
            </div>

            {/* <div>
              <StoreRating />
            </div> */}
          </div>
          <div className="chart-doanhThu">
            <EarningChart />
          </div>
        </div>

        {choDuyet === true && (
          <ChuaDuyetCuaHang
            text1={"Yêu cầu mở cửa hàng của bạn đang được hệ thống xử lý."}
            text2={"Cảm ơn bạn đã quan tâm đến Booker"}
          />
        )}
        {huyDuyet === true && (
          <ChuaDuyetCuaHang
            text1={
              "Rất tiếc! Yêu cầu tạo cửa hàng của bạn không được hệ thống chấp nhận do thông tin cửa hàng không hợp lệ"
            }
            text2={
              "Bạn có thể nhấn vào nút bên dưới để gửi lại yêu cầu tạo cửa hàng."
            }
            keyBtnDuyet={true}
          />
        )}
        {khoa === true && (
          <ChuaDuyetCuaHang
            text1={
              "Do điểm vi phạm cửa hàng của bạn quá cao, cho nên chúng tôi đã khóa cửa hàng của bạn."
            }
            text2={
              "Bạn có thể gửi yêu cầu mở khóa đến hệ thống khi nhấn vào nút bên dưới"
            }
            keyBtnKhoa={true}
          />
        )}
        {yeuCauMoKhoa === true && (
          <ChuaDuyetCuaHang
            text1={"Yêu cầu mở khóa cửa hàng đang được xử lý."}
          />
        )}
        {huyYeuCauMoKhoa === true && (
          <ChuaDuyetCuaHang
            text1={
              "Rất tiếc! Nhận thấy việc cửa hàng của bạn vi phạm điều khoản của chúng tôi, chúng tôi không thể chấp nhận yêu cầu mở khóa cửa hàng của bạn."
            }
          />
        )}

        {isShowStore === true && (
          <StoreForm
            onClose={handleCloseStore}
            storeData={store}
            onReload={fetchDataStore}
          />
        )}

        {/* <div className="chart">
                    <TickPlacement className="chart-w" />
                    <ApexChart />
                </div> */}
      </div>

      {/* <div>
                <NotificationUI
                    type="success"
                    title="Task Completed"
                    description="Your task has been completed successfully."
                    keyPage={"managerPage"}
                />
            </div> */}
    </div>
  );
};

export default Home;
