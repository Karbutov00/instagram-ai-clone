const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        biography: { type: String, default: "bio" },
    },
    { collection: "users" }
);
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password") || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
            return next();
        } catch (e) {
            return next(err);
        }
    } else {
        return next();
    }
});

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = mongoose.model("User", userSchema);
