import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(

  {

    productId: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Product"
    },

    userId: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User"
    },

    aiCampaign: {
      type: String
    },

    platform: {
      type: String
    },

    status: {

      type: String,

      default: "generated"
    }

  },

  {
    timestamps: true
  }
);

const Campaign = mongoose.model(

  "Campaign",

  campaignSchema
);

export default Campaign;