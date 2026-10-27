import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import Home from "./Home/Home"
import MainLayout from "./Pages/MainLayout";
import OnboardingFeedPage from "./Dialog/OnBoarding";
import TabsUnderline from "./Pages/UserSetting"
import Pipeline from "./Pages/Pipeline"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/onboarding" element={<OnboardingFeedPage />}></Route>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/usersetting" element={<TabsUnderline />}></Route>
          <Route path="/pipeline" element={<Pipeline />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
