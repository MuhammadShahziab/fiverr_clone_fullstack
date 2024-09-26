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
