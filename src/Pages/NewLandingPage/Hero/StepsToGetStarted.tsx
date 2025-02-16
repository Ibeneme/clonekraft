import React from "react";
import step1Image from "../../../assets/Sofa/Framea.png"; // Replace with your actual image path
import step2Image from "../../../assets/Sofa/Framee.png"; // Replace with your actual image path
import step3Image from "../../../assets/Sofa/Framed.png"; // Replace with your actual image path
import "./StepsToGetStarted.css"; // Import the CSS file
//import heroImage from "../../../assets/hero-image.png"; // Replace with your image path
//import heroImage from "../../../assets/hero.png"; // Assuming you have a logo.png image in the same directory
import { useNavigate } from "react-router-dom";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const StepsToGetStarted: React.FC = () => {
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
    <div className="steps-container">
      {/* Step 1 */}
      <div className="step">
        <div className="step-info">
          <h2 className="step-title">Step 1: Get Started</h2>
          <ul className="step-text">
            <li>
              Begin by <strong>creating an account</strong> using your Gmail.{" "}
              It’s simple and takes only a few minutes to set up.
            </li>
            <li>
              After signing in, create a secure password and personalize your
              profile with your details.
            </li>
            <li>
              Finally, add your address and delivery address to complete the
              setup.
            </li>
            <li>
              Start your journey today and enjoy all the benefits we offer!
            </li>

            <button onClick={handleClick} className="ctaButtonNew">
              Get Started{" "}
              <IoArrowForwardCircleSharp color="#fff" fontSize={32} />
            </button>
          </ul>
        </div>
        <div className="step-image">
          <img src={step1Image} alt="Step 1" />
        </div>
      </div>

      {/* Step 2 */}
      <div className="step reverse">
        <div className="step-info">
          <h2 className="step-title">Step 2: Furniture Clone</h2>
          <p className="step-text">
            Begin by uploading an image of the furniture you'd love us to
            create. You can easily upload the image from your device. <br />
            <br />
            Next, choose a specific duration for the project, such as 2 weeks, 1
            month, or 1 week, based on your preference. <br />
            <br />
            After selecting the duration, we will provide you with the cost for
            the custom-made furniture. <br />
            <br />
            Once you're satisfied with the details, an order will be created for
            you, and we will start working on bringing your dream furniture to
            life! <br /> <br />
            <button onClick={handleClick} className="ctaButtonNew">
              Get Started{" "}
              <IoArrowForwardCircleSharp color="#fff" fontSize={32} />
            </button>
          </p>
        </div>
        <div className="step-image">
          <img src={step2Image} alt="Step 2" />
        </div>
      </div>

      {/* Step 3 */}
      <div className="step">
        <div className="step-info">
          <h2 className="step-title">
            Step 3: Track Your Order Progress Until It's Delivered
          </h2>
          <p className="step-text">
            You're all set! Now, you can track the progress of your order at
            every stage, from production to delivery. <br />
            <br />
            Stay informed with real-time updates on your order status. You'll be
            notified when the furniture is in production, when it's ready for
            shipping, and when it's on its way to you. <br />
            <br />
            Rest assured, we'll keep you updated until your order is safely
            delivered to your doorstep.
            <br /> <br />
            <button onClick={handleClick} className="ctaButtonNew">
              Get Started{" "}
              <IoArrowForwardCircleSharp color="#fff" fontSize={32} />
            </button>
          </p>
        </div>
        <div className="step-image">
          <img src={step3Image} alt="Step 3" />
        </div>
      </div>
    </div>
  );
};

export default StepsToGetStarted;
