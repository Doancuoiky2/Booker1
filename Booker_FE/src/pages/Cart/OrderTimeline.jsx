import React, { useEffect, useState } from "react";
import "./order-timeline.css";
import { getAllLsTrangThaiDonHangByIdDhct } from "../../utils/API/LichSuTrangThaiGiaoHangAPI";

export default function OrderTimeline({ idDhct }) {
  const [lichSuTrangThais, setLichSuTrangThais] = useState([]);

  const trangThaiDefault = [
    {
      id: 0,
      status: "Trạng thái đơn hàng đang được cập nhật",
      message: "Hệ thống đang cập nhật trạng thái đơn hàng của bạn",
      createdAt: new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      active: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lichSuTrangThaiData = await getAllLsTrangThaiDonHangByIdDhct(
          idDhct
        );

        if (lichSuTrangThaiData && lichSuTrangThaiData.length > 0) {
          const newLichSuTrangThaiData = lichSuTrangThaiData.map(
            (item, index) => ({
              ...item,
              active: index === 0,
            })
          );
          setLichSuTrangThais(newLichSuTrangThaiData);
        } else {
          setLichSuTrangThais(trangThaiDefault);
        }

        console.log(lichSuTrangThaiData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng chi tiết:", error);
        setLichSuTrangThais(trangThaiDefault); // fallback luôn nếu lỗi
      }
    };
    fetchData();
  }, [idDhct]);

  return (
    <div className="timeline-wrapper">
      <h3>Đơn vị vận chuyển: Nhanh Express</h3>
      <ul className="timeline-list">
        {lichSuTrangThais?.map((it, idx) => (
          <li
            className={`timeline-item ${it.active ? "active" : ""}`}
            key={idx}
            style={{ zIndex: lichSuTrangThais.length - idx }}
          >
            <div className="timeline-left">
              <div className={`timeline-dot ${it.active ? "active" : ""}`} />
              {/* line nối giữa các dot */}
              {idx !== lichSuTrangThais.length - 1 && (
                <div className="timeline-connector"></div>
              )}
            </div>

            <div className="timeline-right">
              <div className="time">{it.createdAt}</div>
              <div className="status">{it.status}</div>
              <div className="message">{it.message}</div>
              {/* {it.extra && <div className="extra">{it.extra}</div>} */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
