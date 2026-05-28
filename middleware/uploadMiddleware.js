import multer from "multer";

import {
  CloudinaryStorage,
} from "multer-storage-cloudinary";

import cloudinary
from "../config/cloudinary.js";

// =========================
// STORAGE
// =========================

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: async (
      req,
      file
    ) => {

      return {

        folder:
          "inventory-ai-profile",

        resource_type:
          "image",

        public_id:
          Date.now() +
          "-" +
          file.originalname
            .split(".")[0],
      };
    },
  });

// =========================
// FILE FILTER
// =========================

const fileFilter = (

  req,
  file,
  cb

) => {

  if (

    file.mimetype.startsWith(
      "image"
    )

  ) {

    cb(null, true);

  } else {

    cb(

      new Error(
        "Only image files allowed"
      ),

      false
    );
  }
};

// =========================
// MULTER
// =========================

const upload =
  multer({

    storage,

    fileFilter,

    limits: {

      fileSize:
        5 * 1024 * 1024,
    },
  });

export default upload;