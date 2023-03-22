import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = ({ setShowModal, showModal, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    useEffect(() => {
        const session = localStorage.getItem("logged_in");
        if (session === "true") {
            setIsLoggedIn(true);
        }
        const data = {
            email: localStorage.getItem("email"),
        };
        axios
            .post("http://localhost:8080/getNavName", data)
            .then((response) =>
                setName(
                    response.data.firstName.charAt(0).toUpperCase() +
                        response.data.firstName.slice(1)
                )
            )
            .catch((e) => console.log(e));
    }, []);
    const feedClickHandler = () => {
        setShowModal(false);
        navigate("/");
    };
    const logOut = () => {
        setIsLoggedIn(false);
        localStorage.setItem("logged_in", false);
        localStorage.removeItem("email");
        window.location.reload();
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "#9CA9FD",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    transform: "translateY(-2px)",
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: "pointer" }}
                        onClick={feedClickHandler}
                    >
                        {isLoggedIn ? `Welcome ${name}!` : "Feed"}
                    </Typography>
                    {isLoggedIn ? (
                        <div>
                            <Button
                                color="inherit"
                                onClick={() => setShowModal(true)}
                            >
                                Create Post
                            </Button>
                            <Button color="inherit" onClick={logOut}>
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <Button
                            color="inherit"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
