const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    "item-name": {
      type: String,
      required: true,
    },
    "item-category": {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: String,
      required: false,
    },
    "item-description": {
      type: String,
      required: true,
    },
    "seller-name": {
      type: String,
      required: true,
    },
    "seller-email": {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
