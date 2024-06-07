import React from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const RatingCard = ({ rating }) => {
  // Calculate the number of full stars and half stars
  const fullStars = Math.floor(rating.rating);
  const halfStar = rating.rating - fullStars >= 0.5;

  // Generate an array of star icons based on the rating
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} />);
  }
  if (halfStar) {
    stars.push(<FaStarHalfAlt key="half" />);
  }

  return (
    <Card>
      <CardContent>
        <RatingContainer>
          <StarContainer>{stars}</StarContainer>
        </RatingContainer>
        <Review>Review: {rating.review}</Review>
        {rating?.description ? (
          <Review>Review: {rating?.description}</Review>
        ) : null}{" "}
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  background-color: #fff;
  margin-top: 12px;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 0px;
  border: 1px solid #ccc;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarContainer = styled.div`
  display: flex;
  color: #f39c12; /* Star color */
`;

const Review = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 0;
`;

export default RatingCard;
