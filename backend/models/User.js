// const { default: mongoose } = require("mongoose");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
 

const userSchema = new mongoose.Schema( 
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type:  String,
      required: true,
      minLength: 6,
    },
    role: {
      type:  String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {timestamps: true}
);

// Password hash middleWare
userSchema.pre("save", async function (next) {
  if(!this.isModified("password"));
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match User entered password to Hashed password

userSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);