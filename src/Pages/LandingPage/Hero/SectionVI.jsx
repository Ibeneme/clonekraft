import React, { useState } from "react";
import "./Hero.css";

const SectionVI = () => {
  const faqsData = [
    {
      question: "How do I upload an image?",
      answer:
        "Simply click on the 'Upload Your Image' button on our homepage. You can either drag and drop your image or select a file from your device.",
    },
    {
      question: "What information do I need to provide besides the image?",
      answer:
        "Along with the image, please provide details about the materials, dimensions, and any specific features or customizations you want for the furniture piece.",
    },
    {
      question: "Is there a fee for getting a quote?",
      answer:
        "No, getting a quote is completely free. You only pay if you decide to proceed with the order.",
    },
    {
      question: "What kind of images can I upload?",
      answer:
        "You can upload images in JPEG, PNG, or GIF formats. Make sure the image is clear and shows the furniture piece in detail for an accurate estimate.",
    },
    {
      question: "How long does it take to receive a quote?",
      answer:
        "Typically, you will receive your detailed cost estimate within 6 hours of uploading your image and providing the necessary details.",
    },
    {
      question: "How accurate are the quotes?",
      answer:
        "Our quotes are highly accurate, factoring in materials, labor, and current market rates. However, final costs may vary slightly based on additional customizations or changes in material prices.",
    },
    {
      question: "What happens after I receive my quote?",
      answer:
        "If you’re satisfied with the quote, you can proceed to place an order. Our team will then start the production process and keep you updated throughout.",
    },
    {
      question: "Can I request changes after receiving the quote?",
      answer:
        "Yes, you can request changes. However, please note that significant changes might affect the final cost and delivery time.",
    },
    {
      question: "Do you offer delivery services?",
      answer:
        "Yes, we offer delivery services. The cost and timeframe for delivery will be included in your final quote.",
    },
    {
      question: "Do you provide warranties on your furniture?",
      answer:
        "Yes, we provide a warranty on all our custom furniture pieces. The specifics of the warranty depend on the materials and type of furniture. Detailed warranty information will be provided with your order.",
    },
    {
      question: "Can you replicate antique or unique furniture designs?",
      answer:
        "Yes, we specialize in creating custom pieces based on your unique preferences, including antique and one-of-a-kind designs. Upload a clear image and provide as many details as possible for the best results.",
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
