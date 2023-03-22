import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    CardMedia,
} from "@mui/material";
import signupbg from "../assets/loginbg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

const styles = {
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: { sm: "100%", md: "85vh", lg: "85vh" },
        overflow: "scroll",

        width: "90%",
        gap: { sm: "0px", md: "15px", lg: "25px" },
        flexDirection: { xs: "column", md: "row", lg: "row" },
    },
    card: {
        backgroundColor: "transparent",
        backdropFilter: "blur(24px) brightness(125%)",
        borderRadius: "8px",
        width: "100%",
        minHeight: "240px",

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

const CreatePost = ({ showModal, setShowModal }) => {
    const apiKey = "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";

    const [prompt, setPrompt] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [posting, setPosting] = useState(false);
    const navigate = useNavigate();
    const generateImage = async () => {
        if (prompt === "") {
            return;
        }
        setImageUrl("");
        setGenerated(false);
        setIsGenerating(true);
        const url = "https://api.openai.com/v1/images/generations";
        const data = {
            prompt: prompt,
            size: "1024x1024",
        };
        try {
            const response = await axios.post(url, data, {
                headers: { Authorization: `Bearer ${apiKey}` },
            });
            setImageUrl(response.data.data[0].url);

            setIsGenerating(false);
            setGenerated(true);
        } catch (e) {
            console.log(e);
        }
    };
    const postImage = () => {
        const currentSessionEmail = localStorage.getItem("email");
        if (!title || !description || !imageUrl || !currentSessionEmail) {
            return;
        }
        setPosting(true);
        const url = "http://localhost:8080/createpost";
        const data = {
            title: title,
            imageUrl: imageUrl,
            description: description,
            postedBy: currentSessionEmail,
        };
        axios
            .post(url, data)
            .then((response) => {
                setTitle("");
                setDescription("");
                setPosting(false);
                window.location.reload();
            })
            .catch((e) => console.log(e));
    };
    return (
        <Box sx={styles.root}>
            {posting ? (
                <CircularProgress />
            ) : (
                <Box sx={styles.root}>
                    <Card
                        sx={{
                            backgroundColor: "transparent",
                            backdropFilter: "blur(24px) brightness(125%)",
                            borderRadius: "8px",
                            width: "100%",
                            minHeight: "240px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                            padding: "16px",
                        }}
                    >
                        <CardContent
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {imageUrl ? (
                                <CardMedia
                                    component="img"
                                    image={imageUrl}
                                    alt="Feed item image description"
                                    sx={{
                                        maxHeight: "500px",
                                        maxWidth: "500px",
                                    }}
                                />
                            ) : isGenerating ? (
                                <CardMedia
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CircularProgress />
                                </CardMedia>
                            ) : (
                                <Box>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        Woah this isn't an image!
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                    <Card sx={styles.card}>
                        <CardContent>
                            {generated ? (
                                <Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: "16px",
                                            textAlign: "center",
                                        }}
                                    >
                                        Create Post
                                    </Typography>
                                    <TextField
                                        sx={styles.input}
                                        label="Prompt"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={(e) =>
                                            setPrompt(e.target.value)
                                        }
                                        autoComplete="off"
                                    />
                                    <TextField
                                        sx={styles.input}
                                        label="Title"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        autoComplete="off"
                                    />
                                    <TextField
                                        sx={styles.input}
                                        label="Description"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        autoComplete="off"
                                    />
                                </Box>
                            ) : (
                                <Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: "16px",
                                            textAlign: "center",
                                        }}
                                    >
                                        Generate
                                    </Typography>
                                    <TextField
                                        sx={styles.input}
                                        label="Prompt"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={(e) =>
                                            setPrompt(e.target.value)
                                        }
                                        autoComplete="off"
                                    />
                                </Box>
                            )}

                            {generated ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Button
                                        sx={styles.submitButton}
                                        variant="contained"
                                        size="large"
                                        onClick={generateImage}
                                    >
                                        Generate
                                    </Button>
                                    <Button
                                        sx={{
                                            marginTop: "16px",
                                            marginBottom: "8px",
                                            backgroundColor: "#389f0a",
                                            color: "#ffffff",
                                            "&:hover": {
                                                backgroundColor: "#266f05",
                                            },
                                        }}
                                        variant="contained"
                                        size="large"
                                        onClick={postImage}
                                    >
                                        Post
                                    </Button>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Button
                                        sx={{
                                            marginTop: "16px",
                                            marginBottom: "8px",
                                            backgroundColor: "#9B0000",
                                            color: "#ffffff",
                                            "&:hover": {
                                                backgroundColor: "#6D0000",
                                            },
                                        }}
                                        variant="contained"
                                        size="large"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        sx={styles.submitButton}
                                        variant="contained"
                                        size="large"
                                        onClick={generateImage}
                                    >
                                        Generate
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Box>
    );
};

export default CreatePost;
