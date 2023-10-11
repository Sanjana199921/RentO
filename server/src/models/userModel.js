const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      
    },
    lastName: {
      type: String,
     
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
    },
    phonenumber: {
      type: Number,
    },
    isOwner: {
      type: Boolean,
      default: false,
    }
  });

  const user = mongoose.model("users", userSchema);
  module.exports = { user};