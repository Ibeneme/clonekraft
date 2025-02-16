import React from "react";
import "./Us.css";
import { useNavigate } from "react-router-dom";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const Us = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("clone_kraft_user_token");

  const handleClick = () => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="about-us-container">
      <section className="about-us-intro">
        <h1 className="about-us-header">Our Vision</h1>
        <p className="about-us-text">
          We’re here to push boundaries and redefine what’s possible in the
          world of design. Our mission is simple: create furniture that doesn’t
          just occupy space but commands attention. Every piece we craft is a
          fusion of bold creativity and precise execution, meant to ignite
          inspiration, stir emotions, and stand tall through the ages.
        </p>
      </section>
      <section className="about-us-intro">
        <h2 className="about-us-header">Our Services</h2>
        <div className="about-us-text">
          <h3>Custom Furniture Design</h3>
          <p>
            No cookie-cutter designs here. We create custom pieces that speak to
            your style, needs, and the legacy you want to build. It’s all about
            delivering something that’s uniquely you.
          </p>
        </div>
        <br /> <br />
        <div className="about-us-text">
          <h3>Commercial Design Solutions</h3>
          <p>
            Your business deserves an environment that screams its brand
            identity. We provide design solutions that don’t just look good—they
            amplify your brand and create experiences that leave a lasting
            impact.
          </p>
        </div>
        <br /> <br />
        <div className="about-us-text">
          <h3>Legacy of Legends Collection</h3>
          <p>
            This isn’t just furniture; it’s a tribute to greatness. Each piece
            in our exclusive collection celebrates iconic figures with designs
            that are as legendary as the people they honor. For collectors, art
            lovers, and those who demand the best, this is where history meets
            design.
          </p>
        </div>
        <br /> <br />
        <div className="about-us-text">
          <h3>Clonekraft</h3>
          <p>
            Forget the old ways of doing things. Clonekraft is our game-changing
            replica app that puts luxury design at your fingertips. Get
            high-quality replicas of your favorite designs with ease and
            precision, all without breaking a sweat.
          </p>
        </div>
      </section>
      <br /> <br /> <br /> <br />
      <section className="about-us-intro">
        <h2 className="about-us-header">Our Process</h2>
        <p className="about-us-text">
          We don’t follow trends; we set them. At Lukas Design Lab, every
          project is a mission to create something that hasn’t been seen before.
          From the initial spark of an idea to the final, jaw-dropping product,
          we work with you every step of the way to turn your vision into
          reality—with a whole lot of attitude and zero compromises.
        </p>
      </section>
      <section className="about-us-intro">
        <h2 className="about-us-header">Our Commitment to Innovation</h2>
        <p className="about-us-text">
          We’re not interested in the status quo. Our commitment to innovation
          drives us to explore new frontiers in design and technology. With
          AI-powered tools like Clonekraft PatentGuard, we ensure that every
          design we bring to life is not only stunning but also original and
          protected. We’re here to make sure you stand out, not blend in.
        </p>
      </section>
      {/* <section className="about-us-team">
        <h2 className="about-us-header">Meet Our Team</h2>
        <p className="about-us-text">
          Our team is a powerhouse of talent and creativity. With a crew of bold
          designers, sharp engineers, and marketing mavericks, Lukas Design Lab
          is a force to be reckoned with. We don’t just work together—we
          collaborate, challenge, and push each other to create designs that
          don’t just meet expectations—they shatter them.
        </p>
      </section> */}
      <section className="about-us-intro">
        <h2 className="about-us-header">Join Us on Our Journey</h2>
        <p className="about-us-text">
          If you’re ready to elevate your space, make a statement, or own a
          piece of history with our Legacy of Legends collection, remember:
          Lukas Design Lab is what it is. Step into our world of endless
          possibilities, and let’s create something legendary together.
          <br /> <br />
          <button onClick={handleClick} className="ctaButtonNew">
            Get Started <IoArrowForwardCircleSharp color="#fff" fontSize={32} />
          </button>
        </p>
      </section>
    </div>
  );
};

export default Us;
