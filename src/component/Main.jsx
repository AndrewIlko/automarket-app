import { Routes, Route } from "react-router-dom";
import Cars from "./Cars";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import ProfilePage from "./Pages/ProfilePage";
import RegistrationPage from "./Pages/RegistrationPage";
import Wrapper from "./Wrapper";

const Main = () => {
  return (
    <>
      <main className="w-full min-h-screen flex flex-col mx-auto p-6 pt-[59px] items-center">
        <Wrapper>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Wrapper>
      </main>
    </>
  );
};

export default Main;
