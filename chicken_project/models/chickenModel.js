const mongoose = require("mongoose");

const CHickenModel = mongoose.model(
  "chicken_db",
  {
    name: {
      type: String,
      required: true
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    weight: {
      type: Number,
      required: true
    },
    steps: {
        type: Number,
        default: 0
      },
    isRunning: {
        type: Boolean,
        default: false
      }
  },
  "chicken"
);

module.exports = { ChickenModel };