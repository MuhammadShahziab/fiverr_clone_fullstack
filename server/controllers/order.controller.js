import Gig from "../models/gig.model.js";
import Notification from "../models/notification.model.js";
import Order from "../models/order.model.js";
import Stripe from "stripe";
import createError from "../utils/createError.js";

export const intent = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (req.isSeller || gig.userId === req.isSeller) {
      return res.status(401).json({ message: "Seller Can't Create Order!" });
    }

    const stripe = new Stripe(process.env.STRIPE_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig?.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { isSeller: req.userId } : { buyerId: req.userId }),
    });
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

export const upudateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!req.isSeller && order.isSeller !== req.userId) {
      return createError(403, "You can only update your order!");
    }

    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: { isCompleted: req.body.isCompleted },
      },
      { new: true }
    );
    if (!updateOrder) {
      return createError(404, "Order not found");
    }
    res.status(200).send(updateOrder);
  } catch (error) {
    next(error);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY);
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.body.payment_intent
    );

    if (paymentIntent.status === "succeeded") {
      // Check if an order with this payment intent already exists
      const existingOrder = await Order.findOne({
        payment_intent: paymentIntent.id,
      });
      if (existingOrder) {
        return res.status(400).send("Order already created for this payment.");
      }

      const gig = await Gig.findById(req.body.gigId);
      if (!gig) {
        return res.status(404).json({ message: "Gig not found" });
      }

      const newOrder = new Order({
        gigId: gig._id,
        img: gig?.images[0],
        title: gig?.title,
        buyerId: req.userId,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: paymentIntent.id,
      });
      await newOrder.save();

      await Gig.findByIdAndUpdate(
        gig._id,
        {
          $inc: { sales: 1 },
        },
        { new: true }
      );

      await Notification.create({
        userId: gig.userId,
        type: "order",
        message: `You have a new order `,
        senderId: req.userId,
      });

      res.status(200).send("Order has been confirmed and created.");
    } else {
      res.status(400).send("Payment not successful.");
    }
  } catch (error) {
    next(error);
  }
};
