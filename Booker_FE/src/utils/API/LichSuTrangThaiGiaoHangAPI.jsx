import axios from "axios";

const hostOrder = "http://localhost:8080/api/v1/lichsu_trangthai_donhang";

// Lấy tatá cả lịch sử trạng thái đơn hàng theo mã đơn hàng chi tiết
export const getAllLsTrangThaiDonHangByIdDhct = (idDhct) => {
  return axios
    .get(`${hostOrder}/find-all/${idDhct}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

// * Tạo lịch sử trạng thái giao hàng khi cập nhật trạng thái
export const postLichSuTrangThaiGiaoHang = (item) => {
  return axios
    .post(`${hostOrder}`, item)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};
