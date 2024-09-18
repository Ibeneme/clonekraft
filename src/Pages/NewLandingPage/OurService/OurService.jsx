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
            <FaBuilding size={24} color="#121212" />{" "}
            {/* Commercial Design Icon */}
          </IconWrapper>
          <CardTitle>Commercial Design</CardTitle>
          <CardDescription>
            Our Commercial Design service is dedicated to providing tailored
            furniture and interior solutions that elevate the functionality and
            aesthetic appeal of commercial spaces. Whether it's for a high-end
            office, a trendy hotel, or a vibrant retail store, our designs are
            crafted to reflect your brand's identity and meet your operational
            needs. We focus on creating environments that are not only visually
            impressive but also optimized for performance, ensuring that your
            space supports your business goals and leaves a lasting impression
            on clients and visitors alike.
            <br />
            We understand the unique demands of commercial settings and
            collaborate closely with clients to deliver solutions that balance
            style and practicality. Our expert team will guide you through every
            step of the process, from conceptualization to installation,
            ensuring a seamless experience and exceptional results.
          </CardDescription>
        </Card>

        {/* Second Card - Residential Design */}
        <Card>
          <IconWrapper>
            <FaHome size={24} color="#121212" /> {/* Residential Design Icon */}
          </IconWrapper>
          <CardTitle>Residential Design</CardTitle>
          <CardDescription>
            Transform your living space into a personalized haven with our
            Residential Design service. We offer custom furniture design and
            comprehensive interior design consultations to enhance the beauty
            and functionality of your home. Our approach is centered around
            understanding your unique style and preferences, creating a
            harmonious environment that reflects your personality and meets your
            lifestyle needs.
            <br />
            From modern minimalist designs to cozy traditional aesthetics, our
            team is skilled in bringing your vision to life. We focus on every
            detail to ensure that your home is not only aesthetically pleasing
            but also comfortable and practical. Whether you're renovating a
            single room or undertaking a complete home makeover, we are here to
            make your dream home a reality.
          </CardDescription>
        </Card>

        {/* Third Card - Legacy of Legends Collection */}
        <Card>
          <IconWrapper>
            <FaCrown size={24} color="#121212" />{" "}
            {/* Legacy of Legends Collection Icon */}
          </IconWrapper>
          <CardTitle>Legacy of Legends Collection</CardTitle>
          <CardDescription>
            Immerse yourself in the grandeur of our Legacy of Legends
            Collection, a premium line of custom furniture that celebrates
            iconic figures from history. Each piece is designed to capture the
            essence of the legends it represents, blending artistic innovation
            with historical reverence. This exclusive collection is perfect for
            collectors and art enthusiasts looking to own unique, one-of-a-kind
            masterpieces.
            <br />
            Available through exclusive auctions, our Legacy of Legends
            Collection offers a rare opportunity to acquire furniture that is
            both a work of art and a piece of history. Each item is crafted with
            meticulous attention to detail, ensuring that it stands as a
            testament to timeless elegance and cultural significance.
          </CardDescription>
        </Card>
      </CardGrid>
    </Container>
  );
};

export default OurService;
