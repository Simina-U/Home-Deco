const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const catSchema = new Schema(
  {
    "cat-name": {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", catSchema);

module.exports = Category;
