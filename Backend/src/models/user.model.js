import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
            index: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"]
        },
        token: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

/**
 * Method to compare candidate password with hashed password in database.
 */
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

/**
 * Method to generate signed JSON Web Token (JWT) for authentication.
 */
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            name: this.name
        },
        process.env.JWT_SECRET || "sabka_video_call_default_jwt_secret_key_2026",
        {
            expiresIn: process.env.JWT_EXPIRY || "7d"
        }
    );
};

export const User = mongoose.model("User", userSchema);
export default User;