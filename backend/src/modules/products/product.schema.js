import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    mainImage: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    size: {
      type: Number, // change this to [Number] for multiple sizes
      required: true,
    },
    color: [
      {
        type: String,
        trim: true,
        lowercase: true,
        //enum: ["red", "green", "blue", "black", "white", "gray", "beige"],
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },

    // Test SEO
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    metaKeywords: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
