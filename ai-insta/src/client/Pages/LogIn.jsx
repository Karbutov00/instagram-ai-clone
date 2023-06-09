import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import signupbg from "../assets/loginbg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${signupbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
    },
    card: {
        backgroundColor: "transparent",
        backdropFilter: "blur(24px) brightness(125%)",
        borderRadius: "8px",
        maxWidth: "400px",
        width: "100%",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "16px",
    },
    input: {
        marginBottom: "16px",
    },
    submitButton: {
        marginTop: "16px",
        marginBottom: "8px",
        backgroundColor: "#227BA5",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#1D6490",
        },
    },
    signupLink: {
        color: "##227BA5",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
        cursor: "pointer",
    },
};

const Login = () => {
    useEffect(() => {
        const session = localStorage.getItem("logged_in");
        if (session === "true") {
            navigate("/");
        }
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
    const testClick = () => {
        if (!email || !password) {
            return;
        }
        const data = {
            email: email,
            password: password,
        };
        axios
            .post("http://localhost:8080/login", data)
            .then((response) => {
                setLogin(response.data);
                if (response.data.login_status === "success") {
                    localStorage.setItem("logged_in", true);
                    localStorage.setItem("email", response.data.email);
                    window.location.reload();
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <Box sx={styles.root}>
            <Card sx={styles.card}>
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: "16px",
                            textAlign: "center",
                        }}
                    >
                        Log In
                    </Typography>
                    <TextField
                        sx={styles.input}
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        sx={styles.input}
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        sx={styles.submitButton}
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={testClick}
                    >
                        Login
                    </Button>
                    <Typography
                        variant="body2"
                        sx={{ textAlign: "center", mt: "16px" }}
                    >
                        Don't have an account?{" "}
                        <a href="/signup" sx={styles.signupLink}>
                            Sign up
                        </a>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
