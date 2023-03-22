const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const fs = require("fs");
const imageDownloader = require("image-downloader");
const path = require("path");
const postController = {};
const cloudinary = require("cloudinary").v2;

// configures cloudinary for uploading to cloud
cloudinary.config({
    cloud_name: "dm0uvfpi6",
    api_key: "YOUR_API_KEY",
    api_secret: "YOUR_API_SECRET_KEY",
});

postController.getAllPosts = async (req, res, next) => {
    try {
        const allPosts = await Post.find();
        res.locals.allPosts = allPosts;
        return next();
    } catch (e) {
        return next(e);
    }
};

// Middleware will download the image from image url, upload it to cloud, and delete it from local machine
postController.downloadImage = async (req, res, next) => {
    try {
        // get our imageUrl from request body
        const { imageUrl } = req.body;
        // configure options for downlaoding with image-downloader
        const options = {
            url: imageUrl,
            dest: path.join(__dirname, "../assets"),
        };
        // download image
        await imageDownloader.image(options).then(({ filename }) => {
            console.log(`Image downloaded at: ${filename}`);
            // save our file path and name to local variable
            res.locals.imageFilePath = filename;
        });

        return next();
    } catch (e) {
        return next({ e: "Error in postController.downloadImage" });
    }
};

postController.createPost = async (req, res, next) => {
    try {
        const { title, description, postedBy } = req.body;
        const newPost = new Post({
            title: title,
            description: description,
            postedBy: await User.findOne({ email: postedBy }, { _id: 1 }),
        });

        res.locals.newPost = newPost;
        console.log({ newPost: res.locals.newPost._id.toString() });
        console.log({ imagePath: res.locals.imageFilePath });
        return next();
    } catch (e) {
        return next({ e: "Error in postController.createPost" });
    }
};

postController.uploadImageToCloud = async (req, res, next) => {
    try {
        const upload = await cloudinary.uploader.upload(
            res.locals.imageFilePath,
            {
                public_id: res.locals.newPost._id.toString(),
            }
        );
        const url = cloudinary.url(res.locals.newPost._id.toString(), {
            width: 1024,
            height: 1024,
            Crop: "fill",
        });
        const { newPost } = res.locals;
        newPost.imageURL = url;
        res.locals.url = url;
        console.log(url);
        await newPost.save();
        return next();
    } catch (e) {
        return next({ e: "Error in postController.uploadImageToCloud" });
    }
};

postController.deleteImageFromLocalMachine = async (req, res, next) => {
    try {
        await fs.promises.unlink(res.locals.imageFilePath);
        console.log(`File deleted: ${res.locals.imageFilePath}`);
        return next();
    } catch (e) {
        return next(e);
    }
};

// console.log(res.locals.imageFilePath);
module.exports = postController;
