import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import OurTeam from "./Our_Teams/OurTeams";

// Styled component for the main container
const Container = styled.div`
  background-color: #fff;
  padding: 0px 0px;
  color: var(--darkBlue);
`;

// Styled component for the vision and services section
const VisionServicesSection = styled.section`
  background-color: #fff3dd;
  padding: 120px 48px;
  border-radius: 12px;
  color: var(--darkBlue);

  @media (max-width: 600px) {
    padding: 120px 16px;
  }
`;

const VisionServicesHeading = styled.h2`
  font-size: 28px;
  color: var(--darkBlue);
  margin-bottom: 20px;
  text-align: left;
  font-family: var(--font-lalezar);
`;

const VisionServicesText = styled.p`
  font-size: 16px;
  color: var(--darkBlue);
  margin-bottom: 40px;
  line-height: 1.6;
  text-align: left;
`;

const VisionServicesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

// Styled component for the management team grid
const ManagementTeamSection = styled.section`
  padding: 60px 0px;
`;

const ManagementTeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
  color: var(--darkBlue);
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  padding: 12px;
  color: var(--darkBlue);
`;

const TeamImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const TeamName = styled.h3`
  font-size: 18px;
  color: var(--darkBlue);
  margin: 8px 0;
`;

const TeamRole = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const AboutUsSection = () => {
  return (
    <Container>
      {/* Vision and Services Section */}
      <VisionServicesSection>
        <VisionServicesContainer>
          <VisionServicesHeading>Our Vision</VisionServicesHeading>
          <VisionServicesText>
            At Lukas Design Lab, we aim to push the boundaries of design,
            blending bold creativity with precision to create furniture that
            does more than occupy space—it commands attention. Each piece we
            craft is a fusion of innovation and artistry, designed to inspire
            and evoke emotion while standing the test of time.
          </VisionServicesText>

          <VisionServicesHeading>Our Services</VisionServicesHeading>
          <VisionServicesText>
            We offer a wide range of high-end services that break the norm and
            bring extraordinary to life:
            <br />
            <br />
            <strong style={{ fontFamily: `var(--font-lalezar`, fontSize: 20 }}>
              Custom Furniture Design:
            </strong>{" "}
            We don’t do cookie-cutter designs. Every piece is a unique
            reflection of your style, needs, and the legacy you wish to create.
            <br />
            <br />
            <strong style={{ fontFamily: `var(--font-lalezar`, fontSize: 20 }}>
              Commercial Design Solutions:
            </strong>{" "}
            We help businesses transform their spaces into environments that
            amplify brand identity and leave lasting impressions.
            <br />
            <br />
            <strong style={{ fontFamily: `var(--font-lalezar`, fontSize: 20 }}>
              Legacy of Legends Collection:
            </strong>{" "}
            A tribute to greatness. Each design in this exclusive collection
            celebrates legendary figures, blending history with unmatched
            craftsmanship.
            <br />
            <br />
            <strong style={{ fontFamily: `var(--font-lalezar`, fontSize: 20 }}>
              Clonekraft:
            </strong>{" "}
            Our game-changing replica app offers you access to high-quality
            replicas of luxury designs, all at your fingertips.
          </VisionServicesText>

          <VisionServicesHeading>Our Process</VisionServicesHeading>
          <VisionServicesText>
            At Lukas Design Lab, we don’t follow trends; we create them. From
            concept to completion, we’re with you every step of the way,
            ensuring your vision is realized—without compromise.
          </VisionServicesText>

          <VisionServicesHeading>
            Our Commitment to Innovation
          </VisionServicesHeading>
          <VisionServicesText>
            We’re not satisfied with the status quo. Innovation is at the heart
            of everything we do, utilizing tools like Clonekraft PatentGuard to
            ensure our designs remain groundbreaking, original, and protected.
          </VisionServicesText>

          <VisionServicesHeading>Meet Our Team</VisionServicesHeading>
          <VisionServicesText>
            Our team is a dynamic blend of creativity, expertise, and
            forward-thinking. Designers, engineers, and marketers work
            hand-in-hand to push the envelope and create the unexpected.
          </VisionServicesText>

          <VisionServicesHeading>Join Us on Our Journey</VisionServicesHeading>
          <VisionServicesText>
            Ready to elevate your space or own a piece of history? Lukas Design
            Lab is where innovation meets legacy. Let’s create something
            legendary together.
            <br />
            <br />
            No Limits. No Compromises. Just Pure Innovation.
          </VisionServicesText>
        </VisionServicesContainer>
      </VisionServicesSection>

      <OurTeam />
    </Container>
  );
};

// PropTypes for validation (optional)
AboutUsSection.propTypes = {
  founderImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AboutUsSection;
