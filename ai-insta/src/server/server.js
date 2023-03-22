const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");
mongoose.connect(
    "YOUR_MONGO_URI",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json("server");
});

app.get("/getfeed", postController.getAllPosts, (req, res) => {
    res.status(200).json(res.locals.allPosts);
});

app.get("/users/:id", userController.getUser, (req, res) => {
    const userId = req.params.id;
    res.status(200).json([res.locals.user, res.locals.userPosts]);
});

app.post("/getNavName", userController.getNavName, (req, res) => {
    res.status(200).json(res.locals.test);
});
app.post("/getUsername", userController.getUsername, (req, res) => {
    res.status(200).json(res.locals.displayName);
});

app.post("/", async (req, res) => {
    try {
        const request = { body_sent_in: await req.body };
        res.status(200).json(request);
    } catch (e) {
        console.log(e);
    }
});

app.post("/myaccid", userController.getMyUrl, (req, res) => {
    res.status(200).json(res.locals.myProfileUrl);
});

app.post("/signup", userController.createUser, (req, res) => {
    res.status(200).json({
        signup_status: "success",
        email: res.locals.email,
    });
});

app.post("/login", userController.verifyUser, (req, res) => {
    res.status(200).json({
        token: res.locals.token,
        login_status: "success",
        email: res.locals.email,
    });
});

app.post(
    "/createpost",
    postController.downloadImage,
    postController.createPost,
    postController.uploadImageToCloud,
    postController.deleteImageFromLocalMachine,
    (req, res) => {
        res.status(200).json("Post Created!");
    }
);

app.post("/editbio", userController.editBio, (req, res) => {
    res.status(200).json("Bio Edit Success!");
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
