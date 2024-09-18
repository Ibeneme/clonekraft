import React from "react";
import NewNavbar from "./Navbar/Navbar";
import HeroSection from "./Hero/HeroSection";
import OurService from "./OurService/OurService";
import RoomGrid from "./OurService/RoomGrid";
import CloneKraftSection from "./OurService/CloneKraftSection";
import exampleImage from "../../assets/clonekraft.png";
import musk from "../../assets/musk.png";
import aliens from "../../assets/aliens.png";

const IndexNewLandingPage = () => {
  return (
    <div>
      <NewNavbar />
      <HeroSection />
      <OurService />
      <RoomGrid />

      {/* CloneKraftSection 1 */}
      <CloneKraftSection
        direction="row" // Can be row, row-reverse, column, column-reverse
        headerText="CLONEKRAFT"
        paragraphText="Have a design that you’ve been dreaming of or a unique piece that you’ve sketched yourself? At Clonekraft, we bring your ideas to life with unparalleled precision and craftsmanship. Our platform allows you to upload your design, and our team of skilled artisans will replicate it with flawless accuracy, maintaining the highest standards of quality and affordability. From custom furniture to intricate home decor, Clonekraft ensures that your vision is realized exactly as you imagined it, combining state-of-the-art technology with expert craftsmanship to deliver products that are not only beautiful but also built to last."
        buttonText="Learn More"
        imageSrc={exampleImage}
      />

      {/* CloneKraftSection 2 */}
      <CloneKraftSection
        direction="row-reverse" // Can be row, row-reverse, column, column-reverse
        headerText="Legacy of Legend"
        paragraphText="Discover the grandeur of our Legacy of Legends Collection, where timeless design meets historical significance. Each piece in this exclusive collection is meticulously crafted to pay homage to iconic figures and legendary achievements. These extraordinary designs are more than just furniture; they are masterpieces that embody stories of greatness and triumph. By owning a piece from the Legacy of Legends Collection, you are not only enhancing your space with exquisite craftsmanship but also connecting with a piece of history that celebrates the achievements of the world's most influential figures. Embrace the legacy and elevate your living environment with a touch of legendary elegance."
        buttonText="Learn More"
        imageSrc={musk}
      />

      {/* CloneKraftSection 3 */}
      <CloneKraftSection
        direction="row" // Can be row, row-reverse, column, column-reverse
        headerText="Sign up and Enjoy using CloneKraft now!"
        paragraphText="Don't miss out on the opportunity to revolutionize your home with CloneKraft. By signing up, you'll gain access to a platform that makes it effortless to bring your dream furniture to life. Our cutting-edge technology ensures each piece is crafted with precision, providing you with high-quality replicas that fit perfectly into your space. Join our growing community of design aficionados who are discovering the future of furniture making with CloneKraft. Whether you're looking to create custom designs or explore our range of unique offerings, your perfect piece is just a click away. Experience the convenience, quality, and creativity that CloneKraft has to offer."
        buttonText="Sign Up"
        imageSrc={aliens}
      />
    </div>
  );
};

export default IndexNewLandingPage;
