import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./javascript/components/MainPage";
import Main from "./javascript/components/Main";

function App() {
    return (
        <div className="App">
            <Main />
        </div>

        // <BrowserRouter>
        //     <Routes>
        //         <Route path="/" element={<MainPage />} />
        //     </Routes>
        // </BrowserRouter>
    );
}

export default App;
