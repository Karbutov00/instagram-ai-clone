import { Routes, Route } from "react-router-dom";
import Home from "./client/Pages/Home";
import Login from "./client/Pages/LogIn";
import SignUp from "./client/Pages/SignUp";
import User from "./client/Pages/User";
import { useState } from "react";
function App() {
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        showModal={showModal}
                        setShowModal={setShowModal}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
                path="/user/:userId"
                element={
                    <User
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        setShowModal={setShowModal}
                    />
                }
            />
        </Routes>
    );
}

export default App;
