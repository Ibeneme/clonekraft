import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
//import bannerImage from "../../../assets/team.png"; // Replace with your banner image path
import founder1 from "../../../assets/lukas.png"; // Replace with founder images
import founder2 from "../../../assets/ibeneme.png";
import founder3 from "../../../assets/ju.png";
import founder4 from "../../../assets/gbola.png";

// Styled component for the main container
const Container = styled.div`
  background-color: #fff;
  padding: 0px 0px;
`;

// Styled component for the banner section with background image
// const BannerSection = styled.section`
//   background: url(${bannerImage}) no-repeat center center/cover;
//   color: #fff;
//   padding: 80px 16px;
//   text-align: center;
//   border-radius: 12px;
//   margin-bottom: 40px;
//   margin-right: -16px;
//   margin-left: -16px @media (max-width: 900px) {
//     padding: 60px 16px;
//   }
// `;

const BannerHeading = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const BannerText = styled.p`
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

// Styled component for the vision and services section
const VisionServicesSection = styled.section`
  background-color: #FFF3DD;
  padding: 120px 48px;
  border-radius: 12px;

  @media (max-width: 600px) {
    padding: 120px 16px;
  }

`;

const VisionServicesHeading = styled.h2`
  font-size: 28px;
  color: #121212;
  margin-bottom: 20px;
  text-align: left;
`;

const VisionServicesText = styled.p`
  font-size: 16px;
  color: #121212;
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
`;

const TeamImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const TeamName = styled.h3`
  font-size: 18px;
  color: #121212;
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
      {/* Banner Section */}
      {/* <BannerSection>
        <BannerHeading>About Us</BannerHeading>
        <BannerText>
          At Lukas Design Lab, we’re not just building furniture—we’re forging
          statements, creating icons, and leaving a mark that transcends time.
          Driven by a relentless passion for design and a thirst for innovation,
          we’ve carved out a space where artistry meets cutting-edge technology,
          setting a new standard in luxury and bespoke craftsmanship.
        </BannerText>
      </BannerSection> */}

      {/* Vision and Services Section */}
      <VisionServicesSection>
        <VisionServicesContainer>
          <VisionServicesHeading>Our Vision</VisionServicesHeading>
          <VisionServicesText>
            We’re here to push boundaries and redefine what’s possible in the
            world of design. Our mission is simple: create furniture that
            doesn’t just occupy space but commands attention. Every piece we
            craft is a fusion of bold creativity and precise execution, meant to
            ignite inspiration, stir emotions, and stand tall through the ages.
          </VisionServicesText>

          <VisionServicesHeading>Our Services</VisionServicesHeading>
          <VisionServicesText>
            Lukas Design Lab is where visionaries come to life. We offer an
            array of high-end services tailored to disrupt the ordinary and
            elevate the extraordinary:
            <br />
            <br />
            <strong>Custom Furniture Design:</strong> No cookie-cutter designs
            here. We create custom pieces that speak to your style, needs, and
            the legacy you want to build. It’s all about delivering something
            that’s uniquely you.
            <br />
            <br />
            <strong>Commercial Design Solutions:</strong> Your business deserves
            an environment that screams its brand identity. We provide design
            solutions that don’t just look good—they amplify your brand and
            create experiences that leave a lasting impact.
            <br />
            <br />
            <strong>Legacy of Legends Collection:</strong> This isn’t just
            furniture; it’s a tribute to greatness. Each piece in our exclusive
            collection celebrates iconic figures with designs that are as
            legendary as the people they honor. For collectors, art lovers, and
            those who demand the best, this is where history meets design.
            <br />
            <br />
            <strong>Clonekraft:</strong> Forget the old ways of doing things.
            Clonekraft is our game-changing replica app that puts luxury design
            at your fingertips. Get high-quality replicas of your favorite
            designs with ease and precision, all without breaking a sweat.
          </VisionServicesText>

          <VisionServicesHeading>Our Process</VisionServicesHeading>
          <VisionServicesText>
            We don’t follow trends; we set them. At Lukas Design Lab, every
            project is a mission to create something that hasn’t been seen
            before. From the initial spark of an idea to the final, jaw-dropping
            product, we work with you every step of the way to turn your vision
            into reality—with a whole lot of attitude and zero compromises.
          </VisionServicesText>

          <VisionServicesHeading>
            Our Commitment to Innovation
          </VisionServicesHeading>
          <VisionServicesText>
            We’re not interested in the status quo. Our commitment to innovation
            drives us to explore new frontiers in design and technology. With
            AI-powered tools like Clonekraft PatentGuard, we ensure that every
            design we bring to life is not only stunning but also original and
            protected. We’re here to make sure you stand out, not blend in.
          </VisionServicesText>

          <VisionServicesHeading>Meet Our Team</VisionServicesHeading>
          <VisionServicesText>
            Our team is a powerhouse of talent and creativity. With a crew of
            bold designers, sharp engineers, and marketing mavericks, Lukas
            Design Lab is a force to be reckoned with. We don’t just work
            together—we collaborate, challenge, and push each other to create
            designs that don’t just meet expectations—they shatter them.
          </VisionServicesText>

          <VisionServicesHeading>Join Us on Our Journey</VisionServicesHeading>
          <VisionServicesText>
            If you’re ready to elevate your space, make a statement, or own a
            piece of history with our Legacy of Legends collection, remember:
            Lukas Design Lab is what it is. Step into our world of endless
            possibilities, and let’s create something legendary together.
            <br />
            <br />
            No Limits. No Compromises. Just Pure Innovation.
          </VisionServicesText>
        </VisionServicesContainer>
      </VisionServicesSection>

      {/* Management Team Section */}
      <ManagementTeamSection>
        <ManagementTeamGrid>
          {/* Team Member 1 */}
          <TeamMember>
            <TeamImage src={founder1} alt="Lucky Lukas Ibeh" />
            <TeamName>Lucky Lukas Ibeh</TeamName>
            <TeamRole>Chief Executive Officer</TeamRole>
          </TeamMember>

          {/* Team Member 2 */}
          <TeamMember>
            <TeamImage src={founder2} alt="Ikenna Ibeneme" />
            <TeamName>Ikenna Ibeneme</TeamName>
            <TeamRole>Chief Technology Officer</TeamRole>
          </TeamMember>

          {/* Team Member 3 */}
          <TeamMember>
            <TeamImage src={founder3} alt="Judith Ichado" />
            <TeamName>Judith Ichado</TeamName>
            <TeamRole>Chief Communications Officer</TeamRole>
          </TeamMember>

          {/* Team Member 4 */}
          <TeamMember>
            <TeamImage src={founder4} alt="Gbolahan Ifeoluwa" />
            <TeamName>Gbolahan Ifeoluwa</TeamName>
            <TeamRole>Chief Operating Officer</TeamRole>
          </TeamMember>
        </ManagementTeamGrid>
      </ManagementTeamSection>
    </Container>
  );
};

// PropTypes for validation (optional)
AboutUsSection.propTypes = {
  //bannerImage: PropTypes.string.isRequired,
  founderImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AboutUsSection;
