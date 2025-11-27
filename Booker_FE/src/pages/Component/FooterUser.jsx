// import styles from '../Home/HomeUser.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Component/Footer.module.css";
import {
  faFacebook,
  faFacebookMessenger,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const FooterUser = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerIntroduce}>
        <h3>NHÀ SÁCH TRỰC TUYẾN BOOKER.VN</h3>

        <p>
          <strong>Mua sách online</strong> tại nhà sách trực tuyến Booker.vn để
          được cập nhật nhanh nhất các tựa sách đủ thể loại với mức giảm 15 –
          35% cùng nhiều ưu đãi, quà tặng kèm. Qua nhiều năm, không chỉ là địa
          chỉ tin cậy để bạn mua sách trực tuyến, Booker còn có quà tặng, văn
          phòng phẩm, vật dụng gia đình,…với chất lượng đảm bảo, chủng loại đa
          dạng, chế độ bảo hành đầy đủ và giá cả hợp lý từ hàng trăm thương hiệu
          uy tín trong và ngoài nước. Đặc biệt, bạn có thể chọn những mẫu sổ tay
          handmade hay nhiều món quà tặng sinh nhật độc đáo chỉ có tại
          Booker.vn.
        </p>

        <p>
          <strong>Mua sách online</strong> tại nhà sách trực tuyến Booker.vn,
          bạn được tận hưởng chính sách hỗ trợ miễn phí đổi trả hàng, giao hàng
          nhanh – tận nơi – miễn phí*, thanh toán linh hoạt - an toàn, đặc biệt
          giảm thêm trên giá bán khi sử dụng BBxu giúp bạn mua sách online giá
          0đ!
        </p>

        <p>
          Chỉ với 3 cú click chuột, chưa bao giờ trải nghiệm mua sách online lại
          dễ chịu và nhẹ nhàng như vậy. Còn chần chờ gì nữa, đặt mua ngay những
          tựa sách hay cùng hàng ngàn sản phẩm chất lượng khác tại Booker.vn!
        </p>
      </div>
      {/* nhận bản tin */}
      <div className={styles.bantin}>
        <div className={styles.bantinImg}>
          <img src="/images/bantin.png" alt="Đăng kí nhận bản tin" />
        </div>
        <div className={styles.bantinText}>
          <h3>Đăng kí nhận bản tin</h3>
          <p>Đừng bỏ lỡ những tin nhắn ưu đãi độc quyền dành riêng cho bạn</p>
        </div>
        <div className={styles.bantinInp}>
          <input
            type="email"
            name=""
            id=""
            placeholder="Nhập địa chỉ email của bạn"
          />
          <button>Xác nhận</button>
        </div>
      </div>
      {/* Mục lục dịch vụ */}
      <div className={styles.footerContainer}>
        <div className={styles.footerColumn}>
          <h4>HỖ TRỢ KHÁCH HÀNG</h4>
          <ul>
            <li>Sản phẩm & Đơn hàng: 0933 109 009</li>
            <li>Kỹ thuật & Bảo hành: 0989 439 986</li>
            <li>Điện thoại: (028) 3820 7153 (giờ hành chính)</li>
            <li>Email: info@booker.vn</li>
            <li>Địa chỉ: 9 Lý Văn Phức, Tân Định, Q1, TP.HCM</li>
            <li>Sơ đồ đường đi</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>TRỢ GIÚP</h4>
          <ul>
            <li>Hướng dẫn mua hàng</li>
            <li>Phương thức thanh toán</li>
            <li>Phương thức vận chuyển</li>
            <li>Chính sách đổi - trả</li>
            <li>Chính sách bảo hành</li>
            <li>Câu hỏi thường gặp (FAQs)</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>TÀI KHOẢN CỦA BẠN</h4>
          <ul>
            <li>Cập nhật tài khoản</li>
            <li>Giỏ hàng</li>
            <li>Lịch sử giao dịch</li>
            <li>Sản phẩm yêu thích</li>
            <li>Kiểm tra đơn hàng</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>BOOKER</h4>
          <ul>
            <li>Giới thiệu Booker.vn</li>
            <li>Booker trên Facebook</li>
            <li>Liên hệ Booker</li>
            <li>Đặt hàng theo yêu cầu</li>
            <li>Tích lũy BBxu</li>
            <li>iBookStop.vn</li>
          </ul>
        </div>
      </div>

      {/* làm bạn với Booker */}
      <div className={styles.social}>
        <p>Làm bạn với Booker: </p>
        <FontAwesomeIcon icon={faFacebook} className={styles.iconSocial} />
        <FontAwesomeIcon
          icon={faFacebookMessenger}
          className={styles.iconSocial}
        />
        <FontAwesomeIcon icon={faInstagram} className={styles.iconSocial} />
        <FontAwesomeIcon icon={faXTwitter} className={styles.iconSocial} />
      </div>
    </footer>
  );
};
export default FooterUser;
