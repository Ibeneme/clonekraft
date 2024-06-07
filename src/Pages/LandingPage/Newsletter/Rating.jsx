import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { createOrderRating, createRating } from "../../../Redux/order/order"; // Import Redux action
import { useDispatch } from "react-redux";
import useCustomToasts from "../../ToastNotifications/Toastify";
// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

// Rating Component
const Rating = ({ rating, setRating }) => {
  return (
    <RatingContainer>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          selected={rating > index}
          onClick={() => setRating(index + 1)}
        >
          <FaStar />
        </Star>
      ))}
    </RatingContainer>
  );
};

const ExperienceRatingModal = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const dispatch = useDispatch(); // Redux dispatch hook
  const { showSuccessToast, showErrorToast } = useCustomToasts(); // Custom toast hook
  const [loading, setLoading] = useState(false);
  console.log("Order:", order); // Log the order

  const handleSubmit = () => {
    const credentials = {
      rating: rating,
      review: review,
      orderId: order?._id,
      orderDescription: order?.description,
      orderPrice: order?.price,
    };

    dispatch(createRating(credentials)) // Dispatch Redux action to submit rating
      .then((result) => {
        console.log(result, "resultresultcredentials");
        setLoading(false);
        if (result?.payload?.message === "Rating submitted successfully") {
          setIsOpen(false);
          showSuccessToast("Rating submitted successfully."); // Show success toast
        } else {
          showErrorToast("Rating submission failed. Please try again."); // Show error toast
        }
        //setIsOpen(false); // Close modal after successful submission
      })
      .catch((error) => {
        console.error("User update encountered an error:", error);
        showErrorToast("Rating submission failed. Please try again."); // Show error toast
        //setLoading(false);
      });
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Rate Your Experience</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Rate Your Experience</h2>
        <Rating rating={rating} setRating={setRating} />
        <textarea
          placeholder="Write your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="4"
          style={{ width: "93%", padding: 12 }}
        />
        <br />
        <button
          style={{
            backgroundColor: "var(--darkOrange)",
            marginTop: 24,
            padding: 12,
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </Modal>
    </div>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #000;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const RatingContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Star = styled.div`
  cursor: pointer;
  color: ${(props) => (props.selected ? "#ffc107" : "#e4e5e9")};
  font-size: 2em;
`;

export default ExperienceRatingModal;
