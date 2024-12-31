import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/footer_section/Footer";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
