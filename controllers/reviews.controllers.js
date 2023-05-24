const Review = require ("../models/Review.model");

// Controller to add a review
const addReview = async (req, res) => {
  const { professionalId, clientId, rating, comment } = req.body;

  try {
    const review = await Review.create({
      professionalId,
      clientId,
      rating,
      comment,
    });

    res.status(201).json({ review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
};

// Controller to get all reviews for a professional
const getProfessionalReviews = async (req, res) => {
  const { professionalId } = req.params;

  try {
    const reviews = await Review.find({ professionalId }).populate("clientId",);
res.send(reviews);
    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error getting professional reviews:", error);
    res.status(500).json({ message: "Failed to get professional reviews" });
  }
};




module.exports = {
  addReview,
  getProfessionalReviews,
};
