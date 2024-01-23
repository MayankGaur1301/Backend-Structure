import mongoose, { Schema } from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // Improves query performance for searches and sorting based on the 'username' field
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, // cloudinary URL
      required: true,
    },
    coverImage: {
      typeString, // cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Check if the 'password' field has been modified before proceeding
  if (!isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);

  // Proceed to the next middleware or the save operation
  next();
});

// our customMethod inserted in "methods"    (checking userPassword correct or not)
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating JWT Access Token
userSchema.methods.generateAccessToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Generating JWT Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

/* 
userSchema.pre("save", async function (next)
This line sets up a pre-save middleware for the 'save' event in the userSchema. This middleware will be executed before saving a document.

next();: This line calls the next function to move on to the next middleware in the sequence or, if this is the last middleware, to proceed with the save operation. It is crucial to call next() to ensure the middleware chain continues.

In summary, this pre-save middleware checks if the 'password' field has been modified. If yes, it hashes the 'password' using bcrypt before saving the document. This is commonly used for encrypting passwords before storing them in the database.

isModified?? 👇
In summary, the isModified("password") check is used to handle both initial password setting during user registration and subsequent updates to the password. It ensures that the hashing operation is performed when the password is being modified, regardless of whether it's the first time or an update.
*/
