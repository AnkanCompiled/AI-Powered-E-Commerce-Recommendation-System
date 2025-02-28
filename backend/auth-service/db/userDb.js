import User from "../models/userModel.js";

export async function registerDb(name, email, hashedPassword) {
  try {
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error is registerDb:", error);
    throw error;
  }
}

export async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error is findUserByEmail:", error);
    throw error;
  }
}
