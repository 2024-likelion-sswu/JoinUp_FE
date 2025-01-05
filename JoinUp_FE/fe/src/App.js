import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/footer_section/Footer";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Login/SignupPage";
import Coupon from "./pages/Mypage/Coupon";
import List from "./pages/Mypage/List";
import LineupPlus from "./pages/Lineup/Lineup_plus";
import Home from "./pages/Lineup/Home";
import Home_map from "./pages/Lineup/Home_map";

function App() {
  const AppContent = () => {
    const location = useLocation();
    const exceptPath = ['/login', '/signup'];
    const shouldShowFooter = !exceptPath.includes(location.pathname);

    return (
      <>
        <Routes>
          {/* 기본 경로 "/"를 "/home"으로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home_map" element={<Home_map />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/list" element={<List />} />
          <Route path="/lineup_plus" element={<LineupPlus />} />
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
