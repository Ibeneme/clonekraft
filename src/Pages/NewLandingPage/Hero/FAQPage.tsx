import React, { useState } from "react";
import "./FAQPage.css";
import MinusIcon from "../../Components/Icons/AddIcon";
import AddIcon from "../../Components/Icons/AddIcon";

const FAQPage: React.FC = () => {

  const handleToggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I submit my design?",
      answer:
        "Have a design that you’ve been dreaming of or a unique piece that you’ve sketched yourself? At Clonekraft, we bring your ideas to life with unparalleled precision and craftsmanship. Our platform allows you to upload your design, and our team of skilled artisans will replicate it with flawless accuracy, maintaining the highest standards of quality and affordability. From custom furniture to intricate home decor, Clonekraft ensures that your vision is realized exactly as you imagined it, combining state-of-the-art technology with expert craftsmanship to deliver products that are not only beautiful but also built to last.",
    },
    {
      question: "How long does it take to receive my custom design?",
      answer:
        "It typically takes 2 to 4 weeks, depending on the complexity of the design and the size of the order. However, this timeline may vary depending on the materials required and the level of detail involved. We will always keep you updated on the progress of your design to ensure you're informed every step of the way. If you have any specific deadlines or urgent needs, please let us know so we can work with you to accommodate them.",
    },
    {
      question: "What materials do you use for custom designs?",
      answer:
        "We use a variety of premium materials, including wood, metal, glass, and other sustainable, high-quality options. Our team carefully selects the best materials based on your design and its requirements. We believe in using materials that are not only durable and aesthetic but also eco-friendly whenever possible. If you have specific material preferences or concerns, we are happy to discuss them with you to ensure your design is perfect.",
    },
    {
      question: "Can I make changes to my design after submission?",
      answer:
        "Yes, you can make changes to your design even after submission. However, we recommend finalizing the design as early as possible to avoid delays in the production process. Depending on the changes, there may be additional costs or time adjustments, but our team will work with you to accommodate your needs. It's important to communicate any modifications clearly so we can maintain the quality and timeline of your order.",
    },
    {
      question:
        "What happens if my custom design doesn’t meet my expectations?",
      answer:
        "We strive to ensure that every custom design meets your expectations, and we work closely with you throughout the process. However, if for any reason your design does not meet your satisfaction, please reach out to us. We offer revision options where we can adjust and fine-tune the design to better align with your vision. Our customer support team is committed to ensuring you're happy with the final product.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping for all our custom designs. Shipping times and costs will vary depending on the destination, size of the item, and specific delivery requirements. We collaborate with reliable international couriers to ensure safe and timely delivery. You will receive tracking information as soon as your order is dispatched, and our team is available to assist with any inquiries during the shipping process.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#172534" }}>
      <div className="faq-container">
        <h1 className="faq-header">Frequently Asked Questions</h1>
        <p className="faq-subtext">
          Get answers to some of the most common questions about our custom
          design services, from submitting your ideas to receiving your product.
          If you have further inquiries, feel free to reach out to us!
        </p>

        {faqItems.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => handleToggleAnswer(index)}
            >
              <h3 className="faq-title">{faq.question}</h3>
              <span style={{ marginLeft: 12 }}>
                {activeIndex === index ? (
                  <MinusIcon
                    width={24}
                    height={24}
                    color={`var(--primaryOrange)`}
                  />
                ) : (
                  <AddIcon
                    width={24}
                    height={24}
                    color={`var(--primaryOrange)`}
                  />
                )}
              </span>
            </div>
            <span>
              {activeIndex === index && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </span>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
