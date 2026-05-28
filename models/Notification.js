import mongoose from "mongoose";

const notificationSchema =
new mongoose.Schema(

  {

    // USER

    userId: {

      type: String,

      required: false
    },

    // TITLE

    title: {

      type: String,

      default: "Notification"
    },

    // MESSAGE

    message: {

      type: String,

      required: true
    },

    // TYPE

    type: {

      type: String,

      enum: [

        "inventory_alert",

        "new_user"

      ],

      default: "inventory_alert"
    },

    // READ STATUS

    read: {

      type: Boolean,

      default: false
    }

  },

  {

    timestamps: true

  }

);

const Notification =
mongoose.model(

  "Notification",

  notificationSchema
);

export default Notification;