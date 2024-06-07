import React from "react";
import styled from "styled-components";
import RatingCard from "./RateCard";

const RatingGrid = ({ ratings }) => {
  return (
    <GridContainer>
      {ratings.map((rating, index) => (
        <RatingCard key={index} rating={rating} />
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
  padding: 12px
`;

export default RatingGrid;
