const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "YOUR_SECRET_KEY";
const email_addressRegex = /^\S+@\S+\.\S+$/;
const phone_numberRegex = /^\d{11}$/;

const salt = 10;

const signup = async (req, res) => {
  try {
    const {
      email_address,
      password,
      full_name,
      phone_number,
      gender,
      area,
      age,
      cnic_image,
      preferences,
      userType,
    } = req.body;
    console.log(email_address);

    if (
      !email_address ||
      email_address === "" ||
      !email_address.match(email_addressRegex)
    ) {
      console.log("email_address validation");
      return res
        .status(400)
        .json({ message: " Invalid email format", status: 400 });
    } else {
      if (!password || password === "" || password.length < 8) {
        console.log("password validation");
        return res.status(400).json({
          message:
            "Invalid password, Password must be at least 8 characters long.",
          status: 400,
        });
      } else {
        if (!full_name || full_name === "") {
          return res
            .status(400)
            .json({ message: "Please enter valid username", status: 400 });
        } else {
          if (
            !phone_number ||
            phone_number === "" ||
            !phone_number.match(phone_numberRegex)
          ) {
            return res.status(400).json({
              message: "Please enter valid phone number",
              status: 400,
            });
          } else {
            if (!gender || gender === "") {
              return res
                .status(400)
                .json({ message: "Invalid gender", status: 400 });
            } else if (!area || area === "") {
              return res
                .status(400)
                .json({ message: "Invalid area", status: 400 });
            }

            if (userType == "SERVICE_PROVIDER" && !cnic_image) {
              return res
                .status(400)
                .json({ message: "CNIC image is required", status: 400 });
            }

            const exitingUser = await User.findOne({ email_address });
            if (!exitingUser) {
              let hashedPassword = await bcrypt.hash(password, salt);

              const newUser = new User({
                email_address: email_address,
                password: hashedPassword,
                full_name: full_name,
                phone_number: phone_number,
                gender: gender,
                area: area,
                age: age,
                preferences: preferences,
                cnic_image: cnic_image,
                user_type: userType,
                isActive: userType === "SERVICE_PROVIDER" ? false : true,
                dateCreated: Date.now(),
              });

              const savedUser = await newUser.save();
              console.log(savedUser);
              res
                .status(200)
                .json({ message: "Your Account has been created successfull" });
            } else {
              console.log("duplicate constraint");
              res.status(409).json({
                message:
                  "User already exists with the provided email address and phone_number!",
                status: 409,
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    // do your code here
    const { email_address, password } = req.body;

    if (
      !email_address ||
      email_address === "" ||
      !email_address.match(email_addressRegex)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid email format", status: 400 });
    } else {
      if (!password || password === "" || password.length < 8) {
        return res.status(200).json({
          message: "Password must be at least 8 characters long.",
          status: 400,
        });
      } else {
        const user = await User.findOne({ email_address });

        if (!user) {
          return res.status(200).json({
            message: "User not found with provided email address",
            status: 404,
          });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          res.status(200).json({ message: "Invalid password!", status: 401 });
        } else {
          const payload = {
            email_Address: user.email_address,
            user_id: user._id,
            user: user,
          };

          const authToken = jwt.sign(payload, SECRET_KEY);
          console.log(user);
          return res.status(200).json({
            message: "Login successfull",
            status: 200,
            role: user.user_type,
            isAccountActive: user.isActive,
            data: {
              authToken: authToken,
              full_name: user.full_name,
              email_address: user.email_address,
              area: user.area,
              id: user._id,
              phone_number: user.phone_number,
              profilePicture: user.profilePicture,
              gender: user.gender,
            },
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", status: 500, error: error });
  }
};

const getServiceProviders = async (req, res) => {
  try {
    const serviceProviders = await User.find({ user_type: "SERVICE_PROVIDER" });
    res.status(200).json(serviceProviders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.query;
  try {
    await User.findByIdAndDelete(_id);
    res.status(201).json(_id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveUser = async (req, res) => {
  const { _id } = req.query;
  try {
    const user = await User.findByIdAndUpdate(_id, { isActive: true });
    res.status(201).json(_id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserLocation = async (req, res) => {
  const { _id } = req.query;
  const { area } = req.body;
  try {
    const user = await User.findByIdAndUpdate(_id, { area: area });
    res.status(201).json({
      message: "Login successfull",
      status: 201,
      role: user.user_type,
      isAccountActive: user.isActive,
      data: {
        full_name: user.full_name,
        email_address: user.email_address,
        area: user.area,
        id: user._id,
        phone_number: user.phone_number,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfilePic = async (req, res) => {
  const { _id } = req.query;
  const { profileUrl } = req.body;
  console.log(profileUrl);
  try {
    const user = await User.findByIdAndUpdate(_id, {
      profilePicture: profileUrl,
    });
    res.status(200).json({
      message: "Login successfull",
      status: 200,
      role: user.user_type,
      isAccountActive: user.isActive,
      data: {
        full_name: user.full_name,
        email_address: user.email_address,
        area: user.area,
        id: user._id,
        phone_number: user.phone_number,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  const { _id } = req.query;
  const { newPassword, oldPassword } = req.body;

  try {
    if (oldPassword === newPassword) {
      res.status(200).json({ message: "Old and new passwords are same." });
      return;
    }

    const userData = await User.findById(_id);
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      userData.password
    );

    if (!isPasswordValid) {
      res.status(200).json({ message: "Old password is invalid!" });
      return;
    }

    let hashedPassword = await bcrypt.hash(newPassword, salt);
    const user = await User.findByIdAndUpdate(_id, {
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Password Changed",
      status: 201,
      role: user.user_type,
      isAccountActive: user.isActive,
      data: {
        full_name: user.full_name,
        email_address: user.email_address,
        area: user.area,
        id: user._id,
        phone_number: user.phone_number,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchUserById = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const user = await User.findById(id);
    console.log(user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Could not fetch name by id: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  updateUserLocation,
  getServiceProviders,
  deleteUser,
  approveUser,
  fetchUserById,
  updateUserPassword,
  updateUserProfilePic,
};
