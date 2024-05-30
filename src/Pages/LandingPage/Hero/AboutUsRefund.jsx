import React from "react";
import "./GeneralPolicy.css"; // Assuming you have some CSS for styling
import processImage from "../../../assets/Sofa/Tablet.png";
import nonRefundableImage from "../../../assets/Sofa/Tableu.png";
import discretionaryImage from "../../../assets/Sofa/Tablew.png";
import policyChangesImage from "../../../assets/Sofa/Tablev.png";

const GeneralPolicy = () => {
  return (
    <div className="general-policy">
      <section className="policy-section">
        <div className="section-content">
          <img
            src={policyChangesImage}
            alt="Eligibility for Refund"
            className="policy-image"
          />
          <div className="section-text">
            <h2>Eligibility for Refund</h2>
            <p>
              Refunds may be requested within 7 days of the purchase date,
              depending on the specific product or service. To be eligible for a
              refund, the product or service must be unused, in its original
              condition, and accompanied by proof of purchase, such as a receipt
              or order confirmation.
            </p>
          </div>
        </div>
      </section>

      <section className="policy-section">
        <div className="section-content">
          <img
            src={processImage}
            alt="Refund Process"
            className="policy-image"
          />
          <div className="section-text">
            <h2>Refund Process</h2>
            <ol>
              <li>
                To request a refund, customers must contact our customer support
                team via email or phone call.
              </li>
              <li>
                The customer support team will review the request and assess
                whether the customer is eligible for a refund based on the terms
                and conditions outlined in this policy.
              </li>
              <li>
                If the refund request is approved, the customer will be issued a
                refund via the original method of payment used for the purchase.
              </li>
              <li>
                Refunds will be processed within 7 business days of approval and
                may take additional time to reflect in the customer's account,
                depending on their financial institution.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="policy-section">
        <div className="section-content">
          <img
            src={nonRefundableImage}
            alt="Non-Refundable Items and Services"
            className="policy-image"
          />
          <div className="section-text">
            <h2>Non-Refundable Items and Services</h2>
            <p>
              Certain items and services may not be eligible for refunds,
              including but not limited to:
            </p>
            <ul>
              <li>Customized or personalized products.</li>
              <li>Services that have already been performed or completed.</li>
              <li>Digital products or downloadable content.</li>
              <li>
                Products or services that have been damaged or altered after
                purchase.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="policy-section">
        <div className="section-content">
          <img
            src={discretionaryImage}
            alt="Discretionary Refunds"
            className="policy-image"
          />
          <div className="section-text">
            <h2>Discretionary Refunds</h2>
            <p>
              In some cases, LDL may offer discretionary refunds outside of the
              terms and conditions outlined in this policy. Discretionary
              refunds are granted at the sole discretion of LDL and may be
              subject to additional terms or requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="policy-section">
        <div className="section-content">
          <img
            src={processImage}
            alt="Policy Changes"
            className="policy-image"
          />
          <div className="section-text">
            <h2>Policy Changes</h2>
            <p>
              LDL reserves the right to modify or update this refund policy at
              any time without prior notice. Any changes to the policy will be
              effective immediately upon posting on our website or other
              communication channels.
            </p>
            <p>
              Customers are encouraged to review this policy periodically to
              stay informed about any updates or changes.
            </p>
            <p>
              By purchasing products or services from Lukas Design Lab,
              customers acknowledge and agree to comply with the terms and
              conditions of this refund policy. For further inquiries or
              assistance regarding refunds, customers can contact our customer
              support team.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeneralPolicy;
