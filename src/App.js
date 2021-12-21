import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginScreen from "./components/Log/LoginScreen";
import RegisterScreen from "./components/Log/RegisterScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import Postdetail from "./components/Posts/Postdetail";
import AuthProvider from "./components/Context/AuthProvider";
import CreateNewPost from "./components/Posts/CreateNewPost";
import ScrollToTop from "./ScrollToTop";
import Userpage from "./components/Userpage";
import Satistic from "./components/Satistic/Satistic";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <ScrollToTop>
            <Routes>
              <Route exact path="/home" element={<HomeScreen />}></Route>
              <Route exact path="/postdetail" element={<Postdetail />}></Route>
              <Route exact path="/login" element={<LoginScreen />}></Route>
              <Route
                exact
                path="/register"
                element={<RegisterScreen />}
              ></Route>
              <Route
                exact
                path="/createnewpost"
                element={<CreateNewPost />}
              ></Route>

              <Route exact path="/userpage" element={<Userpage />}></Route>
              <Route exact path="/statistic" element={<Satistic />}></Route>
            </Routes>
          </ScrollToTop>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
