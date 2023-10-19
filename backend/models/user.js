//imports
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//userSchema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (username, email, password, role) {
  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw Error("User Already Exists");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return user;
  }
};

userSchema.statics.signin = async function (email, password) {
  const existingUser = await this.findOne({
    email,
  });

  if (!existingUser) {
    throw Error("User Not Exists");
  }

  const match = await bcrypt.compare(password, existingUser.password);

  if (match) {
    return existingUser;
  } else {
    throw Error("Check Password and Try Again");
  }
};

module.exports = mongoose.model("user", userSchema);
