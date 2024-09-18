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
  font-size: 18px; /* Increased font size for better readability */
  color: #121212;
  margin-bottom: 12px; /* Added margin for spacing */
`;

// Styled component for the card description
const CardDescription = styled.p`
  font-size: 15px; /* Increased font size for better readability */
  color: #121212;
  line-height: 1.5; /* Improved readability with line height */
  text-align: center; /* Center align text for consistency */
`;

const OurService = () => {
  return (
    <Container>
      <Heading>About Our Service</Heading>
      <CardGrid>
        {/* First Card - Commercial Design */}
        <Card>
          <IconWrapper>
            <FaBuilding size={24} color="#121212" /> {/* Commercial Design Icon */}
          </IconWrapper>
          <CardTitle>Commercial Design</CardTitle>
          <CardDescription>
            We specialize in crafting bespoke furniture and providing comprehensive
            interior design solutions for a variety of commercial spaces, including
            offices, hotels, and retail environments. Our approach focuses on enhancing
            brand identity and functionality, creating environments that not only meet
            operational needs but also leave a strong, memorable impression on clients
            and visitors. Whether you're looking to redesign an office to foster creativity
            or create a luxurious hotel lobby that sets the standard, our designs make
            an impactful statement.
          </CardDescription>
        </Card>

        {/* Second Card - Residential Design */}
        <Card>
          <IconWrapper>
            <FaHome size={24} color="#121212" /> {/* Residential Design Icon */}
          </IconWrapper>
          <CardTitle>Residential Design</CardTitle>
          <CardDescription>
            Our residential design services are all about transforming your home into
            a space that reflects your personality and lifestyle. From custom furniture
            pieces to complete interior design consultations, we work closely with you
            to ensure every detail is tailored to your needs and preferences. Our goal
            is to create harmonious living spaces that are both aesthetically pleasing
            and functionally efficient, providing a sanctuary that you will be proud to
            call home.
          </CardDescription>
        </Card>

        {/* Third Card - Legacy of Legends Collection */}
        <Card>
          <IconWrapper>
            <FaCrown size={24} color="#121212" /> {/* Legacy of Legends Collection Icon */}
          </IconWrapper>
          <CardTitle>Legacy of Legends Collection</CardTitle>
          <CardDescription>
            Discover our exclusive Legacy of Legends Collection, a premium line of
            custom furniture designed to honor and celebrate iconic figures throughout
            history. Each piece is meticulously crafted to embody the essence of the
            legends it commemorates, blending artistic innovation with historical reverence.
            Available through exclusive auctions, these one-of-a-kind creations offer
            collectors and art enthusiasts a unique opportunity to own a tangible piece
            of history and artistry that stands as a testament to timeless excellence.
          </CardDescription>
        </Card>
      </CardGrid>
    </Container>
  );
};

export default OurService;