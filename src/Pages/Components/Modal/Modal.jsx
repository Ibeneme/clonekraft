import React from "react";
import "./Modal.css";
import { MdCancel } from "react-icons/md";

const Modal = ({
  isOpen,
  onOpen,
  onClose,
  formContent,
  ifClose,
  borderColor,
}) => {
  const modalClassName = isOpen ? "modal-open" : "modal";

  return (
    <div className={modalClassName}>
      <div
        className="modal-content"
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        {ifClose ? (
          <div
            style={{
              backgroundColor: "white",
              padding: 0.5,
              borderRadius: 244,
              width: 32,
              height: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2000,
            }}
            onClick={onClose}
          >
            <MdCancel
              onClick={onClose}
              size={28}
              color={"#C19F62"}
              style={{ cursor: "pointer", zIndex: 2000 }}
            />
          </div>
        ) : null}
        <div
          className="white-modal-content"
          style={{
            position: "relative",
            border: borderColor
              ? `2.3px solid ${borderColor}`
              : `2.3px solid var(--darkOrange)`,
          }}
        >
          <span
            style={{
              display: "none",
              //position: "absolute",
            }}
            className="close"
            onClick={onOpen}
          >
            &times;
          </span>
          <div>{formContent}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
