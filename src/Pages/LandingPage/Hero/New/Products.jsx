import React, { useState } from "react";
import "./Navbar.css";
import imagea from "../../../../assets/Sofa/Framea.png";
import imageb from "../../../../assets/Sofa/Frameb.png";
import imaged from "../../../../assets/Sofa/Framed.png";
import imagee from "../../../../assets/Sofa/Framee.png";
import aimagea from "../../../../assets/Sofa/usea.png";
import aimageb from "../../../../assets/Sofa/useb.png";
import aimaged from "../../../../assets/Sofa/used.png";
import aimagee from "../../../../assets/Sofa/usee.png";
import aimagef from "../../../../assets/Sofa/Slides.png";
import aimageg from "../../../../assets/Sofa/Slides02.png";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      image: imagea,
      text: "Furniture Replicas",
      description:
        "High-quality furniture replicas that bring elegance to your home.",
    },
    {
      id: 2,
      image: imageb,
      text: "Couch Replicas",
      description:
        "Comfortable and stylish couch replicas for your living room.",
    },
    {
      id: 3,
      image: imagee,
      text: "Cabinet Replicas",
      description:
        "Beautifully crafted cabinet replicas to enhance your storage solutions.",
    },
    {
      id: 4,
      image: imaged,
      text: "Sofa Replicas",
      description:
        "Luxurious sofa replicas for a touch of class in your space.",
    },
    {
      id: 5,
      image: aimagea,
      text: "Furniture Replicas",
      description:
        "High-quality furniture replicas that bring elegance to your home.",
    },
    {
      id: 6,
      image: aimageb,
      text: "Table Replicas",
      description:
        "Comfortable and stylish Table replicas for your comfort.",
    },
    {
      id: 7,
      image: aimagee,
      text: "Sofa Replicas",
      description:
        "Beautifully crafted cabinet replicas to enhance your storage solutions.",
    },
    {
      id: 8,
      image: aimaged,
      text: "Sofa Replicas",
      description:
        "Luxurious sofa replicas for a touch of class in your space.",
    },
    {
      id: 7,
      image: aimageg,
      text: "Sofa Replicas",
      description:
        "Beautifully crafted Sofa replicas for a touch of class in your space",
    },
    {
      id: 8,
      image: aimagef,
      text: "Chair Replicas",
      description:
        "Luxurious Chair replicas for a touch of class in your space.",
    },
  ];

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="products">
      <h2 style={{ marginRight: 16, marginTop: 120, textDecorationLine:'overline' }} className="product-text">
        Our Top Replicas
      </h2>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleClick(product)}
          >
            <img src={product.image} alt={product.text} />
            <h3>{product.text}</h3>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modals" onClick={handleCloseModal}>
          <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <img src={selectedProduct.image} alt={selectedProduct.text} />
            <div className="modal-texts">
              <h3>{selectedProduct.text}</h3>
              <p>{selectedProduct.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
