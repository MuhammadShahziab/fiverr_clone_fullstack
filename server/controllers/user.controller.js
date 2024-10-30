import User from "../models/user.model.js";
import createError from "../utils/createError.js";
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can only delete your Account!"));
  }
  await User.findByIdAndDelete(req.params.id);

  res.status(200).send("Deleted!");
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { phone, desc, img, country } = req.body; // updated field here
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          phone,
          desc,
          img,
          country, // updated field here
        },
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};
