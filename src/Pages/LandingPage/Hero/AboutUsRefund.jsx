import React from "react";
import "./GeneralPolicy.css"; // Assuming you have some CSS for styling

import "../../NewLandingPage/Hero/Us.css";

const GeneralPolicy = () => {
  return (
    <div className="about-us-container">
      <section className="about-us-intro">
        {/* <img
            src={policyChangesImage}
            alt="Eligibility for Refund"
            className="policy-image"
          /> */}

        <h2 className="about-us-header">Eligibility for Refund</h2>
        <p className="about-us-text">
          Refunds may be requested within 7 days of the purchase date, depending
          on the specific product or service. To be eligible for a refund, the
          product or service must be unused, in its original condition, and
          accompanied by proof of purchase, such as a receipt or order
          confirmation.
        </p>
      </section>

      <section className="about-us-intro">
        {/* <img
            src={processImage}
            alt="Refund Process"
            className="policy-image"
          /> */}

        <h2 className="about-us-header">Refund Process</h2>
        <p className="about-us-text">
          <p>
            To request a refund, customers must contact our customer support
            team via email or phone call.
            <br />
            The customer support team will review the request and assess whether
            the customer is eligible for a refund based on the terms and
            conditions outlined in this policy.
            <br />
            If the refund request is approved, the customer will be issued a
            refund via the original method of payment used for the purchase.
            <br />
            Refunds will be processed within 7 business days of approval and may
            take additional time to reflect in the customer's account, depending
            on their financial institution.
          </p>
        </p>


        <h2 className="about-us-header">Non-Refundable Items and Services</h2>
        <p className="about-us-text">
          Certain items and services may not be eligible for refunds, including
          but not limited to:
          <br />
          Customized or personalized products. <br />
          Services that have already been performed or completed. <br />
          Digital products or downloadable content.
          <br />
          Products or services that have been damaged or altered after purchase.
        </p>

        
      </section>

      <section className="about-us-intro">
        {/* <img
            src={nonRefundableImage}
            alt="Non-Refundable Items and Services"
            className="policy-image"
          /> */}

      </section>

      <section className="about-us-intro">
        {/* <img
            src={discretionaryImage}
            alt="Discretionary Refunds"
            className="policy-image"
          /> */}

        <h2 className="about-us-header">Discretionary Refunds</h2>
        <p className="about-us-text">
          In some cases, LDL may offer discretionary refunds outside of the
          terms and conditions outlined in this policy. Discretionary refunds
          are granted at the sole discretion of LDL and may be subject to
          additional terms or requirements.
        </p>
      </section>

      <section className="about-us-intro">
        {/* <img
            src={processImage}
            alt="Policy Changes"
            className="policy-image"
          /> */}

        <h2 className="about-us-header">Policy Changes</h2>
        <p className="about-us-text">
          LDL reserves the right to modify or update this refund policy at any
          time without prior notice. Any changes to the policy will be effective
          immediately upon posting on our website or other communication
          channels.
          <br />
          Customers are encouraged to review this policy periodically to stay
          informed about any updates or changes.
          <br />
          By purchasing products or services from Lukas Design Lab, customers
          acknowledge and agree to comply with the terms and conditions of this
          refund policy. For further inquiries or assistance regarding refunds,
          customers can contact our customer support team.
        </p>
      </section>
    </div>
  );
};

export default GeneralPolicy;
