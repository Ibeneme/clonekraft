import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    text: "I received a fantastic replica of the furniture I ordered. The quality is top-notch! The customer service was excellent and they ensured that every detail was perfect. I am truly satisfied with the product and the experience. I will definitely recommend them to my friends and family.",
    name: "Benjamin Ade",
    location: "Lagos, Nigeria",
  },
  {
    id: 2,
    text: "The replica sofa I received is just like the original. I couldn't be happier! The attention to detail and the quality of the materials used are impressive. It fits perfectly in my living room and adds a touch of elegance. I appreciate the craftsmanship and will definitely order again.",
    name: "Ibeneme Ikenna",
    location: "Abuja, Nigeria",
  },
  {
    id: 3,
    text: "Excellent craftsmanship! The replica cabinet fits perfectly in my living room. The finish and build quality are exceptional. It's hard to tell that it's a replica because it looks so authentic. I'm extremely pleased with my purchase and the overall service provided.",
    name: "Hilton Jaja",
    location: "Kano, Nigeria",
  },
  {
    id: 4,
    text: "The couch replica is incredibly comfortable and looks just like the picture. The fabric is high-quality and the construction is solid. I've received many compliments on it from guests. The process of ordering and delivery was smooth and hassle-free. Highly recommend!",
    name: "Chinwe Jimmy",
    location: "Enugu, Nigeria",
  },
  {
    id: 5,
    text: "I'm impressed with the attention to detail in the replica furniture I ordered. The service was fantastic, and the team was very responsive to my queries. The furniture arrived in perfect condition and exceeded my expectations. It's a great addition to my home decor.",
    name: "Bola Ahmed",
    location: "Ibadan, Nigeria",
  },
  {
    id: 6,
    text: "The quality of the furniture replica is outstanding. Highly recommend! The team took great care to ensure that the piece was exactly what I wanted. It's sturdy, well-made, and looks beautiful in my home. I couldn't be more satisfied with my purchase.",
    name: "Amaka Eze",
    location: "Port Harcourt, Nigeria",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials">
      <div>
        <h3
          className="product-text"
          style={{
            textAlign: "center",
            color: "#121212",
            marginBottom: 12,
            textDecorationLine: "overline",
          }}
        >
          What Our Clients Say
        </h3>
        <div className="slider">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial">
              <span style={{ fontSize: 64 }}>"</span>
              <p className="text">"{testimonial.text}"</p>
              <p className="name">{testimonial.name}</p>
              <p className="location">{testimonial.location}</p>
            </div>
          ))}
        </div>
        <br /> <br /> <br /> <br /> <br /> <br />
      </div>
    </div>
  );
};

export default Testimonials;
