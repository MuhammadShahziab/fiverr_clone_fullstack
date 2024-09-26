import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import Notification from "../models/notification.model.js";
import mongoose from "mongoose";
export const createMessage = async (req, res, next) => {
  const { conversationId, desc } = req.body;
  const senderId = req.userId;

  const newMessage = new Message({
    conversationId,
    userId: senderId,
    desc,
  });

  try {
    // Save the new message
    const savedMessage = await newMessage.save();

    // Update the conversation with the new message details
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: conversationId },
      {
        $set: {
          lastMessage: desc,
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
        },
      },
      { new: true }
    );

    if (!updatedConversation) {
      return res.status(404).send("Conversation not found");
    }

    // Determine the receiver's ID
    const receiverId = req.isSeller
      ? updatedConversation?.buyerId
      : updatedConversation?.sellerId;

    if (senderId !== receiverId) {
      const existingNotification = await Notification.findOne({
        userId: receiverId,
        type: "message",
        senderId,
        conversationId,
        isRead: false,
      });
      if (existingNotification) {
        await Notification.findByIdAndUpdate(existingNotification._id, {
          $inc: { messageCount: 1 },
        });
      } else {
        // Create a new notification if it doesn't exist
        await Notification.create({
          userId: receiverId,
          type: "message",
          senderId,
          message: `You have a new message`,
          conversationId, // Include conversationId if needed
        });
      }
    }

    res.status(200).send(savedMessage);
  } catch (error) {
    console.error("Error creating message or notification:", error); // Log error for debugging
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (error) {
    next(error);
  }
};
