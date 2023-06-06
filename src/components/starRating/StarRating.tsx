import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const roundedRating = Math.round(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) {
      stars.push(<span key={i} className='text-yellow-500'>&#9733;</span>); // Full star
    } else {
      stars.push(<span key={i} className='text-gray-500'>&#9734;</span>); // Empty star
    }
  }

  return <div>{stars}</div>;
};

export default StarRating;
