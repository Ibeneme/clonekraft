import React, { useState, useEffect } from "react";

const Gallery = () => {
  //   const [backgroundIndex, setBackgroundIndex] = useState(0);

  //   // Array of background image URLs
  //   const backgroundImages = [
  //     "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
  //     "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg", // Add more URLs as needed
  //     "https://f005.backblazeb2.com/file/Webimages-used/guzman-barquin-FkKClUPUURU-unsplash.jpg",
  //   ];

  // //   useEffect(() => {
  // //     const interval = setInterval(() => {
  // //       setBackgroundIndex(
  // //         (prevIndex) => (prevIndex + 1) % backgroundImages.length
  // //       );
  // //     }, 20000); // 20 seconds

  // //     return () => clearInterval(interval);
  // //   }, [backgroundImages.length]);

  //   const currentBackground = backgroundImages[backgroundIndex];

  const products = [
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",
      price: "$19.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",
      price: "$24.99",
    },
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",

      price: "$29.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",

      price: "$34.99",
    },
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",
      price: "$19.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",
      price: "$24.99",
    },
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",

      price: "$29.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",

      price: "$34.99",
    },
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",
      price: "$19.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",
      price: "$24.99",
    },
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",

      price: "$29.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",

      price: "$34.99",
    },
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",
      price: "$19.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",
      price: "$24.99",
    },
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",

      price: "$29.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",

      price: "$34.99",
    },
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",
      price: "$19.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",
      price: "$24.99",
    },
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",

      price: "$29.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",

      price: "$34.99",
    },
  ];

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <section style={{ paddingTop: 120 }}>
        <h3 style={{ textAlign: "center", fontSize: 36 }}>Design Gallery</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {products?.map((product, index) => (
            <div
              key={index}
              style={{ width: "300px", margin: "10px", textAlign: "center" }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: "100%", borderRadius: 8, height: 200 }}
              />

              <p style={{ color: "#808080", fontSize: 14 }}>{product.title}</p>

              <h3 style={{ color: "#000", marginTop: "5px" }}>
                {product.price}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <h1
            style={{
              maxWidth: 600,
              textAlign: "center",
              fontSize: 48,
              color: "#000",
            }}
          >
            Get Started with{" "}
            <span style={{ color: "#007bff" }}> CloneKrafts</span>
          </h1>
          <p
            style={{
              maxWidth: 600,
              textAlign: "center",
              color: "#808080",
              marginTop: -32,
            }}
          >
            At our workshop, we craft bespoke carpentry products tailored to
            your unique needs and preferences. Whether you're looking for rustic
            charm or sleek modern designs, we're here to bring your vision to
            life.
          </p>

          <div style={{ width: "100%", alignContent: "center" }}>
            <div
              style={{
                marginTop: 32,
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                className="div-btn-auth"
                style={{ backgroundColor: "#007bff" }}
              ></div>
              <button
                className="btn-auth"
                style={{ marginTop: -14, backgroundColor: "#021548" }}
                type="submit"
              >
                Upload a Design
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
