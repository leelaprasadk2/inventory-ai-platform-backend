import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

  {

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: function () {

        // Password not required for Google users
        return !this.googleId;

      }
    },

    role: {

      type: String,

      enum: [

        "admin",
        "user"

      ],

      default: "user"

    },

    profilePic: {

      type: String,
      default: ""

    },

    // =========================
    // EMAIL VERIFICATION
    // =========================

    isVerified: {

      type: Boolean,
      default: false

    },

    verifyToken: {

      type: String,
      default: null

    },

    verifyTokenExpire: {

      type: Date,
      default: null

    },

    // =========================
    // FORGOT PASSWORD
    // =========================

    resetPasswordToken: {

      type: String,
      default: null

    },

    resetPasswordExpire: {

      type: Date,
      default: null

    },

    // =========================
    // GOOGLE LOGIN
    // =========================

    googleId: {

      type: String,
      default: null

    }

  },

  {

    timestamps: true

  }

);

const User = mongoose.model(

  "User",
  userSchema

);

export default User;