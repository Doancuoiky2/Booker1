import "./App.css";
import "./fonts.css";
import { Routes, Route } from "react-router-dom";
import Admin from "./FormManager/Admin";
import Seller from "./FormManager/Seller";
import User from "./FormManager/User";

import "react-notifications/lib/notifications.css";

import { CartProvider } from "./context/cartContext";
import BuyerChat from "./chat/BuyerChat";
import SellerChat from "./chat/SellerChat";
import ScrollToTop from "./ScrollToTop";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <div>
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path="/seller/*" element={<Seller />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/buyer-chat" element={<BuyerChat />} />
          <Route path="/seller-chat" element={<SellerChat />} />
        </Routes>
      </div>
      <NotificationContainer />
    </CartProvider>
  );
}
export default App;
