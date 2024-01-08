import React, { useState } from "react";

interface RatingComponentProps {
  minValue: string;
  maxValue: string;
  title: string;
}

const RatingComponent = ({
  minValue,
  maxValue,
  title,
}: RatingComponentProps) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleCircleClick = (value: any) => {
    setSelectedRating(value);
  };

  return (
    <div>
      <h1>{title}</h1>
      <div className="rating-container flex items-center gap-5">
        <p>{minValue}</p>
        <div className="rating-circles">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`circle ${value === selectedRating ? "selected" : ""}`}
              onClick={() => handleCircleClick(value)}
            >
              {value}
            </span>
          ))}
        </div>
        <p>{maxValue}</p>
      </div>
    </div>
  );
};

export default RatingComponent;
