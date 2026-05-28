import mongoose from "mongoose";

const productSchema = new mongoose.Schema(

  {

    // USER

    userId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true
    },



    // PRODUCT NAME

    productName: {

      type: String,

      required: true,

      trim: true
    },

    // STOCK

    stock: {

      type: Number,

      required: true,

      default: 0
    },

    // LAST SOLD DATE

    lastSoldDate: {

      type: Date,

      required: true
    },

    // EXPIRY DATE

    expiryDate: {

      type: Date,

      required: true
    },

    // MONTHLY SALES

    monthlySales: {

      type: Number,

      required: true,

      default: 0
    },

    // PRICE

    price: {

      type: Number,

      required: true,

      default: 0
    },

    // =========================
    // AI GENERATED FIELDS
    // =========================

    risk: {

      type: String,

      enum: [

        "Healthy",

        "Slow Moving",

        "Dead Stock",

        "Critical",

        "Expiry Risk",

        "Pending"
      ],

      default: "Pending"
    },

    suggestion: {

      type: String,

      default: "Pending"
    },

    aiCampaign: {

      type: String,

      default: "Pending"
    },

    // OPTIONAL ANALYTICS

    daysToExpiry: {

      type: Number,

      default: 0
    },

    daysSinceSold: {

      type: Number,

      default: 0
    }

  },

  {

    timestamps: true
  }

);


// =========================
// INDEXES
// =========================

// Helps faster search

productSchema.index({

  productName: 1
});


// Prevent duplicate products
// per user

productSchema.index(

  {

    userId: 1,

    productName: 1

  },

  {

    unique: true
  }

);


const Product = mongoose.model(

  "Product",

  productSchema
);

export default Product;

