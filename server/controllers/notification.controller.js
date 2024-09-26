import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.userId })
      .sort({
        createdAt: -1,
      })
      .populate({ path: "senderId", model: "User" });

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const updateNotification = async (req, res, next) => {
  try {
    const updateNotifications = await Notification.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { isRead: true },
      },
      {
        new: true,
      }
    ).sort({
      createdAt: -1,
    });

    res.status(201).json(updateNotifications);
  } catch (error) {
    next(error);
  }
};
