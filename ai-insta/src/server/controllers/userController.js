const User = require("../models/userModel");
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");

function createToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
    };
    const secret = "mysecretkey";
    const options = { expiresIn: "1d" };
    return jwt.sign(payload, secret, options);
}

const userController = {};

userController.createUser = async (req, res, next) => {
    // res.locals.userInfo = await req.body;
    try {
        const { email, firstName, lastName, password } = await req.body;
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });
        await newUser.save();
        res.locals.email = email;
        return next();
    } catch (e) {
        return next(e);
    }
};

userController.verifyUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }
        const token = createToken(user);
        res.cookie("jwt", token, {
            httpOnly: false,
            secure: false,
        });
        res.locals.token = token;
        res.locals.email = email;
        return next();
    } catch (err) {
        return next(err);
    }
};

userController.getUsername = async (req, res, next) => {
    try {
        const { userID } = req.body;
        res.locals.displayName = await User.find(
            { _id: userID },
            { firstName: 1, lastName: 1, _id: 0 }
        );
        return next();
    } catch (e) {
        return next(e);
    }
};

userController.getNavName = async (req, res, next) => {
    try {
        const { email } = req.body;

        res.locals.test = await User.findOne(
            { email: email },
            { firstName: 1, _id: 0 }
        );
        return next();
    } catch (e) {
        return next(e);
    }
};

userController.getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        res.locals.user = await User.findOne({ _id: userId });
        res.locals.userPosts = await Post.find({ postedBy: userId });
        console.log(res.locals.userPosts);

        return next();
    } catch (e) {
        return next(e);
    }
};

userController.editBio = async (req, res, next) => {
    try {
        const { newBio, userId } = req.body;
        await User.findByIdAndUpdate(userId, { biography: newBio });

        return next();
    } catch (e) {
        return next(e);
    }
};

userController.getMyUrl = async (req, res, next) => {
    try {
        const { email } = req.body;
        res.locals.myProfileUrl = await User.findOne(
            { email: email },
            { _id: 1 }
        );
        return next();
    } catch (e) {
        return next(e);
    }
};

module.exports = userController;
