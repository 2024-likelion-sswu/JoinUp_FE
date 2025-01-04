import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/footer_section/Footer";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Login/SignupPage";
import Coupon from "./pages/Mypage/Coupon";
import List from "./pages/Mypage/List";
import LineupPlus from "./pages/Lineup/Lineup_plus";
import Home from "./pages/Lineup/Home";

function App() {
  const AppContent = () => {
    const location = useLocation();
    const exceptPath = ['/login', '/signup'];
    const shouldShowFooter = !exceptPath.includes(location.pathname);

    return (
      <>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/livechat" element={<LiveChatListPage />} />
          <Route path="/livechat/id" element={<LiveChatPage />} /> */}
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/list" element={<List/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/lineup_plus" element={<LineupPlus/>} />
        </Routes>
        {shouldShowFooter && <Footer />}
      </>
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
