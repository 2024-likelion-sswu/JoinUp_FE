import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/footer_section/Footer";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Login/SignupPage";
import MyPage from './pages/MyPage/MyPage'
import MyEdit from "./pages/MyPage/MyEdit";
import Post from './pages/Posting/Post'
import AddPost from './pages/Posting/AddPost'
import Community from "./pages/Community/Community";

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
          <Route path="/mypage" element={<MyPage/> } />
          <Route path="/myedit" element={<MyEdit/>}/>
          <Route path="/post" element={<Post/>}/>
          <Route path="/addpost" element={<AddPost/>}/>
          <Route path="/community" element={<Community/>}/>
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
