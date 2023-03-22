import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import signupbg from "../assets/signupbg.jpg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
        backdropFilter: "blur(24px) brightness(110%)",
        borderRadius: "8px",
        maxWidth: "400px",
        width: "100%",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "16px",
    },
    input: {
        marginBottom: "16px",
        backgroundColor: "rgba(255, 255, 255, .7)",
        borderRadius: "4px",
    },
    submitButton: {
        marginTop: "16px",
        marginBottom: "8px",
        backgroundColor: "#7D8B47",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#526137",
        },
    },
    signupLink: {
        color: "#white",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
        cursor: "pointer",
    },
};

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const session = localStorage.getItem("logged_in");
        if (session === "true") {
            navigate("/");
        }
    }, []);

    const signUpHandler = () => {
        if (
            [firstName, lastName, email, password, confirmPass].every(
                (field) => field !== ""
            ) &&
            password === confirmPass
        ) {
            const data = {
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                password: password,
            };
            axios
                .post("http://localhost:8080/signup", data)
                .then((response) => {
                    if (response.data.signup_status === "success") {
                        localStorage.setItem("logged_in", true);
                        localStorage.setItem("email", response.data.email);
                        window.location.reload();
                    }
                })
                .catch((e) => console.log(e));
        }
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
                            color: "white",
                        }}
                    >
                        Sign Up
                    </Typography>
                    <TextField
                        sx={styles.input}
                        label="First Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        fullWidth
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        sx={styles.input}
                        label="Last Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        fullWidth
                        onChange={(e) => setLastName(e.target.value)}
                    />
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
                    <TextField
                        sx={styles.input}
                        label="Confirm Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    <Button
                        sx={styles.submitButton}
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={signUpHandler}
                    >
                        Sign Up
                    </Button>
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: "center",
                            mt: "16px",
                            color: "white",
                        }}
                    >
                        Already have an account?{" "}
                        <a href="/login" sx={styles.signupLink}>
                            Log in
                        </a>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SignUp;
