const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    rewards: { type: Number, default: 0}
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
mongoose.set('useFindAndModify', false);

module.exports = userModel;
