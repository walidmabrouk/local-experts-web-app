import React, { useState } from "react";

const RatingStars = ({ initialValue, onRatingChange }) => {
  const [rating, setRating] = useState(initialValue);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div className="rating">
      {[5,4,3,2,1].map((star) => (
        <React.Fragment key={star}>
          <input
            type="radio"
            id={`star${star}`}
            name="rate"
            value={star}
            checked={star === rating}
            onChange={() => handleStarClick(star)}
          />
          <label htmlFor={`star${star}`} title="text"></label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default RatingStars;
