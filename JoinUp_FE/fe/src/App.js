import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/footer_section/Footer";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Login/SignupPage";
import Coupon from "./pages/MyPage/Coupon";
import List from "./pages/MyPage/List";
import LineupPlus from "./pages/Lineup/Lineup_plus";
import Home_map from "./pages/Lineup/Home_map";
import MyPage from './pages/MyPage/MyPage'
import MyEdit from "./pages/MyPage/MyEdit";
import Post from './pages/Posting/Post'
import AddPost from './pages/Posting/AddPost'
import Community from "./pages/Community/Community";
import LiveChatListPage from "./pages/Taxi_chatting/LiveChatListPage";
import LiveChatPage from "./pages/Taxi_chatting/LiveChatPage";
import LandingPage from "./pages/Landing/LandingPage";
import Feed from './components/Post_section/Feed'

function App() {
  const AppContent = () => {
    const location = useLocation();
    const exceptPath = ['/login', '/signup', '/'];
    const shouldShowFooter = !exceptPath.includes(location.pathname);

    return (
      <>
        <Routes>
          {/* 기본 경로 "/"를 "/home"으로 리다이렉트 */}
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}
          <Route path="/home" element={<Home_map />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/list" element={<List />} />
          <Route path="/lineup_plus" element={<LineupPlus />} />
          <Route path="/livechat" element={<LiveChatListPage />} />
          <Route path="/livechat/:chatRoomId" element={<LiveChatPage />} />
          <Route path="/mypage" element={<MyPage/> } />
          <Route path="/myedit" element={<MyEdit/>}/>
          <Route path="/community/post" element={<Post/>}/>
          <Route path="/community/addpost" element={<AddPost/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/feed" element={<Feed/>}/>
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
