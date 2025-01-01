import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/footer_section/Footer";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Login/SignupPage";

function App() {
  const exceptPath = ['/login', '/signup'];

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        {!exceptPath && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
