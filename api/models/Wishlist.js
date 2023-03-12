const mongoose = require("mongoose");

const WhishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    products: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlists", WhishlistSchema);

module.exports = Wishlist;
