import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(

  {

    userId: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true
    },

    action: {

      type: String,

      required: true
    },

    module: {

      type: String,

      enum: [

        "AUTH",
        "PRODUCT",
        "CAMPAIGN",
        "PROFILE",
        "NOTIFICATION",
        "SYSTEM"
      ],

      default: "SYSTEM"
    },

    details: {
      type: String
    },

    ipAddress: {
      type: String
    },

    userAgent: {
      type: String
    }

  },

  {
    timestamps: true
  }
);

const ActivityLog = mongoose.model(

  "ActivityLog",

  activityLogSchema
);

export default ActivityLog;