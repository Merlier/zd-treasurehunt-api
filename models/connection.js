const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Connection = new Schema(
  {
    refreshToken: {
      type: String,
      trim: true,
      required: true,
    },
    refreshTokenExpirationDate: {
      type: Date,
      required: true,
    },
    ip: {
      type: String,
      trim: true,
      required: false,
    },
    userAgent: {
      type: String,
      trim: true,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // ajoute 2 champs au document createdAt et updatedAt
  }
);

module.exports = mongoose.model("Connection", Connection);
