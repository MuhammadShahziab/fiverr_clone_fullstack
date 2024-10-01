import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only Seller can create a Gig!"));
  }

  const newGig = new Gig({ userId: req.userId, ...req.body });

  try {
    const savedGig = await newGig.save();

    res.status(200).json(savedGig);
  } catch (error) {
    next(error);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (gig.userId !== req.userId) {
      return next(createError(403, "You can only delete your gig!"));
    }
    await Gig.findByIdAndDelete(req.params.id);

    res.status(200).send("Gig has been deletd!");
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) return next(createError(404, "Gig not found!")); // Use return to stop execution
    res.status(200).send(gig);
  } catch (error) {
    next(error); // Properly pass the error to the error handler
  }
};

// Fetch Gigs Based on Search Query
export const getGigs = async (req, res, next) => {
  const start = Date.now();
  try {
    const q = req.query;
    const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.cat && { cat: q.cat }),
      ...(q.search && { $text: { $search: q.search } }),
      ...((q.min || q.max) && {
        price: {
          ...(q.min && { $gte: Number(q.min) }),
          ...(q.max && { $lte: Number(q.max) }),
        },
      }),
    };

    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });

    const duration = Date.now() - start;
    console.log(`Query executed in ${duration}ms`); // Log the duration

    res.status(200).send(gigs);
  } catch (error) {
    next(error);
  }
};

// Fetch Search Suggestions Based on Partial User Input
export const getSuggestions = async (req, res, next) => {
  const q = req.query;
  try {
    const gigs = await Gig.find({
      $text: { $search: q.search }, // Full-text search for suggestions
    }).limit(5);

    if (!gigs || gigs.length === 0) {
      return next(createError(404, "No suggestions found!"));
    }

    // Map suggestions based on tags, category, and short title
    const suggestions = gigs.map((gig) => ({
      cat: gig.cat,
      tags: gig.tags,
    }));

    res.status(200).json(suggestions);
  } catch (error) {
    next(error);
  }
};
