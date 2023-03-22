import React from "react";
import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
const Home = ({ showModal, setShowModal, isLoggedIn, setIsLoggedIn }) => {
    return (
        <div>
            <Navbar
                showModal={showModal}
                setShowModal={setShowModal}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />
            <Feed showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default Home;
