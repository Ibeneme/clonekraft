// src/components/ObjectDetection.js
import React, { useState, useRef, useEffect } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { useDropzone } from "react-dropzone";
import Modal from "../Components/Modal/Modal";
import { useDispatch } from "react-redux";
import { profile } from "../../Redux/auth/auth";
import { createOrder } from "../../Redux/order/order";
import useCustomToasts from "../ToastNotifications/Toastify";
import { useNavigate } from "react-router-dom";
// import woodImage from "../../assets/woods/wooda.png";
// import woodImageb from "../../assets/woods/woodb.png";
// import woodImagec from "../../assets/woods/woodc.png";
// import woodImaged from "../../assets/woods/woodd.png";
// import woodImagee from "../../assets/woods/woode.png";
// import woodImagef from "../../assets/woods/woodf.png";
// import PayButton from "./PayButton";
import { PaystackButton } from "react-paystack";
import ShimmerLoader from "../Components/Loader/ShimmerLoader";

const ObjectDetection = () => {
  const PAYSTACK_SECRET_KEY =
    "pk_live_1314935c92fe40573d7c8105b93a7201c9cc72e3";

  const { showErrorToast, showSuccessToast } = useCustomToasts();
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState(""); // State for selected label
  const [deliveryOption, setDeliveryOption] = useState(""); // State for selected delivery option
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [choice, setChoice] = useState("");
  const [shape, setShape] = useState("");
  const [styleOfChair, setStyleOfChair] = useState("");
  const [priceEstimater, setPriceEstimater] = useState(0);
  const [seaters, setSeaters] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleSeaters = (option) => {
    setSeaters((prevSeaters) => {
      const newSeaters = prevSeaters.includes(option)
        ? prevSeaters.filter((seater) => seater !== option)
        : [...prevSeaters, option];
      console.log("Selected Delivery Options:", newSeaters);
      return newSeaters;
    });
  };
  const handleStyleOfChair = (option) => {
    setStyleOfChair(option);
    console.log("Selected Delivery Option:", option);
  };

  const generateUniqueReference = (email, amount) => {
    const timestamp = Date?.now();
    const obfuscatedEmail =
      email?.split("@")[0] + Math?.random()?.toString(36)?.substring(2, 7);
    return `${obfuscatedEmail}${timestamp}${amount}`;
  };

  //const sampleTotalAmount = 100; // amount in your local currency units
  const sampleUserEmail = user?.email;
  const sampleReference = generateUniqueReference(sampleUserEmail, totalPrice);
  const publicKey = PAYSTACK_SECRET_KEY; // Use your public key here
  const amount = totalPrice * 100; // Paystack expects the amount in kobo
  const componentProps = {
    email: sampleUserEmail,
    amount: 10000,
    publicKey,
    text: loading ? "Pay with Paystack" : "Pay with Paystack",
    onSuccess: () => {
      setLoading(false);
      console.log("Payment Successful!");
      setModalOpenLoading(true);
      handleUploader();
      // navigate("/sucess");
      // Handle post-success actions here
    },
    onClose: () => {
      setLoading(false);
      console.log("Payment closed");
      showErrorToast("Payment Failed");
      // Handle post-close actions here
    },
    reference: sampleReference,
  };
  const handleClick = () => {
    setLoading(true);
  };
  const [imageData, setImageData] = useState([]);
  const [payModal, setPayModal] = useState(false);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    const image = new Image();
    image.src = imageUrl;
    const newImageData = { url: imageUrl, image, objects: [] };

    setImageData((prevImageData) => [...prevImageData, newImageData]);

    image.onload = () => detectObjects(image, newImageData);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });
  const [modalOpenLoading, setModalOpenLoading] = useState(false);
  // Detect objects in the given image
  const detectObjects = async (image, newImageData) => {
    const model = await cocoSsd.load();
    const predictions = await model.detect(image);
    setImageData((prevImageData) =>
      prevImageData.map((imgData) =>
        imgData.url === newImageData.url
          ? { ...imgData, objects: predictions }
          : imgData
      )
    );
  };

  const convertPixelsToCm = (pixels) => {
    const PPI = 96; // Assumed pixels per inch
    const inches = pixels / PPI;
    const cm = inches * 2.54; // 1 inch = 2.54 cm
    return cm.toFixed(2); // Rounded to 2 decimal places
  };
  // const { showSuccessToast, showErrorToast } = useCustomToasts();

  // Classify the seating based on width and height
  const classifySeating = (widthCm, heightCm, objectClass) => {
    const ratio = heightCm / widthCm;

    // Dining Chair classification
    if (ratio >= 1.8 && ratio <= 2.5) return "Dining Chair";

    // Upholstered or Chair classification
    let seatingType = objectClass === "couch" ? "Upholstered" : "Chair";
    if (ratio > 1) {
      return seatingType;
    }

    // Check if object is a bench or cabinet based on class name
    if (objectClass === "bench") {
      return "Cabinet";
    }

    // Specific classifications based on width-to-height ratio
    if (widthCm / heightCm >= 0.7 && widthCm / heightCm <= 1.7)
      return `${seatingType} - Single Seater`;
    if (widthCm / heightCm >= 1.8 && widthCm / heightCm <= 3.3)
      return `${seatingType} - Double Seater`;

    return "Unknown";
  };

  // Handle file drop event
  // const onDrop = async (acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   const imageUrl = URL.createObjectURL(file);
  //   const image = new Image();
  //   image.src = imageUrl;
  //   setImageData({ url: imageUrl, image, objects: [] });

  //   image.onload = () => detectObjects(image);
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   maxFiles: 1,
  // });

  // // Detect objects in the given image
  // const detectObjects = async (image) => {
  //   const model = await cocoSsd.load();
  //   const predictions = await model.detect(image);
  //   setImageData((prevImageData) => ({
  //     ...prevImageData,
  //     objects: predictions,
  //   }));
  // };

  const handleFetchUser = () => {
    dispatch(profile())
      .then((response) => {
        console.log("profile successful:", response);
        setUser(response?.payload);
      })
      .catch((error) => {
        console.log("Registration failed:", error);
      });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  const formatUsername = (name) => {
    return name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase();
  };

  const formattedUsername = formatUsername(user?.username);

  const handleUploads = () => {
    //setLoading(true);
    setPayModal(true);

    if (choice === "Upholstery") {
      if (styleOfChair === "Scandinavian") {
        if (shape === "straight" || "l-shaped" || "none") {
          if (
            seaters.includes("single-seater-two") &&
            seaters.includes("double-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 * 2 + 300000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2 + 330000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2 + 450000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2 + 500000 + 650000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater-two") &&
            seaters.includes("double-seater")
          ) {
            if (label === "Basic") {
              const total = 350000 * 2 + 500000 + 650000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2 + 330000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2 + 500000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater-two") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 * 2 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2 + 650000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("double-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 300000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 330000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 450000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 500000 + 650000;
              setPriceEstimater(total);
            }
          } else if (seaters.includes("single-seater-two")) {
            if (label === "Basic") {
              const total = 150000 * 2;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater") &&
            seaters.includes("double-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 + 300000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 + 330000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 + 450000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 + 500000 + 650000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater") &&
            seaters.includes("double-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 + 330000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 + 500000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 + 650000;
              setPriceEstimater(total);
            }
          } else if (seaters.includes("three-seater")) {
            if (label === "Basic") {
              const total = 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 650000;
              setPriceEstimater(total);
            }
          }
        }
      } else if (styleOfChair === "Contemporary") {
        if (shape === "straight" || "l-shaped" || "none") {
          if (
            seaters.includes("single-seater-two") &&
            seaters.includes("double-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 * 2 + 300000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2 + 330000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2 + 450000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2 + 500000 + 650000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater-two") &&
            seaters.includes("double-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 * 2 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2 + 330000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2 + 500000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater-two") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 * 2 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2 + 650000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("double-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 300000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 330000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 450000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 500000 + 650000;
              setPriceEstimater(total);
            }
          } else if (seaters.includes("single-seater-two")) {
            if (label === "Basic") {
              const total = 150000 * 2;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater") &&
            seaters.includes("double-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 + 300000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 + 330000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 + 450000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 + 500000 + 650000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater") &&
            seaters.includes("double-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 + 330000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 + 500000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 + 650000;
              setPriceEstimater(total);
            }
          } else if (seaters.includes("three-seater")) {
            if (label === "Basic") {
              const total = 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 650000;
              setPriceEstimater(total);
            }
          }
        }
      } else if (styleOfChair === "Minimalist") {
        if (shape === "straight" || "l-shaped" || "none") {
          if (
            seaters.includes("single-seater-two") &&
            seaters.includes("double-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 * 2 + 300000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2 + 330000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2 + 450000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2 + 500000 + 650000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater-two") &&
            seaters.includes("double-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 * 2 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2 + 330000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2 + 500000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater-two") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 * 2 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2 + 650000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("double-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 300000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 330000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 450000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 500000 + 650000;
              setPriceEstimater(total);
            }
          } else if (seaters.includes("single-seater-two")) {
            if (label === "Basic") {
              const total = 150000 * 2;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 * 2;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 * 2;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 * 2;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater") &&
            seaters.includes("double-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 + 300000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 + 330000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 + 450000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 + 500000 + 650000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater") &&
            seaters.includes("double-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 + 330000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 + 500000;
              setPriceEstimater(total);
            }
          } else if (
            seaters.includes("single-seater") &&
            seaters.includes("three-seater")
          ) {
            if (label === "Basic") {
              const total = 150000 + 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 200000 + 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 270000 + 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 350000 + 650000;
              setPriceEstimater(total);
            }
          } else if (seaters.includes("three-seater")) {
            if (label === "Basic") {
              const total = 300000;
              setPriceEstimater(total);
            } else if (label === "Standard") {
              const total = 350000;
              setPriceEstimater(total);
            } else if (label === "Elite") {
              const total = 450000;
              setPriceEstimater(total);
            } else if (label === "Premium") {
              const total = 650000;
              setPriceEstimater(total);
            }
          }
        }
      }
    }

    if (choice === "Upholstery") {
      if (
        styleOfChair &&
        shape &&
        seaters &&
        label &&
        deliveryOption &&
        description
      ) {
        // Create a new FormData object
        const formData = new FormData();

        formData.append(
          "styleOfChair",
          typeof styleOfChair === "string"
            ? styleOfChair.toLowerCase()
            : styleOfChair
        );
        formData.append(
          "shape",
          typeof shape === "string" ? shape.toLowerCase() : shape
        );
        formData.append(
          "choice",
          typeof choice === "string" ? choice.toLowerCase() : choice
        );
        formData.append(
          "seaters",
          typeof seaters === "string" ? seaters.toLowerCase() : seaters
        );
        formData.append(
          "selectedLabel",
          typeof label === "string" ? label.toLowerCase() : label
        );
        formData.append(
          "deliveryOption",
          typeof deliveryOption === "string"
            ? deliveryOption.toLowerCase()
            : deliveryOption
        );
        formData.append(
          "description",
          typeof description === "string"
            ? description.toLowerCase()
            : description
        );

        console.log(imageData, "imageData");
        if (deliveryOption === 14) {
          const totalPrice = priceEstimater + 200000;
          setTotalPrice(totalPrice);
          formData.append("price", totalPrice);
          console.log(totalPrice, "totalPrice");
          setTotalPrice(totalPrice);
        } else if (deliveryOption === 14) {
          const totalPrice = priceEstimater + 150000;
          formData.append("price", totalPrice);
          console.log(totalPrice, "totalPrice");
          setTotalPrice(totalPrice);
        } else if (deliveryOption === 28) {
          const totalPrice = priceEstimater + 100000;
          formData.append("price", totalPrice);
          console.log(totalPrice, "totalPrice");
          setTotalPrice(totalPrice);
        } else if (deliveryOption === 42) {
          const totalPrice = priceEstimater + 50000;
          formData.append("price", totalPrice);
          console.log(totalPrice, "totalPrice");
          setTotalPrice(totalPrice);
        } else if (deliveryOption === 60) {
        }
        console.log(totalPrice, "totalPrice");
        console.log("FormData object:", formData);
      } else {
        console.log("One or more variables are undefined or falsy.");
      }
    }

    // console.log(choice, "choice");
    // console.log(styleOfChair, "styleOfChair");
    // console.log(shape, "shape");
    // console.log(seaters, "seaters");
    // console.log(label, "label");
    // const formData = new FormData();
    // console.log(imageData?.url, "imageDataimageData");
    // console.log(file, "filefile");
    // if (Array?.isArray(imageData?.url)) {
    //   imageData?.url.forEach((file) => {
    //     formData.append("images", file);
    //   });
    // } else {
    //   formData.append("images", imageData?.url);
    // // Append other order data to the FormData object
    // formData.append("selectedLabel", label);
    // formData.append("description", description);
    // formData.append("deliveryOption", deliveryOption);
    // console.log(choice, "choice");
    // console.log(styleOfChair, "styleOfChair");
    // console.log(shape, "shape");
    // console.log(seaters, "seaters");
    // console.log(label, "label");
    // const formData = new FormData();
    // console.log(imageData?.url, "imageDataimageData");
    // console.log(file, "filefile");
    // if (Array?.isArray(imageData?.url)) {
    //   imageData?.url.forEach((file) => {
    //     formData.append("images", file);
    //   });
    // } else {
    //   formData.append("images", imageData?.url);
    // // Append other order data to the FormData object
    // formData.append("selectedLabel", label);
    // formData.append("description", description);
    // formData.append("deliveryOption", deliveryOption);
    ////alert(imageData?.url)

    setModalOpen(true);
    console.log(priceEstimater, "priceEstimater");
  };

  const handleUploader = () => {
    //etLoading(true);
    //alert("done");
    setModalOpenLoading(true);
    if (choice === "Upholstery") {
      if (
        styleOfChair &&
        shape &&
        seaters &&
        label &&
        deliveryOption &&
        description
      ) {
        // Create a new FormData object
        const formData = new FormData();

        formData.append(
          "styleOfChair",
          typeof styleOfChair === "string"
            ? styleOfChair.toLowerCase()
            : styleOfChair
        );
        formData.append(
          "shape",
          typeof shape === "string" ? shape.toLowerCase() : shape
        );
        formData.append(
          "choice",
          typeof choice === "string" ? choice.toLowerCase() : choice
        );
        formData.append(
          "seaters",
          typeof seaters === "string" ? seaters.toLowerCase() : seaters
        );
        formData.append(
          "selectedLabel",
          typeof label === "string" ? label.toLowerCase() : label
        );
        formData.append(
          "deliveryOption",
          typeof deliveryOption === "string"
            ? deliveryOption.toLowerCase()
            : deliveryOption
        );
        formData.append(
          "description",
          typeof description === "string"
            ? description.toLowerCase()
            : description
        );
        imageData.forEach((imgData, index) => {
          formData.append(`imageData[${index}]`, imgData.image);
        });

        if (deliveryOption === 14) {
          const totalPrice = priceEstimater + 200000;
          setTotalPrice(totalPrice);
          formData.append("price", totalPrice);
          console.log(totalPrice, "totalPrice");
          setTotalPrice(totalPrice);
        } else if (deliveryOption === 14) {
          const totalPrice = priceEstimater + 150000;
          formData.append("price", totalPrice);
          console.log(totalPrice, "totalPrice");
          setTotalPrice(totalPrice);
        } else if (deliveryOption === 28) {
          const totalPrice = priceEstimater + 100000;
          formData.append("price", totalPrice);
          console.log(totalPrice, "totalPrice");
          setTotalPrice(totalPrice);
        } else if (deliveryOption === 42) {
          const totalPrice = priceEstimater + 50000;
          formData.append("price", totalPrice);
          console.log(totalPrice, "totalPrice");
          setTotalPrice(totalPrice);
        } else if (deliveryOption === 60) {
        }
        if (choice === "Upholstery") {
          if (
            styleOfChair &&
            shape &&
            seaters &&
            label &&
            deliveryOption &&
            description
          ) {
            // Create a new FormData object
            const formData = new FormData();

            formData.append(
              "styleOfChair",
              typeof styleOfChair === "string"
                ? styleOfChair.toLowerCase()
                : styleOfChair
            );
            formData.append(
              "shape",
              typeof shape === "string" ? shape.toLowerCase() : shape
            );
            formData.append(
              "choice",
              typeof choice === "string" ? choice.toLowerCase() : choice
            );
            formData.append(
              "seaters",
              typeof seaters === "string" ? seaters.toLowerCase() : seaters
            );
            formData.append(
              "selectedLabel",
              typeof label === "string" ? label.toLowerCase() : label
            );
            formData.append(
              "deliveryOption",
              typeof deliveryOption === "string"
                ? deliveryOption.toLowerCase()
                : deliveryOption
            );
            formData.append(
              "description",
              typeof description === "string"
                ? description.toLowerCase()
                : description
            );

            console.log(imageData, "imageData");
            if (deliveryOption === 14) {
              const totalPrice = priceEstimater + 200000;
              setTotalPrice(totalPrice);
              formData.append("price", totalPrice);
              console.log(totalPrice, "totalPrice");
              setTotalPrice(totalPrice);
            } else if (deliveryOption === 14) {
              const totalPrice = priceEstimater + 150000;
              formData.append("price", totalPrice);
              console.log(totalPrice, "totalPrice");
              setTotalPrice(totalPrice);
            } else if (deliveryOption === 28) {
              const totalPrice = priceEstimater + 100000;
              formData.append("price", totalPrice);
              console.log(totalPrice, "totalPrice");
              setTotalPrice(totalPrice);
            } else if (deliveryOption === 42) {
              const totalPrice = priceEstimater + 50000;
              formData.append("price", totalPrice);
              console.log(totalPrice, "totalPrice");
              setTotalPrice(totalPrice);
            } else if (deliveryOption === 60) {
            }
            console.log(totalPrice, "totalPrice");

            // Assuming imageData contains an array of blob URLs
            Promise.all(imageData.map((imgData) => fetch(imgData.url)))
              .then((responses) =>
                Promise.all(responses.map((response) => response.blob()))
              )
              .then((blobs) => {
                setModalOpenLoading(true);
                // Once all blobs are fetched, iterate over them and append to FormData
                blobs.forEach((blob, index) => {
                  formData.append("images", blob, `image_${index}.jpg`);
                });
                dispatch(createOrder(formData))
                  .then((response) => {
                    setLoading(false);

                    // Handle success
                    console.log("Request created successfully:", response);
                    if (response?.payload?.order?.description) {
                      showSuccessToast("Request Created Successfully");
                      setModalOpenLoading(false);
                      navigate("/sucess");
                    } else {
                      showErrorToast("Failed to Upload Request");
                      setModalOpenLoading(false);
                    }
                  })
                  .catch((error) => {
                    setLoading(true);
                    showErrorToast("Error Order Request");
                    console.error("Error Order Request:", error);
                    setModalOpenLoading(false);
                  });
              })
              .catch((error) => {
                console.error("Error fetching blobs:", error);
                setModalOpenLoading(false);
              });

            console.log("FormData object:", formData);
          } else {
            console.log("One or more variables are undefined or falsy.");
            setModalOpenLoading(false);
          }
        }

        console.log("FormData object:", formData);
      } else {
        setModalOpenLoading(false);
        console.log("One or more variables are undefined or falsy.");
      }
    } else {
      const formData = new FormData();

      // formData.append(
      //   "styleOfChair",
      //   typeof styleOfChair === "string"
      //     ? styleOfChair.toLowerCase()
      //     : styleOfChair
      // );
      // formData.append(
      //   "shape",
      //   typeof shape === "string" ? shape.toLowerCase() : shape
      // );
      formData.append(
        "choice",
        typeof choice === "string" ? choice.toLowerCase() : choice
      );
      // formData.append(
      //   "seaters",
      //   typeof seaters === "string" ? seaters.toLowerCase() : seaters
      // );
      formData.append(
        "selectedLabel",
        typeof label === "string" ? label.toLowerCase() : label
      );
      formData.append(
        "deliveryOption",
        typeof deliveryOption === "string"
          ? deliveryOption.toLowerCase()
          : deliveryOption
      );
      formData.append(
        "description",
        typeof description === "string"
          ? description.toLowerCase()
          : description
      );
      imageData.forEach((imgData, index) => {
        formData.append(`imageData[${index}]`, imgData.image);
      });
      Promise.all(imageData.map((imgData) => fetch(imgData.url)))
        .then((responses) =>
          Promise.all(responses.map((response) => response.blob()))
        )
        .then((blobs) => {
          setModalOpenLoading(true);
          blobs.forEach((blob, index) => {
            formData.append("images", blob, `image_${index}.jpg`);
          });
          dispatch(createOrder(formData))
            .then((response) => {
              setLoading(false);
              console.log("Request created successfully:", response);
              if (response?.payload?.order?.description) {
                showSuccessToast("Request Created Successfully");
                setModalOpenLoading(false);
                if (choice !== "Upholstery") {
                  navigate("/order");
                } else {
                  navigate("/sucess");
                }
              } else {
                showErrorToast("Failed to Upload Request");
                setModalOpenLoading(false);
              }
            })
            .catch((error) => {
              setLoading(true);
              showErrorToast("Error Order Request");
              console.error("Error Order Request:", error);
              setModalOpenLoading(false);
            });
        })
        .catch((error) => {
          console.error("Error fetching blobs:", error);
          setModalOpenLoading(false);
        });
    }

    setModalOpen(true);
    setModalOpenLoading(false);
    console.log(priceEstimater, "priceEstimater");
  };

  const [modalOpen, setModalOpen] = useState(false);
  const Content = (
    <div>
      <div>
        <div className="vw">
          <h2
            className="vw-text"
            style={{
              fontSize: 32,
            }}
          >
            <span style={{ color: "#C19F62" }}>
              {formattedUsername ? `${formattedUsername}` : null},{" "}
            </span>{" "}
            Tell us about the image you're uploading
          </h2>
          <p className="auth-div-p">Learn about uploading your design</p>
          <div style={{ marginBottom: 48 }}>
            <br /> <br />
            <h2
              className="vw-text"
              style={{
                fontSize: 16,
              }}
            >
              Which
              <span style={{ color: "#C19F62" }}> Furniture </span>
              do you want?{" "}
            </h2>
            <div
              className="delivery-options"
              style={{ display: "flex", marginTop: 12 }}
            >
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `10px 14px`,
                  fontSize: 12,
                  borderRadius: 4,
                  backgroundColor:
                    choice === "Upholstery" ? "#C19F62" : "#80808019",
                  color: choice === "Upholstery" ? "#fff" : "#000",
                }}
                className={choice === "Upholstery" ? "selected" : ""}
                onClick={() => handleChoice("Upholstery")}
              >
                Upholstery
              </label>
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `10px 14px`,
                  fontSize: 12,
                  borderRadius: 4,
                  backgroundColor:
                    choice === "Cabinet" ? "#C19F62" : "#80808019",
                  color: choice === "Cabinet" ? "#fff" : "#000",
                }}
                className={choice === "Cabinet" ? "selected" : ""}
                onClick={() => handleChoice("Cabinet")}
              >
                Cabinet
              </label>

              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `10px 14px`,
                  fontSize: 12,
                  borderRadius: 4,
                  backgroundColor: choice === "Sofa" ? "#C19F62" : "#80808019",
                  color: choice === "Sofa" ? "#fff" : "#000",
                }}
                className={choice === "Sofa" ? "selected" : ""}
                onClick={() => handleChoice("Sofa")}
              >
                Sofa
              </label>

              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `10px 14px`,
                  fontSize: 12,
                  borderRadius: 4,
                  backgroundColor:
                    choice === "Custom" ? "#C19F62" : "#80808019",
                  color: choice === "Custom" ? "#fff" : "#000",
                }}
                className={choice === "Custom" ? "selected" : ""}
                onClick={() => handleChoice("Custom")}
              >
                Custom
              </label>
            </div>
          </div>
          {choice === "Upholstery" ? (
            <>
              <div style={{ marginBottom: 48 }}>
                <h2
                  className="vw-text"
                  style={{
                    fontSize: 16,
                  }}
                >
                  How do you want it
                  <span style={{ color: "#C19F62" }}> Styled?</span>
                </h2>
                <div
                  className="delivery-options"
                  style={{ display: "flex", marginTop: 12 }}
                >
                  <label
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: `10px 14px`,
                      fontSize: 12,
                      borderRadius: 4,
                      backgroundColor:
                        styleOfChair === "Scandinavian"
                          ? "#C19F62"
                          : "#80808019",
                      color: styleOfChair === "Scandinavian" ? "#fff" : "#000",
                    }}
                    className={
                      styleOfChair === "Scandinavian" ? "selected" : ""
                    }
                    onClick={() => handleStyleOfChair("Scandinavian")}
                  >
                    Scandinavian
                  </label>
                  <label
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: `10px 14px`,
                      fontSize: 12,
                      borderRadius: 4,
                      backgroundColor:
                        styleOfChair === "Minimalist" ? "#C19F62" : "#80808019",
                      color: styleOfChair === "Minimalist" ? "#fff" : "#000",
                    }}
                    className={styleOfChair === "Minimalist" ? "selected" : ""}
                    onClick={() => handleStyleOfChair("Minimalist")}
                  >
                    Minimalist
                  </label>
                  <label
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: `10px 14px`,
                      fontSize: 12,
                      borderRadius: 4,
                      backgroundColor:
                        styleOfChair === "Contemporary"
                          ? "#C19F62"
                          : "#80808019",
                      color: styleOfChair === "Contemporary" ? "#fff" : "#000",
                    }}
                    className={
                      styleOfChair === "Contemporary" ? "selected" : ""
                    }
                    onClick={() => handleStyleOfChair("Contemporary")}
                  >
                    Contemporary
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: 48 }}>
                <h2
                  className="vw-text"
                  style={{
                    fontSize: 16,
                  }}
                >
                  How do you want it
                  <span style={{ color: "#C19F62" }}> shaped ?</span>
                </h2>
                <div
                  className="delivery-options"
                  style={{ display: "flex", marginTop: 12 }}
                >
                  <label
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: `10px 14px`,
                      fontSize: 12,
                      borderRadius: 4,
                      backgroundColor:
                        shape === "l-shaped" ? "#C19F62" : "#80808019",
                      color: shape === "l-shaped" ? "#fff" : "#000",
                    }}
                    className={shape === "l-shaped" ? "selected" : ""}
                    onClick={() => handleShape("l-shaped")}
                  >
                    L - Shaped
                  </label>
                  <label
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: `10px 14px`,
                      fontSize: 12,
                      borderRadius: 4,
                      backgroundColor:
                        shape === "straight" ? "#C19F62" : "#80808019",
                      color: shape === "straight" ? "#fff" : "#000",
                    }}
                    className={shape === "straight" ? "selected" : ""}
                    onClick={() => handleShape("straight")}
                  >
                    Straight
                  </label>
                  <label
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: `10px 14px`,
                      fontSize: 12,
                      borderRadius: 4,
                      backgroundColor:
                        shape === "none" ? "#C19F62" : "#80808019",
                      color: shape === "none" ? "#fff" : "#000",
                    }}
                    className={shape === "none" ? "selected" : ""}
                    onClick={() => handleShape("none")}
                  >
                    None
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: 48 }}>
                <h2 className="vw-text" style={{ fontSize: 16 }}>
                  How many <span style={{ color: "#C19F62" }}>Seaters</span> do
                  you need?
                </h2>
                <div
                  className="delivery-options"
                  style={{ display: "flex", marginTop: 12 }}
                >
                  <label
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: `10px 14px`,
                      fontSize: 12,
                      borderRadius: 4,
                      backgroundColor: seaters.includes("single-seater-two")
                        ? "#C19F62"
                        : "#80808019",
                      color: seaters.includes("single-seater-two")
                        ? "#fff"
                        : "#000",
                    }}
                    className={
                      seaters.includes("single-seater-two") ? "selected" : ""
                    }
                    onClick={() => handleSeaters("single-seater-two")}
                  >
                    Two Single Seater
                  </label>

                  <label
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: `10px 14px`,
                      fontSize: 12,
                      borderRadius: 4,
                      backgroundColor: seaters.includes("single-seater")
                        ? "#C19F62"
                        : "#80808019",
                      color: seaters.includes("single-seater")
                        ? "#fff"
                        : "#000",
                    }}
                    className={
                      seaters.includes("single-seater") ? "selected" : ""
                    }
                    onClick={() => handleSeaters("single-seater")}
                  >
                    Single Seater
                  </label>
                  <label
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: `10px 14px`,
                      fontSize: 12,
                      borderRadius: 4,
                      backgroundColor: seaters.includes("double-seater")
                        ? "#C19F62"
                        : "#80808019",
                      color: seaters.includes("double-seater")
                        ? "#fff"
                        : "#000",
                    }}
                    className={
                      seaters.includes("double-seater") ? "selected" : ""
                    }
                    onClick={() => handleSeaters("double-seater")}
                  >
                    Double Seater
                  </label>
                  <label
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: `10px 14px`,
                      fontSize: 12,
                      borderRadius: 4,
                      backgroundColor: seaters.includes("three-seater")
                        ? "#C19F62"
                        : "#80808019",
                      color: seaters.includes("three-seater") ? "#fff" : "#000",
                    }}
                    className={
                      seaters.includes("three-seater") ? "selected" : ""
                    }
                    onClick={() => handleSeaters("three-seater")}
                  >
                    Three Seater
                  </label>
                </div>
              </div>
            </>
          ) : null}
          {choice === "Custom" || choice === "Cabinet" || choice === "Sofa" ? (
            <>
              <h1>
                Please use the description box, place an order and our admin
                will get back to you
              </h1>
            </>
          ) : null}

          {choice !== "" ? (
            <>
              <br />
              <br />
              {choice !== "" && (
                <>
                  <br /> <br />
                  <h2
                    className="vw-text"
                    style={{
                      fontSize: 16,
                    }}
                  >
                    Choose your{" "}
                    <span style={{ color: "#C19F62" }}> quality range? 👍</span>
                  </h2>
                  <div
                    className="label-container"
                    style={{ display: "flex", marginTop: 12 }}
                  >
                    <label
                      className={label === "Basic" ? "selected" : ""}
                      onClick={() => handleLabelClick("Basic")}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        padding: `10px 14px`,
                        fontSize: 12,
                        borderRadius: 4,
                        backgroundColor:
                          label === "Basic" ? "#C19F62" : "#80808019",
                        color: label === "Basic" ? "#fff" : "#000",
                      }}
                    >
                      Basic
                    </label>
                    <label
                      className={label === "Standard" ? "selected" : ""}
                      onClick={() => handleLabelClick("Standard")}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        padding: `10px 14px`,
                        fontSize: 12,
                        borderRadius: 4,
                        color: label === "Standard" ? "#fff" : "#000",
                        backgroundColor:
                          label === "Standard" ? "#C19F62" : "#80808019",
                      }}
                    >
                      Standard
                    </label>

                    <label
                      className={label === "Elite" ? "selected" : ""}
                      onClick={() => handleLabelClick("Elite")}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        padding: `10px 14px`,
                        fontSize: 12,
                        borderRadius: 4,
                        color: label === "Elite" ? "#fff" : "#000",
                        backgroundColor:
                          label === "Elite" ? "#C19F62" : "#80808019",
                      }}
                    >
                      Elite
                    </label>
                    <label
                      className={label === "Premium" ? "selected" : ""}
                      onClick={() => handleLabelClick("Premium")}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        padding: `10px 14px`,
                        fontSize: 12,
                        borderRadius: 4,
                        color: label === "Premium" ? "#fff" : "#000",
                        backgroundColor:
                          label === "Premium" ? "#C19F62" : "#80808019",
                      }}
                    >
                      Premium
                    </label>
                  </div>
                  <div style={{ marginBottom: 48 }}>
                    <br /> <br />
                    <h2
                      className="vw-text"
                      style={{
                        fontSize: 16,
                      }}
                    >
                      Select
                      <span style={{ color: "#C19F62" }}> Delivery ⏰ </span>
                      Option in days
                    </h2>
                    <div
                      className="delivery-options"
                      style={{ display: "flex", marginTop: 12 }}
                    >
                      <label
                        style={{
                          marginRight: "10px",
                          cursor: "pointer",
                          padding: `10px 14px`,
                          fontSize: 12,
                          borderRadius: 4,
                          backgroundColor:
                            deliveryOption === 14 ? "#C19F62" : "#80808019",
                          color: deliveryOption === 14 ? "#fff" : "#000",
                        }}
                        className={deliveryOption === 14 ? "selected" : ""}
                        onClick={() => handleDeliveryOptionClick(14)}
                      >
                        14 Days
                      </label>
                      <label
                        style={{
                          marginRight: "10px",
                          cursor: "pointer",
                          padding: `10px 14px`,
                          fontSize: 12,
                          borderRadius: 4,
                          backgroundColor:
                            deliveryOption === 28 ? "#C19F62" : "#80808019",
                          color: deliveryOption === 28 ? "#fff" : "#000",
                        }}
                        className={deliveryOption === 28 ? "selected" : ""}
                        onClick={() => handleDeliveryOptionClick(28)}
                      >
                        28 Days
                      </label>
                      <label
                        style={{
                          marginRight: "10px",
                          cursor: "pointer",
                          padding: `10px 14px`,
                          fontSize: 12,
                          borderRadius: 4,
                          backgroundColor:
                            deliveryOption === 42 ? "#C19F62" : "#80808019",
                          color: deliveryOption === 42 ? "#fff" : "#000",
                        }}
                        className={deliveryOption === 42 ? "selected" : ""}
                        onClick={() => handleDeliveryOptionClick(42)}
                      >
                        6 weeks
                      </label>
                      <label
                        style={{
                          marginRight: "10px",
                          cursor: "pointer",
                          padding: `10px 14px`,
                          fontSize: 12,
                          borderRadius: 4,
                          backgroundColor:
                            deliveryOption === 60 ? "#C19F62" : "#80808019",
                          color: deliveryOption === 60 ? "#fff" : "#000",
                        }}
                        className={deliveryOption === 60 ? "selected" : ""}
                        onClick={() => handleDeliveryOptionClick(60)}
                      >
                        2 months
                      </label>
                    </div>
                  </div>
                  <div>
                    <h2
                      className="vw-text"
                      style={{
                        fontSize: 16,
                      }}
                    >
                      Tell us, what's your{" "}
                      <span style={{ color: "#C19F62" }}>
                        {" "}
                        design preference 😊
                      </span>
                    </h2>
                    <textarea
                      placeholder="Description"
                      value={description}
                      className="input-field"
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ height: 120 }}
                    />
                  </div>
                  <br />
                </>
              )}
              {deliveryOption && label && description ? (
                <div
                  style={{ cursor: "pointer", marginTop: 40, marginBottom: 96 }}
                >
                  <div className="div-btn-auth"></div>
                  <button
                    onClick={
                      choice === "Upholstery" ? handleUploads : handleUploader
                    }
                    className="btn-auth"
                    type="button"
                    //disabled={loading}
                  >
                    {loading ? "Loading..." : "Estimate Price"}
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );

  const handleDeliveryOptionClick = (option) => {
    setDeliveryOption(option);
    console.log("Selected Delivery Option:", option);
  };

  const handleChoice = (option) => {
    setChoice(option);
    console.log("Selected Delivery Option:", option);
  };

  const handleShape = (option) => {
    setShape(option);
    console.log("Selected Delivery Option:", option);
  };

  // const handleSeaters = (option) => {
  //   setSeaters(option);
  //   console.log("Selected Delivery Option:", option);
  // };

  const handleLabelClick = (selectedLabel) => {
    setLabel(selectedLabel);
    console.log("Selected Label:", selectedLabel);
  };

  return (
    <>
      {modalOpenLoading ? (
        <div>
          <ShimmerLoader />
          <ShimmerLoader />
          <ShimmerLoader />
          <ShimmerLoader />
          <ShimmerLoader />
          <ShimmerLoader />
          <ShimmerLoader />
        </div>
      ) : (
        <div style={styles.container}>
          <Modal
            isOpen={modalOpen}
            onClose={closeModal}
            ifClose={true}
            formContent={Content}
          />
          <Modal
            isOpen={payModal}
            onClose={() => setPayModal(false)}
            ifClose={true}
            formContent={
              <div>
                <br />
                <span
                  style={{
                    color: "#808080",
                    fontSize: 14,
                    marginTop: 120,
                    marginBottom: 48,
                    width: 24,
                    height: 24,
                    fontSize: 48,
                    backgroundColor: "#C19F6225",
                    color: "#C19F62",
                    padding: 24,
                    borderRadius: 12,
                  }}
                >
                  💳
                </span>{" "}
                <br /> <br />
                <p
                  style={{
                    color: "#808080",
                    fontSize: 14,
                    marginTop: 12,
                    marginBottom: 6,
                    width: 375,
                  }}
                >
                  Proceed to Pay
                </p>
                <h1>₦{totalPrice?.toLocaleString("en-NG")}</h1>
                <br />
                <div
                  style={{ cursor: "pointer", marginTop: 40, marginBottom: 24 }}
                >
                  <div className="div-btn-auth"></div>

                  <PaystackButton
                    {...componentProps}
                    className="btn-auth"
                    onClick={handleClick}
                  />
                </div>
              </div>
            }
          />
          <h1>Upload an Image</h1>
          <div style={styles.uploadBox} {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag & drop a file here, or click to select a file</p>
          </div>
          {imageData?.length > 0 && (
            <div className="imagesWrapper">
              {imageData.map((imgData, imgIndex) => (
                <>
                  <div
                    key={imgIndex}
                    style={styles.imageWrapper}
                    className="imageWrapper"
                  >
                    <img
                      src={imgData.url}
                      alt={`Uploaded ${imgIndex}`}
                      ref={imageRef}
                      //style={styles.image}
                      className="imageImage"
                      style={{ width: 300, height: 300 }}
                    />
                    {imgData.objects.length > 0 && (
                      <div>
                        <h2>Detected Objects:</h2>
                        <ul>
                          {imgData.objects.map((object, objIndex) => (
                            <li key={objIndex}>
                              Classification:{" "}
                              {classifySeating(
                                convertPixelsToCm(object.bbox[2]),
                                convertPixelsToCm(object.bbox[3]),
                                object.class
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    style={{
                      backgroundColor: "var(--darkOrange)",
                      border: "none",
                      padding: "16px 24px",
                      borderRadius: 24,
                      color: "#fff",
                    }}
                    onClick={() => setModalOpen(true)}
                  >
                    Estimate Price for all
                  </button>
                </>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 120,
    paddingBottom: 200,
  },
  uploadBox: {
    backgroundColor: "#C19F6225",
    padding: 48,
    borderRadius: 24,
    textAlign: "center",
  },
  imageWrapper: {
    marginTop: 24,
  },
  image: {
    // width: 400,
    // height: 300,
    borderRadius: 24,
  },
};

export default ObjectDetection;
