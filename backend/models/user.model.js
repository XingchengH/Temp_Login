import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // convert email to lowercase
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


// You might choose to hash passwords before saving, add methods, etc.
// this is middleware that runs before saving a user
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10); // generate salt, 10 rounds, more rounds means more secure but slower
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;

