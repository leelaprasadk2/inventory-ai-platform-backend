import User from "../models/User.js";

import Product from "../models/Product.js";

import bcrypt from "bcryptjs";

import { Parser } from "json2csv";

// =========================
// GET ALL USERS
// =========================

export const getAllUsers =
  async (req, res) => {

    try {

      // GET USERS

      const users =
        await User.find()

          .select("-password")

          .sort({

            createdAt: -1,
          });

      // ADD PRODUCTS COUNT

      const updatedUsers =
        await Promise.all(

          users.map(

            async (user) => {

              const count =
                await Product.countDocuments({

                  userId:
                    user._id,
                });

              return {

                ...user.toObject(),

                productsCount:
                  count,
              };
            }
          )
        );

      res.json(
        updatedUsers
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };

// =========================
// DELETE USER
// =========================

export const deleteUser =
  async (req, res) => {

    try {

      const {

        adminPassword,

      } = req.body;

      // FIND ADMIN

      const admin =
        await User.findById(

          req.user.id
        );

      if (!admin) {

        return res.status(404).json({

          message:
            "Admin not found",
        });
      }

      // CHECK PASSWORD

      const isMatch =
        await bcrypt.compare(

          adminPassword,

          admin.password
        );

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Wrong admin password",
        });
      }

      // DELETE USER PRODUCTS

      await Product.deleteMany({

        userId:
          req.params.id,
      });

      // DELETE USER

      await User.findByIdAndDelete(

        req.params.id
      );

      res.json({

        message:
          "User deleted successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };

// =========================
// DOWNLOAD USER PRODUCTS
// =========================

// =========================
// DOWNLOAD USER PRODUCTS
// =========================

export const downloadUserProducts =
  async (req, res) => {

    try {

      const products =
        await Product.find({

          userId:
            req.params.id

        });

      return res.status(200).json(products);

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        message:
          error.message
      });
    }
  };