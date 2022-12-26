import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import RegistrationPage from "./Pages/RegistrationPage";
import Wrapper from "./Wrapper";

const Main = () => {
  return (
    <>
      <main className="w-full mx-auto flex items-center flex-col p-6">
        <Wrapper>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </Routes>
        </Wrapper>
      </main>
    </>
  );
};

export default Main;
