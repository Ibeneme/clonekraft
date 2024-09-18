import React from "react";
import styled from "styled-components";

// Import images from the assets directory
import bedImage from "../../../assets/bed.png";
import officeImage from "../../../assets/dining.png";
import livingRoomImage from "../../../assets/sofa.png";
import diningRoomImage from "../../../assets/dining.png";

// Styled component for the entire container
const Container = styled.div`
  padding: 80px 16px;
  background-color: #fff;
`;

// Styled component for the grid of images
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 0 0px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr; /* Stack the images in a column on smaller screens */
  }
`;

// Styled component for each image card
const ImageCard = styled.div`
  text-align: center;
`;

// Styled component for the image
const Image = styled.img`
  width: 100%;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

// Styled component for the image description text
const ImageText = styled.p`
  font-size: 16px;
  color: #121212;
  margin-top: 12px;
`;

const RoomGrid = () => {
  return (
    <Container>
      <ImageGrid>
        {/* First Image - Bed */}
        <ImageCard>
          <Image src={bedImage} alt="Bed" />
          <ImageText>Bed</ImageText>
        </ImageCard>

        {/* Second Image - Office */}
        <ImageCard>
          <Image src={officeImage} alt="Office" />
          <ImageText>Office</ImageText>
        </ImageCard>

        {/* Third Image - Living Room */}
        <ImageCard>
          <Image src={livingRoomImage} alt="Living Room" />
          <ImageText>Living Room</ImageText>
        </ImageCard>

        {/* Fourth Image - Dining Room */}
        <ImageCard>
          <Image src={diningRoomImage} alt="Dining Room" />
          <ImageText>Dining Room</ImageText>
        </ImageCard>
      </ImageGrid>
    </Container>
  );
};

export default RoomGrid;
