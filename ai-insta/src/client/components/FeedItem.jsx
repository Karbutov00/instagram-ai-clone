import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    Icon,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FeedItem = ({ title, imageURL, description, postedBy }) => {
    const [displayName, setDisplayName] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const data = {
            userID: postedBy,
        };
        axios
            .post("http://localhost:8080/getUsername", data)
            .then((response) => setDisplayName(response.data[0]));
    }, []);

    const { firstName, lastName } = displayName;
    return (
        <Card
            sx={{
                width: "100%",
                maxWidth: "550px",
                // flexBasis: 0,
                margin: "auto",
                mb: "15px",
                backgroundColor: "white",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                transform: "translateY(-2px)",
                minWidth: "450px",
            }}
            // sx={{
            //     width: "100%",
            //     flex: "2 2 ait"
            //     margin: "auto",
            //     mb: "15px",
            //     backgroundColor: "white",
            //     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            //     transform: "translateY(-2px)",
            // }}
        >
            <CardHeader
                title={title}
                titleTypographyProps={{
                    variant: "subtitle2",
                    sx: {
                        textAlign: "canter",
                    },
                }}
                sx={{
                    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
                    transform: "translateY(0px)",
                }}
            />

            <CardMedia
                component="img"
                image={
                    imageURL
                        ? imageURL
                        : "https://www.penguinrandomhouseaudio.com/wp-content/uploads/2019/08/International-Dog-Day.jpg"
                }
                alt="Feed item image description"
                sx={{ height: 500 }}
            />

            <CardContent
                sx={{
                    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
                    transform: "translateY(0px)",
                    pb: "5px !important",
                    pt: "5px !important",
                }}
            >
                <Typography
                    variant="h6"
                    color="textSecondary"
                    component="p"
                    sx={{
                        borderBottom: "1px solid #e0e0e0",
                        display: "flex",
                        fontSize: "14px",
                        p: "10px",
                        "&:hover": {
                            color: "#05050b",
                            transition: "ease 200ms",
                            cursor: "pointer",
                        },
                    }}
                    onClick={() => navigate(`/user/${postedBy}`)}
                >
                    {`${firstName} ${lastName}`}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    sx={{ pt: "8px", pb: "8px" }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default FeedItem;
