import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const register = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      return next(createError(400, "Username is already exist!"));
    }
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      return next(createError(400, "Email is already exist!"));
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });
    await newUser.save();

    res.status(201).send("User has been created");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(400).json({ message: "Wrong password or username!" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...otherInfo } = user._doc;
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .send(otherInfo);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accesstoken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
