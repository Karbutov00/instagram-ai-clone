import React from "react";
import { Paper, Box } from "@mui/material";
import FeedItem from "./FeedItem";
import CreatePost from "./CreatePost";
import axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
const Feed = ({ showModal, setShowModal }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/getfeed")
            .then((response) => setPosts(response.data))
            .catch((e) => console.log(e));
    }, []);
    return (
        <Paper
            sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {showModal ? (
                <CreatePost showModal={showModal} setShowModal={setShowModal} />
            ) : (
                <Box
                    sx={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column-reverse",
                    }}
                >
                    {posts.map((post, index) => {
                        return (
                            <FeedItem
                                key={index}
                                title={post.title}
                                imageURL={post.imageURL}
                                description={post.description}
                                postedBy={post.postedBy}
                            />
                        );
                    })}
                </Box>
            )}
        </Paper>
    );
};

export default Feed;
