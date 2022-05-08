import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import MyAccount from "./MyAccount";

const Main = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/my-account" element={<MyAccount />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Main;
