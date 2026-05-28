import User from "../models/User.js";

// =========================
// GET PROFILE
// =========================

export const getProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(

          req.user.id

        ).select("-password");

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",
        });
      }

      return res.status(200).json(
        user
      );

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to fetch profile",
      });
    }
  };

// =========================
// UPDATE PROFILE
// =========================

export const updateProfile =
  async (req, res) => {

    try {

      const { name } =
        req.body;

      const updateData = {};

      // =========================
      // UPDATE NAME
      // =========================

      if (name) {

        updateData.name =
          name;
      }

      // =========================
      // UPDATE IMAGE
      // =========================

      if (req.file) {

        updateData.profilePic =

          req.file.path ||

          req.file.secure_url ||

          req.file.url;
      }

      // =========================
      // UPDATE USER
      // =========================

      const updatedUser =

        await User.findByIdAndUpdate(

          req.user.id,

          updateData,

          {
            new: true,
          }

        ).select("-password");

      if (!updatedUser) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",
        });
      }

      return res.status(200).json({

        success: true,

        message:
          "Profile updated successfully",

        ...updatedUser._doc,
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Profile update failed",
      });
    }
  };