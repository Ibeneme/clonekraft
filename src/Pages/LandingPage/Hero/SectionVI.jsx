import React, { useState } from "react";
import "./Hero.css";

const SectionVI = () => {
  const faqsData = [
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor quis massa sit amet porttitor. Nullam nec ultricies nisi. Duis id vehicula quam, nec sollicitudin justo. Ut consequat libero at purus finibus, vel blandit arcu pharetra.",
    },
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor quis massa sit amet porttitor. Nullam nec ultricies nisi. Duis id vehicula quam, nec sollicitudin justo. Ut consequat libero at purus finibus, vel blandit arcu pharetra.",
    },
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor quis massa sit amet porttitor. Nullam nec ultricies nisi. Duis id vehicula quam, nec sollicitudin justo. Ut consequat libero at purus finibus, vel blandit arcu pharetra.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-section" data-aos="zoom-in">
      <h2 className="section-header">FAQs</h2>
      <div className="accordion-container" data-aos="zoom-in">
        {faqsData.map((faq, index) => (
          <div data-aos="zoom-in" className="accordion-item" key={index}>
            <div
              className={`accordion-header ${
                openIndex === index ? "open" : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="accordion-question">{faq.question}</h3>
              <span className="accordion-icon">&#x25BE;</span>
            </div>
            {openIndex === index && (
              <div className="accordion-content">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionVI;
