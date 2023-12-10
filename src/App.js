import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navigation/Navbar";
import ThemeProvider from "./components/ThemeProvider/ThemeProvider";
import Footer from "./components/Navigation/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Navbar />
          <div className=" pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};

export default App;
