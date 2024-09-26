import FavList from "../models/favList.model.js";
import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";
export const createFavList = async (req, res, next) => {
  try {
    const existingList = await FavList.findOne({
      userId: req.userId,
      name: req.body.name,
    });

    if (existingList) {
      return next(createError(403, "You already have a list with this name!"));
    }
    const newList = new FavList({
      userId: req.userId,
      name: req.body.name,
      gigs: [],
    });

    const saveList = await newList.save();
    res.status(201).json(saveList);
  } catch (error) {
    next(error);
  }
};

export const addToFavList = async (req, res, next) => {
  try {
    const { gigId } = req.body;
    const { listId } = req.params;

    const list = await FavList.findById(listId);
    if (list) {
      if (!list.gigs.includes(gigId)) {
        list.gigs.push(gigId);
        const updatedList = await list.save();
        res.status(200).json(updatedList);
      } else {
        // If the gigId already exists, return an appropriate response
        return createError(400, "Gig is already in the list");
      }
    } else {
      return next(createError(404, "List not found!"));
    }
  } catch (error) {
    next(error);
  }
};
export const getCreatedList = async (req, res, next) => {
  try {
    const lists = await FavList.find({ userId: req.userId }).populate({
      path: "gigs",
      model: "Gig",
    });
    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
};
export const getFavGigs = async (req, res, next) => {
  try {
    const list = await FavList.find({
      userId: req.userId,
      name: req.params.listName,
    })
      .populate({
        path: "gigs",
        model: "Gig",
      })
      .populate({
        path: "userId",
        model: "User",
      });

    if (!list) {
      return createError(404, "List Not Found");
    }
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const deleteFavList = async (req, res, next) => {
  try {
    const list = await FavList.findByIdAndDelete(req.params.listId);
    if (list) {
      res.status(200).json("List has been deleted");
    } else {
      return createError(404, "List not found!");
    }
  } catch (error) {
    next(error);
  }
};

export const updateFavList = async (req, res, next) => {
  try {
    const list = await FavList.findByIdAndUpdate(
      req.params.listId,
      {
        $set: { name: req.body.name },
      },
      { new: true }
    );
    if (list) {
      res.status(200).json("List has been updated");
    } else {
      return createError(404, "List not found!");
    }
  } catch (error) {
    next(error);
  }
};

export const removeToFavList = async (req, res, next) => {
  try {
    const { gigId } = req.body;
    const { listId } = req.params;

    const list = await FavList.findById(listId);
    if (list) {
      list.gigs = list.gigs.filter((id) => id.toString() !== gigId);
      const updatedList = await list.save();
      res.status(200).json(updatedList);
    } else {
      return next(createError(404, "List not found!"));
    }
  } catch (error) {
    next(error);
  }
};
