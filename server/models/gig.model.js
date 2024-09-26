import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
    },
    shortDesc: {
      type: String,
      required: true,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    sales: {
      type: Number,
      default: 0,
    },
    features: {
      type: [String],
    },
    // New field for tags to improve search functionality
    tags: {
      type: [String], // Array of strings, for example, ["React", "Frontend", "JavaScript"]
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for full-text search on tags, title, shortTitle, and category
GigSchema.index({
  tags: "text",
  title: "text",
  shortTitle: "text",
  cat: "text",
});

export default mongoose.model("Gig", GigSchema);
