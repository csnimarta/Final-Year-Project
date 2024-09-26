
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const secretKey = "your-secret-key"; 

const signup = async (req, res) => {
  try {
    const { username, email_address, password, full_name, phone_number } =
      req.body;

   
    if (
      !username ||
      !email_address ||
      !password ||
      !full_name ||
      !phone_number
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({
      username,
      email_address,
      password,
      full_name,
      phone_number,
    });
    await newUser.save();

    const token = jwt.sign({ username }, secretKey);

    const newToken = new Token({ username });
    await newToken.save();

    res.json({ token, username });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  signup,
};
