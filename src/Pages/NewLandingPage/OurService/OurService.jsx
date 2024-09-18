import React from "react";
import { FaBuilding, FaHome, FaCrown } from "react-icons/fa"; // Importing icons from react-icons
import styled from "styled-components";

// Styled component for the entire container
const Container = styled.div`
  padding: 120px 16px;
  background-color: #fff;
`;

// Styled component for the heading (h1)
const Heading = styled.h1`
  margin: 48px 12px;
  text-align: center;
  font-size: 32px;
  color: #121212;
`;

// Styled component for the cards grid
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 0 0;
  background-color: #fff;

  @media (max-width: 900px) {
    grid-template-columns: 1fr; /* Stack the cards in a column on smaller screens */
  }
`;

// Styled component for each card
const Card = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// Styled component for the icon wrapper
const IconWrapper = styled.div`
  background-color: #e3e3e345;
  border-radius: 50%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

// Styled component for the card title
const CardTitle = styled.h3`
  font-size: 16px;
  color: #121212;
  margin-bottom: 8px;
`;

// Styled component for the card description
const CardDescription = styled.p`
  font-size: 13px;
  color: #121212;
`;

const OurService = () => {
  return (
    <Container>
      <Heading>About Our Service</Heading>
      <CardGrid>
        {/* First Card - Commercial Design */}
        <Card>
          <IconWrapper>
            <FaBuilding size={18} color="#121212" />{" "}
            {/* Commercial Design Icon */}
          </IconWrapper>
          <CardTitle>Commercial Design</CardTitle>
          <CardDescription>
            Bespoke furniture and interior solutions for offices, hotels, and
            other commercial spaces, focusing on brand identity and
            functionality.
          </CardDescription>
        </Card>

        {/* Second Card - Residential Design */}
        <Card>
          <IconWrapper>
            <FaHome size={18} color="#121212" /> {/* Residential Design Icon */}
          </IconWrapper>
          <CardTitle>Residential Design</CardTitle>
          <CardDescription>
            Custom furniture design and interior design consultation tailored to
            enhance the beauty and functionality of homes.
          </CardDescription>
        </Card>

        {/* Third Card - Legacy of Legends Collection */}
        <Card>
          <IconWrapper>
            <FaCrown size={18} color="#121212" />{" "}
            {/* Legacy of Legends Collection Icon */}
          </IconWrapper>
          <CardTitle>Legacy of Legends Collection</CardTitle>
          <CardDescription>
            A premium custom furniture collection celebrating iconic figures,
            available through exclusive auctions for collectors and art
            enthusiasts.
          </CardDescription>
        </Card>
      </CardGrid>
    </Container>
  );
};

export default OurService;