import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Styled component for the main container
const Container = styled.div`
  padding: 16px 48px;

  @media (max-width: 900px) {
    padding: 16px 16px;
  }
`;

// Styled component for the section with a linear gradient background
const GradientSection = styled.section`
  background: linear-gradient(90deg, #f9f1de 0%, #fdf5e1 100%);
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 12px;
  padding: 40px;
  gap: 48px;
  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

// Styled component for the text and CTA
const TextContainer = styled.div`
  flex: 1;
  margin-right: ${({ direction }) =>
    direction.includes("row") ? "24px" : "0"};

  @media (max-width: 900px) {
    margin-right: 0;
    margin-bottom: ${({ direction }) =>
      direction.includes("column") ? "24px" : "0"};
  }
`;

const Header = styled.h2`
  font-size: 44px;
  color: #121212;
  margin-bottom: 16px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #121212;
  margin-bottom: 24px;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 16px 32px;
  background-color: transparent;
  border: 1px solid #c19d61;
  color: #c19d61;
  text-decoration: none;
  border-radius: 48px;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #c19d61;
    color: #fff;
  }
`;

// Styled component for the image
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 12px;
`;

const CloneKraftSection = ({
  direction,
  headerText,
  paragraphText,
  buttonText,
  imageSrc,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("clone_kraft_user_token");

    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <GradientSection direction={direction}>
        <TextContainer direction={direction}>
          <Header>{headerText}</Header>
          <Paragraph>{paragraphText}</Paragraph>
          <CTAButton onClick={handleClick} href="#">
            {buttonText}
          </CTAButton>
        </TextContainer>
        <ImageContainer>
          <Image src={imageSrc} alt="Design example" />
        </ImageContainer>
      </GradientSection>
    </Container>
  );
};

// PropTypes for validation
CloneKraftSection.propTypes = {
  direction: PropTypes.oneOf([
    "row",
    "row-reverse",
    "column",
    "column-reverse",
  ]),
  headerText: PropTypes.string.isRequired,
  paragraphText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

// Default props
CloneKraftSection.defaultProps = {
  direction: "row", // Default direction
};

export default CloneKraftSection;
