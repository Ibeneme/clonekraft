import React from "react";

const ContactUs = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Your name" />

          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
          />
          <br />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
