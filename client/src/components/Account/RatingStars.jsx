import React, { useState } from "react";

const RatingStars = ({ initialValue, onRatingChange }) => {
  const [rating, setRating] = useState(initialValue);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div className="rating">
      <input
        type="radio"
        id="star5"
        className="star"
        name="rate"
        value="5"
        onClick={() => handleStarClick(5)}
      />
      <label htmlFor="star5" title="text" style={{ marginTop: "0px" }}></label>
      <input
        type="radio"
        id="star4"
        className="star"
        name="rate"
        value="4"
        onClick={() => handleStarClick(4)}
      />
      <label htmlFor="star4" title="text" style={{ marginTop: "0px" }}></label>
      <input
        type="radio"
        id="star3"
        className="star"
        name="rate"
        value="3"
        onClick={() => handleStarClick(3)}
      />
      <label htmlFor="star3" title="text" style={{ marginTop: "0px" }}></label>
      <input
        type="radio"
        id="star2"
        className="star"
        name="rate"
        value="2"
        onClick={() => handleStarClick(2)}
      />
      <label htmlFor="star2" title="text" style={{ marginTop: "0px" }}></label>
      <input
        type="radio"
        id="star1"
        className="star"
        name="rate"
        value="1"
        onClick={() => handleStarClick(1)}
      />
      <label htmlFor="star1" title="text" style={{ marginTop: "0px" }}></label>
    </div>
  );
};

export default RatingStars;
