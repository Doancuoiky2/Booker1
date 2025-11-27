import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getCuaHangById } from "../utils/API/StoreAPI";
import { StoreApi } from "../StoreId";

import "./ChatStyle.css";
import "../utils/FormVisible/FormResponsive.css";
import { getCustomerById } from "../utils/API/CustomerAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "../utils/Order/Breadcrumb";

const socket = io("http://localhost:4000"); // Kết nối với backend

const SellerChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentBuyer, setCurrentBuyer] = useState(null); // Người mua hiện tại
  const [listSender, setListSender] = useState([]);
  const [store, setStore] = useState({});
  const [storeID, setStoreID] = useState(null);
  const [lastMessages, setLastMessages] = useState({});

  const handleClickBuyer = (buyerId) => {
    setCurrentBuyer(buyerId);
    // console.log(buyerId);
    const senderId = `CH${storeID}`; // ID cửa hàng
    const receiverId = buyerId; // ID người mua
    // Tạo chatKey theo định dạng 'sender_receiver'
    const chatKey = [senderId, receiverId].sort().join("_");
    // console.log(chatKey);

    const fetchMessages = async () => {
      try {
        const responseMessages = await fetch(
          `http://localhost:4000/api/messages/${chatKey}`
        );
        const messagesData = await responseMessages.json();
        setMessages(messagesData);
        // console.log(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // socket.on('receiveMessage', (data) => {
    //     console.log('Message received:', data);
    //     if (data.chatKey === chatKey) {
    //         setMessages((prev) => [...prev, data]);
    //     }
    // });

    // return () => {
    //     socket.off('receiveMessage');
    // };
  };

  const sendMessage = () => {
    if (message.trim() && currentBuyer) {
      const senderId = `CH${store.ma_cua_hang}`; // ID của cửa hàng
      const receiverId = currentBuyer;
      const chatKey = [senderId, receiverId].sort().join("_");

      const data = {
        sender: senderId, // ID của cửa hàng
        receiver: receiverId, // ID của người mua
        content: message, // Nội dung tin nhắn
        nameSender: store.ten_cua_hang,
        image: store.anh_dai_dien,
        chatKey: chatKey, // Thêm chatKey vào dữ liệu
      };

      console.log("Sending message:", data);
      socket.emit("sendMessage", data);
      // setMessages((prevMessages) => [...prevMessages, data]);
      setMessage(""); // Reset input sau khi gửi
    } else {
      console.error("Error: Missing receiver or content");
    }
  };

  // useEffect(() => {
  //     // Đăng ký sự kiện nhận tin nhắn
  //     socket.on('receiveMessage', (newMessage) => {
  //         setListSender((prevMessages) => [...prevMessages, newMessage]);
  //     });

  //     // Hủy bỏ listener khi component unmount
  //     return () => {
  //         socket.off('receiveMessage');
  //     };
  // }, []);

  //   lấy đoạn tin nhắn cuối cùng của ng mua
  //   const lastBuyerMessage = [...messages]
  //     .filter((msg) => msg.sender !== `CH${storeID}`)
  //     .pop();

  const fetchData = async () => {
    try {
      const storeId = await StoreApi();
      setStoreID(storeId);
      const receiverIdData = `CH${storeId}`;
      const responseSender = await fetch(
        `http://localhost:4000/api/messages/manager-store/${receiverIdData}`
      );
      const senderData = await responseSender.json();
      setListSender(senderData);

      const storeData = await getCuaHangById();
      setStore(storeData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    // hiển thị tin nhắn cuối

    // Đăng ký sự kiện nhận tin nhắn một lần
    socket.on("receiveMessage", (newMessage) => {
      console.log("Message received:", newMessage);
      setMessages((prevMessages) => {
        // Kiểm tra xem tin nhắn đã tồn tại chưa
        const exists = prevMessages.some((msg) => msg._id === newMessage._id); // _id là ID tin nhắn
        return exists ? prevMessages : [...prevMessages, newMessage];
      });
    });

    return () => {
      // Hủy listener khi component bị unmount
      socket.off("receiveMessage");
    };
  }, []); // Chạy một lần khi component mount

  useEffect(() => {
    const grouped = {};
    messages.forEach((msg) => {
      const key = msg.storeID || storeID;
      if (msg.sender !== `CH${key}`) {
        grouped[key] = msg;
      }
    });
    setLastMessages(grouped);
  }, [messages, storeID]);

  return (
    <div className="page">
      <div className="pageHead">
        <h3>Hỗ Trợ Khách Hàng</h3>
        <Breadcrumb paths={["Hỗ trợ khách hàng"]} />
      </div>
      <div className="containerProduct">
        <div>
          <div
            className="chatForm"
            style={{ display: "flex", border: "1px solid #ccc" }}
          >
            {/* Danh sách người mua */}
            <div
              style={{
                width: "25%",
                borderRight: "1px solid #e8ecfdff",
                padding: "10px",
                backgroundColor: "#f6f7fb",
              }}
            >
              <input className="chatForm_input" placeholder="Tìm kiếm ..." />
              {[
                ...new Map(
                  listSender
                    .filter((msg) => msg.sender !== `CH${storeID}`)
                    .map((msg) => [
                      msg.sender,
                      {
                        sender: msg.sender,
                        nameSender: msg.nameSender,
                        image: msg.image,
                      },
                    ]) // Tạo map với key là sender
                ).values(),
              ] // Lấy giá trị duy nhất
                .map(({ sender, nameSender, image }, index) => (
                  <div
                    className="profile"
                    key={index}
                    onClick={() => handleClickBuyer(sender)}
                    style={{
                      padding: "5px",
                      cursor: "pointer",
                      backgroundColor:
                        sender === currentBuyer ? "#e7ebf6" : "#f6f7fb",
                    }}
                  >
                    <img
                      className="profile_img"
                      src={image}
                      alt="Ảnh đại diện"
                    />
                    <div className="profile_infoLastMess">
                      <p className="profile_infoLastMessP">{nameSender}</p>
                      <p className="last-buyer-message">
                        {lastMessages[store.id]?.content ||
                          "Chưa có tin nhắn từ người mua"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            {/* Tin nhắn của người mua hiện tại */}
            <div className="chatbox">
              <div className="chatview">
                {messages.length > 0 &&
                  messages
                    .filter(
                      (msg) =>
                        msg.sender === currentBuyer ||
                        msg.receiver === currentBuyer ||
                        msg.sender === `CH${storeID}` ||
                        msg.receiver === `CH${storeID}`
                    )
                    .map((msg, index) => (
                      <>
                        <div
                          className={`  ${
                            msg.sender === `CH${storeID}`
                              ? "chatright"
                              : "chatleft"
                          }`}
                        >
                          {msg.sender !== `CH${storeID}` && (
                            <img
                              className="chat_image"
                              src={msg.image}
                              alt=""
                            />
                          )}
                          <div
                            key={index}
                            className={
                              msg.sender === `CH${storeID}`
                                ? "chatseller"
                                : "chatuser"
                            }
                          >
                            {/* <strong>{msg.sender === `CH${storeID}` ? 'You' : 'Buyer'}:</strong>  */}
                            <p className="chat_p">{msg.content}</p>
                            <br />
                          </div>

                          {msg.sender === `CH${storeID}` && (
                            <img
                              className="chat_image"
                              src={msg.image}
                              alt=""
                            />
                          )}
                        </div>
                        <small
                          className="small_date"
                          style={{
                            textAlign:
                              msg.sender === `CH${storeID}` ? "right" : "left",
                          }}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </small>
                      </>
                    ))}
              </div>

              <div className="inputSendMessage">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Ngăn việc xuống dòng
                      sendMessage(); // Gửi tin nhắn
                    }
                  }}
                  placeholder="Nội dung tin nhắn ..."
                  className="chatMessage"
                  style={{ width: "90%" }}
                />
                <button onClick={sendMessage} className="chatMessageButton">
                  <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerChat;
