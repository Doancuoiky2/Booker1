import React, { useEffect, useState } from "react";

import "./TransactionHistory.css";
import ListTransaction from "../../utils/ManageListUI/ListTransaction";
import {
  addTaiKhoanNganHang,
  getAllBank,
  getTaiKhoanNganHangByStore,
  updateTaiKhoanNganHang,
} from "../../utils/API/BankAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

import { getCuaHangById, updateCuaHang } from "../../utils/API/StoreAPI";
import {
  addGiaoDich,
  createQRCode,
  getAllGiaoDichByStore,
  getAllGiaoDichByStoreLength,
  getGiaoDichByCuaHangAndTrangThai,
  getGiaoDichByCuaHangAndTrangThaiLength,
} from "../../utils/API/GiaoDichAPI";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Breadcrumb from "../../utils/Order/Breadcrumb";
import { CiMoneyCheck1 } from "react-icons/ci";
import { TbReportMoney } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdMoneyOff } from "react-icons/md";

const TransactionHistory = () => {
  const [giaoDichByStore, setGiaoDichByStore] = useState([]);

  // * Tài khoản ngân hàng của tôi
  // const [myBankAccount, setMyBankAccount] = useState({});

  const [bankList, setBankList] = useState([]);

  const [store, setStore] = useState({});
  // * lưu thông tin ngân hàng
  const [bankInfo, setBankInfo] = useState({});

  const [code, setCode] = useState("");
  const [cardNumber, setCardNumber] = useState("Chưa có thông tin");
  const [accountNameInput, setAccountNameInput] = useState("");
  // const [iconBank, setIconBank] = useState('');
  const [isForm, setIsForm] = useState(false);

  // * lưu thông tin giao dịch
  // const [giaoDich, setGiaoDich] = useState({});

  const [allGiaoDich, setAllGiaoDich] = useState(0);
  const [giaoDichCho, setGiaoDichCho] = useState(0);
  const [giaoDichDuyet, setGiaoDichDuyet] = useState(0);
  const [giaoDichHuy, setGiaoDichHuy] = useState(0);

  const [money, setMoney] = useState("");
  const [larger10k, setLarger10k] = useState(false);

  // * check tài khoản
  const [checkResult, setCheckResult] = useState("Chưa có tài khoản");

  const handleClickChangeForm = () => {
    setIsForm(!isForm);
  };

  const [eye, setEye] = useState(false);
  const handleToggleEye = () => {
    setEye(!eye);
  };

  const [textRutTien, setTextRutTien] = useState(false);
  // * nhập tiền cần rút
  const handleCardNumberChangeMoney = (event) => {
    // Lọc chỉ giữ số
    const onlyNumbers = event.target.value.replace(/\D/g, "");

    if (onlyNumbers <= store.doanh_thu) {
      setMoney(onlyNumbers);
      setTextRutTien(false);
    } else if (larger10k < 10000) {
      setLarger10k(true);
    } else {
      setMoney(onlyNumbers);
      setTextRutTien(true);
      setLarger10k(false);
    }
  };

  // * Số tài khoản ngân hàng
  const handleCardNumberChange = (event) => {
    const input = event.target.value.replace(/\D/g, "");
    setCardNumber(input);
    setBankInfo((prevBank) => ({
      ...prevBank,
      accountNo: input,
    }));
  };
  const handleAccountNameChange = (event) => {
    const input = event.target.value;
    setAccountNameInput(input);
    setBankInfo((prevBank) => ({
      ...prevBank,
      account_name: input,
    }));
  };

  // * Lấy ra thông tin của ngân hàng
  const handleSelectChange = (event) => {
    const selectedBin = event.target.value;
    const selectedBank = bankList.find((bank) => bank.bin === selectedBin);
    if (selectedBank) {
      setBankInfo({
        ...bankInfo,
        acqId: selectedBank.bin,
        addInfo: `Rút tiền - ${store.ma_cua_hang} - ${store.ten_cua_hang}`,
        fomat: "text",
        template: "compact2",
        nameBank: selectedBank.name,
        short_name: selectedBank.short_name,
        code: selectedBank.code,
        icon_url: selectedBank.logo,
        cua_hang: store,
      });
      setCode(selectedBank.code);
    } else {
      //   setCode("");
      console.log("null");
    }
  };

  // * Kiểm tra tài khoản ngân hàng khi nhấn nút
  const handleSaveAccountInfo = async (key) => {
    try {
      const finalCode = code || bankInfo.code;
      const finalCardNumber = cardNumber || bankInfo.account_number;
      const finalAccountName = accountNameInput || bankInfo.account_name;

      // Kiểm tra nếu tất cả đều rỗng
      if (!finalCode || !finalCardNumber || !finalAccountName) {
        NotificationManager.error(
          "Thiếu thông tin",
          "Vui lòng nhập đủ các trường"
        );
        return;
      }

      // Cập nhật thông tin vào state
      const info = {
        ...bankInfo,
        code: finalCode,
        account_no: finalCardNumber,
        account_name: finalAccountName,
      };

      // Thêm hoặc cập nhật
      if (key === "add") {
        await handleAddBankAccount(info);
        NotificationManager.success(
          "Thành công",
          "Đã thêm tài khoản ngân hàng"
        );
      } else {
        await handleUpdateBankAccount(info);
        NotificationManager.success(
          "Thành công",
          "Đã cập nhật tài khoản ngân hàng"
        );
      }
    } catch (error) {
      NotificationManager.error("Thất bại", "Có lỗi xảy ra khi lưu thông tin");
    }
  };

  //   const handleSaveAccountInfo = async (key) => {
  //     try {
  //       const response = await axios.post(
  //         "https://api.httzip.com/api/bank/id-lookup-prod",
  //         {
  //           bank: code,
  //           account: cardNumber,
  //         },
  //         {
  //           headers: {
  //             "x-api-key": "85f58718-56a1-46d7-b7d9-af9e1cc32a53key",
  //             "x-api-secret": "68a8b830-839b-4b82-8c9c-574718c48f6bsecret",
  //             // 'Content-Type': 'application/json'
  //           },
  //         }
  //       );

  //       if (
  //         response &&
  //         response.data &&
  //         response.data.data &&
  //         response.data.data.ownerName
  //       ) {
  //         // Cập nhật thông tin tài khoản vào bankInfo
  //         setBankInfo((prevBank) => ({
  //           ...prevBank,
  //           account_name: response.data.data.ownerName,
  //         }));
  //         setCheckResult(response.data.data.ownerName);
  //         // setNotificationStatus('searchIsSuccess');
  //         NotificationManager.success("Hợp lệ", "Tài khoản ngân hàng");

  //         // Gọi hàm thêm tài khoản ngân hàng sau khi có kết quả tìm kiếm
  //         if (key === "add") {
  //           handleAddBankAccount({
  //             ...bankInfo,
  //             account_name: response.data.data.ownerName,
  //           });
  //         } else if (key === "update") {
  //           handleUpdateBankAccount({
  //             ...bankInfo,
  //             account_name: response.data.data.ownerName,
  //           });
  //         }
  //       } else {
  //         setCheckResult("Không tìm thấy tài khoản");
  //         // setNotificationStatus('searchIsFail');
  //         NotificationManager.error("Thất bại", "Không tìm thấy tài khoản");
  //       }
  //     } catch (error) {
  //       console.error("Error checking bank account:", error);
  //       setCheckResult("Không tìm thấy tài khoản");
  //       NotificationManager.error("Thất bại", "Không tìm thấy tài khoản");
  //       // setNotificationStatus('searchIsFail');
  //     }
  //   };

  // * Hàm thêm tài khoản ngân hàng mới
  const handleAddBankAccount = async (data) => {
    try {
      const account = await addTaiKhoanNganHang(data);
      if (account) {
        setBankInfo(account);
        // setNotificationStatus('addIsSuccess');
        fetchData(); // Reload sau khi thêm thành công
      }
    } catch (e) {
      // setNotificationStatus('addIsFail');
      NotificationManager.error("Thất bại", "Thêm tài khoản ngân hàng");
      console.error("Error adding bank account:", e);
    }
  };

  // * Hàm cập nhật tài khoản ngân hàng mới
  const handleUpdateBankAccount = async (data) => {
    try {
      const account = await updateTaiKhoanNganHang(data);
      if (account) {
        setBankInfo(account);
        // setNotificationStatus('addIsSuccess');
        fetchData(); // Reload sau khi thêm thành công
      }
    } catch (e) {
      // setNotificationStatus('addIsFail');
      NotificationManager.error("Thất bại", "Cập nhật tài khoản ngân hàng");
      console.error("Error adding bank account:", e);
    }
  };

  // * Hàm tạo dữ liệu và QR code
  const handleCreateQRCode = async (data) => {
    if (data && money >= 10000) {
      // Kiểm tra data và money
      const qrCode = {
        accountNo: data.accountNo,
        accountName: data.account_name,
        acqId: data.acqId,
        amount: money,
        addInfo: data.addInfo,
        format: data.fomat,
        template: data.template,
      };
      const updatedDoanhThu = store.doanh_thu - money;
      const dataUpdate = { ...store, doanh_thu: updatedDoanhThu };

      try {
        const qrDataURL = await createQRCode(qrCode);
        handleAddGiaoDich(qrDataURL.data.qrDataURL, data);
        handleTruDoanhThuCuaHang(dataUpdate);
        // setNotificationStatus('giaoDichIsSuccess');
        NotificationManager.success("Thành công", "Tạo giao dịch rút tiền");
        fetchData();
        setMoney("");
        setLarger10k(false)
      } catch (error) {
        // setNotificationStatus('giaoDichIsFail');
        NotificationManager.error("Tạo giao dịch rút tiền thất bại");
        console.error("Lỗi khi tạo QR Code:", error);
      }
    } else {
      setLarger10k(true);
      NotificationManager.error("Số tiền không hợp lệ");
    }
  };

  // * Hàm thêm giao dịch vào database
  const handleAddGiaoDich = async (qrData, dataGiaoDich) => {
    if (dataGiaoDich && money) {
      const giaoDichMoi = {
        so_tien: money,
        trang_thai: 0,
        anh_qr: qrData,
        mo_ta: dataGiaoDich.addInfo,
        cua_hang: store,
      };

      try {
        const response = await addGiaoDich(giaoDichMoi);
        // setGiaoDich(response);
      } catch (error) {
        console.error("Lỗi khi thêm giao dịch:", error);
      }
    } else {
      console.warn("Thiếu dữ liệu giao dịch hoặc số tiền không hợp lệ");
    }
  };

  // * Hàm trừ doanh thu của cửa hàng khi rút tiền
  const handleTruDoanhThuCuaHang = async (dataUpdate) => {
    try {
      const storeDataUpdate = await updateCuaHang(dataUpdate);
      if (storeDataUpdate) {
        setStore(storeDataUpdate);
      }
    } catch (e) {
      console.error("Lỗi khi update doanh thu:", e);
    }
  };

  // * giao dịch all
  const handleGetGiaoDichStore = async () => {
    try {
      const data = await getAllGiaoDichByStore();
      setGiaoDichByStore(data);
    } catch (e) {
      console.log(e);
    }
  };

  // * list giao dịch theo trạng thái
  const handleGetGiaoDichTrangThaiStore = async (trangThai) => {
    try {
      const data = await getGiaoDichByCuaHangAndTrangThai(trangThai);
      setGiaoDichByStore(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    try {
      const myBank = await getTaiKhoanNganHangByStore();
      setBankInfo(myBank);
      if (myBank) {
        setIsForm(true);
      }

      const data = await getAllBank();
      setBankList(data);

      const storeData = await getCuaHangById();
      setStore(storeData);

      const allGiaoDichLength = await getAllGiaoDichByStoreLength();
      setAllGiaoDich(allGiaoDichLength);
      const choLength = await getGiaoDichByCuaHangAndTrangThaiLength(0);
      setGiaoDichCho(choLength);
      const duyetLength = await getGiaoDichByCuaHangAndTrangThaiLength(1);
      setGiaoDichDuyet(duyetLength);
      const huyLength = await getGiaoDichByCuaHangAndTrangThaiLength(2);
      setGiaoDichHuy(huyLength);

      const dataGiaoDich = await getAllGiaoDichByStore();
      setGiaoDichByStore(dataGiaoDich);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="pageHead">
        <h3>Rút tiền</h3>
        <Breadcrumb paths={["Rút tiền"]} />
      </div>
      <div className="containerProduct">
        <div className="nganhang">
          <div className="credit-card">
            <div className="credit-card-bg">
              <img src="/images/betabg.svg" alt="bg" />
            </div>
            <div className="credit-card-card">
              <img src="../images/cardmaster.png" alt="creditcard" />

              <div className="credit-card-card_item2">
                {bankInfo && (
                  <img
                    className="credit-card-card_item2_img"
                    src={bankInfo.icon_url}
                    alt={bankInfo.nameBank}
                  />
                )}
                <h1>{bankInfo.short_name || ""}</h1>
              </div>
              <div className="credit-card-card_item3">
                <p>{bankInfo.account_name || accountNameInput}</p>
              </div>
              <div className="credit-card-card_item">
                <p>SỐ TÀI KHOẢN</p>
                <h2>{bankInfo ? bankInfo.accountNo : "************"}</h2>
              </div>
            </div>

            <div
              className={`cash-button ${isForm ? "cash-button-update" : ""}`}
              onClick={handleClickChangeForm}
            >
              {isForm === true ? (
                <>
                  <FontAwesomeIcon
                    className="cash-button-icon"
                    icon={faCreditCard}
                  ></FontAwesomeIcon>
                  <h3>Card</h3>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    className="cash-button-icon"
                    icon={faSackDollar}
                  ></FontAwesomeIcon>
                  <h3>Rút tiền</h3>
                </>
              )}
            </div>

            {isForm === true ? (
              <div className="form-card">
                <div className="credit-card-info-title credit-card-info-title_rutTien">
                  <h2>Rút tiền về tài khoản</h2>
                </div>

                <div className="credit-card-info credit-card-info_rutTien">
                  <div className="my_cash" onClick={handleToggleEye}>
                    {eye ? (
                      <h2>
                        {" "}
                        Số dư:{" "}
                        {store.doanh_thu
                          ? store.doanh_thu.toLocaleString("vi-VN")
                          : 0}{" "}
                        VNĐ
                      </h2>
                    ) : (
                      <h2>
                        {" "}
                        Số dư: <strong>*******</strong> VNĐ
                      </h2>
                    )}

                    {/* <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> */}
                  </div>
                  <div className="credit-card-info_item credit-card-info_item_update">
                    <label>SỐ TIỀN CẦN RÚT</label>
                    <input
                      className="item-number-card"
                      style={{ textAlign: "center" }}
                      type="text"
                      value={money}
                      onChange={handleCardNumberChangeMoney}
                      maxLength={10} //
                    />
                    <label className="vnd-css">VNĐ</label>
                    {textRutTien ? (
                      <p className="err-text">Số dư của bạn không đủ!</p>
                    ) : (
                      <></>
                    )}
                    {larger10k ? (
                      <p className="err-text">
                        Số tiền cần rút phải lớn hơn 10.000đ
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    className="credit-card-info_item credit-card-info_item_flex"
                    style={{ marginTop: "30px" }}
                  >
                    <input
                      id="my-card"
                      className="radio-number-card"
                      type="radio"
                      checked={bankInfo ? true : false}
                    />
                    <label htmlFor="my-card">Số tài khoản của tôi</label>
                  </div>
                  {/* <p className='radio-number-card_err'>Bạn chưa có tài khoản nhận tiền. <span>Hãy tạo ngay</span></p> */}
                </div>
                <div className="credit-card-info-save credit-card-info-save_cash">
                  {textRutTien ? (
                    <button>RÚT TIỀN</button>
                  ) : (
                    <button onClick={() => handleCreateQRCode(bankInfo)}>
                      RÚT TIỀN
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="form-card">
                <div className="credit-card-info-title">
                  <h2>Điền thông tin tài khoản</h2>
                </div>
                <div className="credit-card-info">
                  <div className="credit-card-info_item">
                    <label>TÊN NGÂN HÀNG</label>
                    <select
                      value={bankInfo.acqId || ""}
                      onChange={handleSelectChange}
                    >
                      <option value="">Chọn ngân hàng của bạn</option>
                      {bankList.map((bank) => (
                        <option key={bank.id} value={bank.bin}>
                          {bank.code} - {bank.short_name} - {bank.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className="credit-card-info_item "
                    style={{ marginTop: "20px" }}
                  >
                    <label>TÊN THẺ</label>
                    <input
                      className="item-number-card"
                      style={{ textAlign: "center" }}
                      type="text"
                      value={bankInfo.account_name || ""}
                      onChange={handleAccountNameChange}
                      maxLength={19}
                    />
                  </div>

                  <div
                    className="credit-card-info_item "
                    style={{ marginTop: "20px" }}
                  >
                    <label>SỐ TÀI KHOẢN</label>
                    <input
                      className="item-number-card"
                      style={{ textAlign: "center" }}
                      type="text"
                      value={bankInfo.accountNo || ""}
                      onChange={handleCardNumberChange}
                      maxLength={19} // Maximum length for 'xxxx xxxx xxxx xxxx'
                      //   placeholder="************"
                    />
                  </div>
                </div>

                {bankInfo ? (
                  <div className="credit-card-info-save">
                    <button onClick={() => handleSaveAccountInfo("update")}>
                      Cập nhật tài khoản mới
                    </button>
                  </div>
                ) : (
                  <div className="credit-card-info-save">
                    <button onClick={() => handleSaveAccountInfo("add")}>
                      Lưu thông tin tài khoản
                    </button>
                  </div>
                )}

                {/* Hiển thị kết quả kiểm tra tài khoản */}
                {/* {checkResult && ( */}

                {/* )} */}
              </div>
            )}
          </div>
          <div className="history"></div>
        </div>

        <div className="productbtn-list" style={{ marginTop: "30px" }}>
          <div className="productbtn-item productbtn-item_updateInfo2">
            <div className="productbtn-item_flex">
              <button className=" btn1" onClick={handleGetGiaoDichStore}>
                <CiMoneyCheck1 size={33} color="#fff" />
              </button>
              <div className="productbtn-itemInfo">
                <h1>{allGiaoDich}</h1>
              </div>
            </div>
            <div className="productbtn-item_name">
              <p>Tất cả giao dịch</p>
            </div>
          </div>

          <div className="productbtn-item productbtn-item_updateInfo2">
            <div className="productbtn-item_flex">
              <button
                className=" btn3"
                onClick={() => handleGetGiaoDichTrangThaiStore(0)}
              >
                <TbReportMoney size={33} color="#fff" />
              </button>
              <div className="productbtn-itemInfo">
                <h1>{giaoDichCho}</h1>
              </div>
            </div>
            <div className="productbtn-item_name">
              <p>Giao dịch đang xử lý</p>
            </div>
          </div>

          <div className="productbtn-item productbtn-item_updateInfo2">
            <div className="productbtn-item_flex">
              <button
                className=" btn4"
                onClick={() => handleGetGiaoDichTrangThaiStore(1)}
              >
                <GiTakeMyMoney size={33} color="#fff" />
              </button>
              <div className="productbtn-itemInfo">
                <h1>{giaoDichDuyet}</h1>
              </div>
            </div>
            <div className="productbtn-item_name">
              <p>Giao dịch thành công</p>
            </div>
          </div>

          <div className="productbtn-item productbtn-item_updateInfo2">
            <div className="productbtn-item_flex">
              <button
                className=" btn5"
                onClick={() => handleGetGiaoDichTrangThaiStore(2)}
              >
                <MdMoneyOff size={33} color="#fff" />
              </button>
              <div className="productbtn-itemInfo">
                <h1>{giaoDichHuy}</h1>
              </div>
            </div>
            <div className="productbtn-item_name">
              <p>Giao dịch thất bại</p>
            </div>
          </div>
        </div>

        <div>
          <ListTransaction listBooks={giaoDichByStore} onReload={fetchData} />
        </div>

        <NotificationContainer />
      </div>
    </div>
  );
};

export default TransactionHistory;
