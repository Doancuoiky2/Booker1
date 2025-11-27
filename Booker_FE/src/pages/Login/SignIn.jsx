import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Login = () => {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [error, setError] = useState("");
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();

  const handleEye = () => {
    setEye(!eye);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    try {
      const response = await axios.post(
        "http://localhost:8080/api/taikhoan/login",
        {
          email,
          mat_khau: matKhau,
        }
      );

      if (response.data.message === "Đăng nhập thành công") {
        // Lưu thông tin người dùng vào localStorage nếu cần
        sessionStorage.setItem("user", JSON.stringify(response.data.result));
        sessionStorage.setItem(
          "id_tai_khoan",
          response.data.result.id_tai_khoan
        );

        console.log(response.data.result.vai_tro.ma_vai_tro);

        // Chuyển hướng đến trang /HomeUser sau khi đăng nhập thành công
        navigate("/booker.vn");
        if (response.data.result.vai_tro.ma_vai_tro === 3) {
          navigate("/admin");
        }
        NotificationManager.success("Đăng nhập thành công", "");
      } else {
        setError(response.data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi đăng nhập");
      console.error("Lỗi đăng nhập:", err);
    }
  };

  return (
    <div>
      {/* <HeaderUser /> */}

      <section className="bgSignin">
        <div className="boxCenter">
          <div className="login-container">
            <h2 className="login-title">Đăng nhập</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="login-input_eye">
                <input
                  type={eye ? "text" : "password"}
                  placeholder="Mật khẩu"
                  className="login-input"
                  value={matKhau}
                  onChange={(e) => setMatKhau(e.target.value)}
                />
                {eye === false ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="login-input_eyeicon"
                    onClick={handleEye}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="login-input_eyeicon"
                    onClick={handleEye}
                  />
                )}
              </div>

              <button type="submit" className="login-button">
                Đăng nhập
              </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            <div className="forgot-password">
              <Link to="/forgot-password">
                <p>Quên mật khẩu</p>
              </Link>
              <Link to="/booker.vn">
                <p>Quay lại trang chủ</p>
              </Link>
            </div>
            <div className="login-register-link">
              Chưa có tài khoản?{" "}
              <Link to="/register">
                <span>Đăng ký tại đây</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <FooterUser /> */}
      <NotificationContainer />
    </div>
  );
};

export default Login;
