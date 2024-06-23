import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Orders.css"; // Import CSS file for styling
import { BsChatFill } from "react-icons/bs";
//import { formatDate } from "./Profile";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import { baseApiUrl } from "../../../Redux/Baseurl/Baseurl";
import { useDispatch } from "react-redux";
import {
  getOrders,
  getRatings,
  getRatingsPerOrder,
  updateOrderClient,
} from "../../../Redux/order/order";
import { crossUser } from "../../../Redux/auth/auth";
import Modal from "../../Components/Modal/Modal";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import DMSansRegular from "../../../assets/font/DMSans-Regular.ttf"; // Update the path to the regular font file
import DMSansBold from "../../../assets/font/DMSans-Bold.ttf"; // Update the path to the bold font file
import logoImage from "../../../assets/woods/logo.jpg"; // Update the path to your logo image
import ProgressBarComponent from "./Progress/Progress";
import { capitalizeFirstLetter } from "../../../Admin/Orders/OrderDescription";
import ExperienceRatingModal from "../../LandingPage/Newsletter/Rating";
import RatingCard from "../../LandingPage/Newsletter/RateCard";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import CopyToClipboard from "../../LandingPage/Newsletter/Copy";
import { FaCopy } from "react-icons/fa";
import OrderLink from "../../LandingPage/Newsletter/Copy";

export const formatNumberWithCommas = (number) => {
  return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const calculateVAT = (amountPaid) => {
  return amountPaid * 0.075;
};

// Register the font family
Font.register({
  family: "DM Sans",
  fonts: [
    { src: DMSansRegular, fontWeight: "normal" },
    { src: DMSansBold, fontWeight: "bold" },
  ],
});

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// PDF component for displaying the payment details
const PaymentReceipt = ({ installment }) => (
  <Document>
    <Page size="A4">
      <View style={stylesPdf.section}>
        <View>
          <Image
            src={logoImage}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
              marginTopF: 24,
            }}
          />
          <Text style={stylesPdf.title}>Installmental Payment Receipt</Text>
          <Text style={stylesPdf.price}>
            Paid: NGN{" "}
            {formatNumberWithCommas(
              installment.amountPaid
              //+ calculateVAT(installment.amountPaid)
            )}
          </Text>

          <Text style={stylesPdf.date}>{formatDate(installment.datePaid)}</Text>
        </View>
        <View
          style={{
            marginTop: 16,
            paddingTop: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 120,
              justifyContent: "space-between",
            }}
          >
            <Text style={stylesPdf.text}>ID:</Text>{" "}
            <Text style={stylesPdf.text}>{installment._id}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={stylesPdf.text}>Payment ID:</Text>{" "}
            <Text style={stylesPdf.text}>{installment._id}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={stylesPdf.text}>Cost:</Text>{" "}
            <Text style={stylesPdf.text}>
              NGN {formatNumberWithCommas(installment.amountPaid)}
            </Text>
          </View>
          {/* <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={stylesPdf.text}>Vat 7.5%:</Text>{" "}
            <Text style={stylesPdf.text}>
              NGN {formatNumberWithCommas(calculateVAT(installment.amountPaid))}
            </Text>
          </View> */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={stylesPdf.text}>Balance to Paid:</Text>{" "}
            <Text style={stylesPdf.text}>
              NGN{formatNumberWithCommas(installment.balanceLeft)}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={stylesPdf.text}>To be Delivered in</Text>{" "}
            <Text style={stylesPdf.text}>
              {installment.deliveryOption} days
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 16,
            paddingTop: 16,
          }}
        >
          <Text style={stylesPdf.title}>Balance</Text>
          <Text style={[stylesPdf.price, { fontSize: 20 }]}>
            NGN {formatNumberWithCommas(installment?.balanceLeft)}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

const stylesPdf = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: "center",
    fontFamily: "DM Sans",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
    fontSize: 20,
    color: `#121212`,
    marginTop: 12,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666666",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "#666666",
  },

  price: {
    fontSize: 32,
    marginBottom: 10,
    fontWeight: 900,
    color: `#C19F62`,
  },
});

const OrderDescriptionPage = () => {
  const location = useLocation();
  const { ordersFetched } = location.state;
  const [order, setOrdersFetched] = useState([]);
  const [rating, setRatings] = useState([]);
  useEffect(() => {
    handleFetchOrders();
    handleFetchRating();
  }, []);
  const [progress, setProgress] = useState(0);

  const handleFetchOrders = () => {
    dispatch(getOrders())
      .then((response) => {
        console.log("orders successful:", response);
        const matchedOrder = response?.payload?.orders?.find(
          (order) => order?._id === traceOrder?._id
        );
        console.log(matchedOrder, "matchedOrder");
        if (matchedOrder) {
          setOrdersFetched(matchedOrder);
          setProgress(matchedOrder?.progress);
        } else {
          setOrdersFetched([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setLoading(false);
      });
  };
  const handleFetchRating = () => {
    dispatch(getRatingsPerOrder(ordersFetched?._id))
      .then((response) => {
        console.log("orders handleFetchRating:", response);
        setRatings(response?.payload);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setLoading(false);
      });
  };
  const handleDownloadPDF = (installment) => {
    console.log(installment, "installmentinstallment");
    // Create a blob from the PaymentReceipt component for the given installment
    const blob = new Blob([<PaymentReceipt installment={installment} />], {
      type: "application/pdf",
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element
    const a = document.createElement("a");

    // Set anchor attributes
    a.href = url;
    a.download = "payment_receipt.pdf";
    // Append the anchor to the document body
    document.body.appendChild(a);

    // Programmatically click the anchor to trigger the download
    a.click();

    // Remove the anchor from the document body
    document.body.removeChild(a);

    // Revoke the URL to release resources
    window.URL.revokeObjectURL(url);
    console.log(window.URL.revokeObjectURL(url), "installmentinstallment");
  };

  const whatsappNumber = "+2349134270313";
  // Format the phone number for WhatsApp (remove any leading zeros and add the country code)
  const formattedNumber = whatsappNumber.startsWith("0")
    ? `+234${whatsappNumber.slice(1)}`
    : whatsappNumber;

  // Ensure selectedImages is an array, even if it's undefined or null
  const imageUrls = order?.selectedImages || [];

  // Construct the message string with the images
  const imagesText = imageUrls.map((url) => `\n${url}`).join("");
  const message = `Hello, I am ${order?.username}. My email is ${order?.email}. I have an inquiry regarding my order with ID: ${order?._id}. Can we negotiate on this on my order as described: ${order?.description}.${imagesText}`;
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClickWhatsapp = () => {
    window.open(whatsappUrl, "_blank");
  };

  const [selectedInstallment, setSelectedInstallment] = React.useState(null);

  const handleInstallmentClick = (installment) => {
    setSelectedInstallment(installment);
    setModalOpenPDF(true);
  };

  const PAYSTACK_SECRET_KEY =
    "pk_live_1314935c92fe40573d7c8105b93a7201c9cc72e3";
  const dispatch = useDispatch();

  const traceOrder = ordersFetched;

  const handleUploads = () => {
    setLoading(true);
    // console.log(order?.price);

    dispatch(crossUser(order?._id))
      .then((response) => {
        setLoading(false);
        // Handle success
        console.log("Request created successfully:", response);
        handleFetchOrders();
        navigate("/sucess");
      })
      .catch((error) => {
        setLoading(true);
        //showErrorToast("Errorupdating Order");
        console.error("Error Order Request:", error);
      });

    //setModalOpen(false);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 0 : prevProgress + 10
  //     );
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const handleInstallments = () => {
    setLoading(true);

    if (paymentOption === "withoutInstallments") {
      const payload = {
        order_id: order?._id,
        amountPaid:
          grandTotal === 0
            ? Math.round(order?.balanceLeft)
            : Math.round(grandTotal),
      };
      console.log("kkpayload", payload);
      dispatch(
        updateOrderClient({ credentials: payload, order_id: order?._id })
      )
        .then((response) => {
          setLoading(false);
          //Handle success
          console.log("Request created successfully:", response);
          if (response.payload.message === "Payment processed successfully") {
            handleFetchOrders();
            navigate("/sucess");
            setModalOpen(false);
          }
          handleFetchOrders();
          //navigate("/sucess");
        })
        .catch((error) => {
          setLoading(true);
          console.error("Error Order Request:", error);
        });
    } else {
      const payload = {
        order_id: order?._id,
        installment: true,
        amountPaid:
          grandTotal === 0
            ? Math.round(order?.balanceLeft)
            : Math.round(grandTotal),
      };
      console.log("pay pay pay pay", payload);
      dispatch(
        updateOrderClient({ credentials: payload, order_id: order?._id })
      )
        .then((response) => {
          setLoading(false);
          // Handle success

          console.log("Request created successfully:", response);
          if (response.payload.message === "Payment processed successfully") {
            handleFetchOrders();
            setModalOpen(false);
            navigate("/sucess");
          }
          // handleFetchOrders();
          //navigate("/sucess");
        })
        .catch((error) => {
          setLoading(true);
          console.error("Error Order Request:", error);
        });
    }

    //setModalOpen(false);
  };

  const orderBalanceLeft = order?.balanceLeft ? order?.balanceLeft : 0;

  const [grandTotal, setGrandTotal] = useState(orderBalanceLeft);
  console.log(grandTotal, "ordersFetched");
  const [modalOpenPDF, setModalOpenPDF] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState("");
  const [installmentPlan, setInstallmentPlan] = useState(null);
  const [installmentBalance, setInstallmentBalance] = useState(null);
  const [payThisAmount, setPayThisAmount] = useState(null);

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
    const surcharge = (price * 0.075).toFixed(2);
    if (event.target.value === "withoutInstallments") {
      setInstallmentPlan(null);
      setInstallmentBalance(null);
      //const totalWithoutInstallments = (price * 1.075).toFixed(2); // Add 7.5% surcharge
      const totalWithoutInstallments = price.toFixed(2); // Add 7.5% surcharge

      setGrandTotal(totalWithoutInstallments);
      setPayThisAmount(price);
    } else if (event.target.value === "nego") {
      window.open(whatsappUrl, "_blank");
    } else {
      const installmentAmount = (price * 0.6).toFixed(2);
      const totalWithSurcharge = installmentAmount; // Add 7.5% surcharge to the installment amount
      //const totalWithSurcharge = (installmentAmount * 1.075).toFixed(2); // Add 7.5% surcharge to the installment amount

      setInstallmentPlan(installmentAmount);
      setInstallmentBalance((price * 0.4).toFixed(2));
      setGrandTotal(totalWithSurcharge);
      setPayThisAmount(price * 0.6);
    }
  };

  const price = order?.price;
  console.log(price, order?.price, order, "orderorderorder");

  const handleSubmit = () => {
    if (paymentOption === "withoutInstallments") {
      console.log(`Total price to be paid: $${price}`);
      setPayThisAmount(price);
      setGrandTotal(price.toFixed(2)); // Add 7.5% surcharge
    } else if (paymentOption === "withInstallments") {
      console.log(`Payment option: ${paymentOption}`);
      setPayThisAmount(price * 0.6);
      const installmentAmount = (price * 0.6).toFixed(2);
      setInstallmentPlan(installmentAmount);
      setInstallmentBalance((price * 0.4).toFixed(2));
      setGrandTotal(installmentAmount.toFixed(2)); // Add 7.5% surcharge to the installment amount
      console.log(`First installment (60%): $${installmentAmount}`);
      console.log(`Second installment (40%): $${(price * 0.4).toFixed(2)}`);
    }
  };

  // State to track the URL of the currently selected big display image
  const [bigDisplayImage, setBigDisplayImage] = useState(
    ordersFetched?.selectedImages && ordersFetched?.selectedImages.length > 0
      ? ordersFetched?.selectedImages[0]
      : ordersFetched?.selectedImages[0]
  );
  const [bigDisplayImageProgress, setBigDisplayImageProgress] = useState(
    ordersFetched?.progressImages && ordersFetched?.progressImages.length > 0
      ? ordersFetched?.progressImages[0]
      : ordersFetched?.progressImages[0]
  );

  // State to track the index of the currently selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImageIndexProgress, setSelectedImageIndexProgress] =
    useState(0);
  const handleImageClickProgress = (image, index) => {
    setBigDisplayImageProgress(image);
    setSelectedImageIndexProgress(index);
  };
  // Function to handle clicking on an image to set it as the big display
  const handleImageClick = (image, index) => {
    setBigDisplayImage(image);
    setSelectedImageIndex(index);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date)?.toLocaleDateString(undefined, options);
  };

  // Function to calculate the delivery date based on order creation date and delivery option
  const calculateDeliveryDate = (createdAt, deliveryOption) => {
    const deliveryDate = new Date(createdAt);
    deliveryDate?.setDate(deliveryDate?.getDate() + deliveryOption);
    const today = new Date();

    // Check if the delivery date is past today
    if (deliveryDate < today) {
      return "Order already delivered";
    } else {
      // Format the delivery date using the formatDate function
      return formatDate(deliveryDate);
    }
  };

  // Function to capitalize the first letter and make the rest lowercase
  // const capitalizeFirstLetter = (string) => {
  //   return string?.charAt(0)?.toUpperCase() + string?.slice(1)?.toLowerCase();
  // };

  const navigate = useNavigate();
  const handleOrderClicks = (order) => {
    console.log("kksks");
    navigate("/chatpage", { state: { order: order } });
    // Navigate to another page and pass the selected order as a parameter
    // history.push(`/order-description/${order._id}`, { order });
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Function to calculate the time remaining until the maximum price should be set
  function calculateTimeRemaining() {
    const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;
    const createdAtTime = new Date(order.createdAt).getTime();
    const currentTime = new Date().getTime();
    const deadline = createdAtTime + SIX_HOURS_IN_MS;
    return Math.max(deadline - currentTime, 0);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Function to handle clicking on the "Proceed to Payment" button
  const handleProceedToPayment = () => {
    // Check if the current time exceeds the deadline for setting the maximum price
    if (timeRemaining === 0) {
      alert("The deadline for setting the maximum price has passed.");
      return;
    }
    // Proceed to payment logic here
  };
  const formatCountdown = (time) => {
    const hours = Math?.floor(time / (1000 * 60 * 60));
    const minutes = Math?.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math?.floor((time % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const amount = order?.price * 100; // Paystack expects the amount in kobo

  //const amount = order?.price;
  const generateUniqueReference = (email, amount) => {
    // Other  const generateUniqueReference = (email, amount) => {
    const timestamp = Date?.now();
    const obfuscatedEmail =
      email?.split("@")[0] + Math?.random()?.toString(36)?.substring(2, 7);
    return `${obfuscatedEmail}${timestamp}${amount}`;
  };

  const [loading, setLoading] = useState(false);
  //const sampleTotalAmount = 100; // amount in your local currency units
  const sampleUserEmail = order?.email;
  const sampleReference = generateUniqueReference(order?.email, amount);
  const publicKey = PAYSTACK_SECRET_KEY; // Use your public key here
  const componentProps = {
    email: order?.email,
    amount: grandTotal === 0 ? order?.balanceLeft * 100 : grandTotal * 100,
    //amount: 10000,
    publicKey,
    text:
      order?.isInstallment === true
        ? "Pay Balance"
        : loading
        ? "loading..."
        : "Proceed to Pay",
    onSuccess: (response) => {
      setLoading(false);
      console.log("Payment Successful!", response, "responseresponse");
      //setModalOpenLoading(true);
      handleInstallments();
      //handleUploads();
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

  //const [orderId, setOrderId] = useState(""); // State to hold the orderId

  const handleCross = async () => {
    try {
      // Make the PUT request to mark the order as paid
      const response = await axios.put(
        `${baseApiUrl}/order/cross/${order?._id}`
      );
      console.log(response.data); // Log the response from the server
      // You can handle success or display a message here
    } catch (error) {
      console.error("Error marking order as paid:", error);
      // Handle error or display an error message
    }
  };

  const Content = (
    <div style={styles.container}>
      <h1 style={{ fontSize: 32, paddingRight: 96 }}>
        Choose a Payment Option
      </h1>
      <br /> <br />
      <div style={styles.optionContainer}>
        <input
          type="radio"
          value="withoutInstallments"
          checked={paymentOption === "withoutInstallments"}
          onChange={handlePaymentOptionChange}
          id="withoutInstallments"
          style={styles.radioInput}
        />
        <label htmlFor="withoutInstallments" style={styles.customLabel}>
          Pay Without Installments
        </label>
      </div>
      <div style={styles.optionContainer}>
        <input
          type="radio"
          value="withInstallments"
          checked={paymentOption === "withInstallments"}
          onChange={handlePaymentOptionChange}
          id="withInstallments"
          style={styles.radioInput}
        />
        <label htmlFor="withInstallments" style={styles.customLabel}>
          Pay in Installments
        </label>
      </div>
      <div style={styles.optionContainer} onClick={handleClickWhatsapp}>
        <input
          type="radio"
          value="nego"
          checked={paymentOption === "nego"}
          onChange={handlePaymentOptionChange}
          id="nego"
          style={styles.radioInput}
        />
        <label htmlFor="nego" style={styles.customLabel}>
          Bargain your price
        </label>
      </div>
      {/* //whatsappUrl */}
      {paymentOption === "withInstallments" && (
        <div style={styles.installments}>
          <br />
          {paymentOption === "withInstallments" && (
            <>
              <h2 style={{ fontSize: 16 }}>
                First Installment Plan - You'll Pay 60%
              </h2>

              {/* <p
                style={{
                  fontSize: 16,
                  marginBottom: 48,
                  fontWeight: 900,
                }}
              >
                {" "}
                ₦{formatNumberWithCommas(installmentPlan)}
              </p> */}
              {/* <p
                style={{
                  fontSize: 16,
                  marginTop: -32,
                  marginBottom: 48,
                  fontWeight: 900,
                }}
              >
                {" "}
                + ₦{formatNumberWithCommas(calculateVAT(installmentPlan))} ( Vat
                - 7.5%)
              </p> */}
              <p style={{ fontSize: 32, fontWeight: 900 }}>
                {" "}
                ₦{formatNumberWithCommas(grandTotal)}
              </p>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  backgroundColor: `var(--darkOrange)`,
                  padding: 12,
                  color: "#fff",
                }}
              >
                {" "}
                You'll Balance ₦{formatNumberWithCommas(installmentBalance)}
              </p>
            </>
          )}
        </div>
      )}
      {paymentOption === "withoutInstallments" && (
        <div style={styles.installments}>
          <br />
          {paymentOption === "withoutInstallments" && (
            <>
              <h2 style={{ fontSize: 16 }}>You'll Pay</h2>

              {/* <p
                style={{
                  fontSize: 16,
                  marginBottom: 48,
                  fontWeight: 900,
                }}
              >
                {" "}
                ₦{formatNumberWithCommas(payThisAmount)}
              </p> */}
              {/* <p
                style={{
                  fontSize: 16,
                  marginTop: -32,
                  marginBottom: 48,
                  fontWeight: 900,
                }}
              >
                {" "}
                + ₦{((payThisAmount * 75) / 1000).toFixed(2)} ( Vat - 7.5%)
              </p> */}

              <p style={{ fontSize: 32, fontWeight: 900 }}>
                {" "}
                ₦{formatNumberWithCommas(grandTotal)}
              </p>
            </>
          )}
        </div>
      )}
      {paymentOption === "withoutInstallments" && (
        <div
          //onClick={handleInstallments}
          style={{ cursor: "pointer", marginTop: 40, marginBottom: 24 }}
        >
          <PaystackButton
            {...componentProps}
            className="btn-auth-black"
            style={{
              backgroundColor: "#121212",
            }}
            onClick={handleClick}
          />
        </div>
      )}
      {paymentOption === "withInstallments" && (
        <div
          //onClick={handleInstallments}
          style={{ cursor: "pointer", marginTop: 40, marginBottom: 24 }}
        >
          <PaystackButton
            {...componentProps}
            className="btn-auth-black"
            style={{
              backgroundColor: "#121212",
            }}
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
  const generateOrderLink = (orderId) => {
    return `/order-details/${orderId}`;
  };

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div>
          {order?.rated === false && order?.completed === true ? (
            <ExperienceRatingModal order={order} />
          ) : null}
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            ifClose={true}
            formContent={Content}
          />
          <Modal
            isOpen={modalOpenPDF}
            onClose={() => setModalOpenPDF(false)}
            ifClose={true}
            formContent={
              <div style={{ flex: "1 0 50%", margin: -14 }}>
                {selectedInstallment && (
                  <PDFViewer width="100%" height={600}>
                    <PaymentReceipt installment={selectedInstallment} />
                  </PDFViewer>
                )}
              </div>
            }
          />
          <h2 className="invoice-header-h2">
            Order Details - {capitalizeFirstLetter(order?.status)}
          </h2>
          <p className="invoice-header-p-id">Order ID: {order?._id}</p>
          <br />

          {order?.progress > 0 ? (
            <>
              <h1 style={{ fontSize: 16 }}>Your Order Progress</h1>
              <ProgressBarComponent progress={progress} />
            </>
          ) : null}
        </div>
        <p
          style={{
            color: "#fff",
            backgroundColor: "#C19F62",
            padding: 16,
            borderRadius: 24,
            cursor: "pointer",
            fontSize: 12,
            display: "flex",
            gap: 12,
            height: "fit-content",
          }}
          onClick={() => handleOrderClicks(order)}
        >
          <span className="hide-bid"> Message</span>{" "}
          <span>
            {" "}
            <BsChatFill />
          </span>
        </p>
      </div>

      <div className="flex-orders">
        <div className="flex-orders-div">
          <>
            {/* <Link to={generateOrderLink(order._id)}>
              {" "}
              Share This Order <FaCopy />
            </Link> */}
            <OrderLink orderId={order._id} />
            {/* <CopyToClipboard text={generateOrderLink(order._id)} /> */}
          </>
          <>
            <div className="big-display-container">
              <img
                src={bigDisplayImage}
                alt="Big Display"
                className="big-display-image"
              />
            </div>
            <div className="invoice-images">
              <div className="image-grid">
                {order?.selectedImages?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className={
                      index === selectedImageIndex
                        ? "selected-image-item"
                        : "image-item"
                    }
                    // onClick={handleUploads}
                    onClick={() => handleImageClick(image, index)}
                  />
                ))}
              </div>
              {rating ? (
                <>
                  <h1
                    style={{ marginTop: 120, textAlign: "right", fontSize: 16 }}
                  >
                    Your Rating
                  </h1>
                  <RatingCard rating={rating} />
                </>
              ) : null}
            </div>
          </>

          <>
            <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <h1>Images Displaying your Orders Progress</h1>
            <div className="big-display-container">
              <img
                src={bigDisplayImageProgress}
                alt="Big Display"
                className="big-display-image"
              />
            </div>
            <div className="invoice-images">
              <div className="image-grid">
                {order?.progressImages?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className={
                      index === selectedImageIndexProgress
                        ? "selected-image-item"
                        : "image-item"
                    }
                    // onClick={handleUploads}
                    onClick={() => handleImageClickProgress(image, index)}
                  />
                ))}
              </div>
            </div>
          </>
        </div>

        <div className="order-info">
          <h3>Order Information</h3>
          <p>Class: {capitalizeFirstLetter(order?.selectedLabel)}</p>
          <p>Status: {capitalizeFirstLetter(order?.status)}</p>
          <p>Order Created At: {formatDate(order?.createdAt)}</p>
          <p>
            Payment Status:{" "}
            {order?.paid === true
              ? "Paid"
              : order?.isInstallmentPaid === true
              ? "Paid in Installments"
              : order?.installments?.length > 0 === true &&
                order?.paid === false
              ? "First Installment Paid"
              : "Not yet Paid"}
          </p>
          <p>
            To be Delivered:{" "}
            {calculateDeliveryDate(order?.createdAt, order?.deliveryOption)}
          </p>

          {order?.seaters && (
            <p>Seaters: {capitalizeFirstLetter(order?.seaters)}</p>
          )}

          {order?.choice && (
            <p>Choice: {capitalizeFirstLetter(order?.choice)}</p>
          )}

          {order?.shape && <p>Shape: {capitalizeFirstLetter(order?.shape)}</p>}

          {order?.styleOfChair && (
            <p>
              Style of Furniture: {capitalizeFirstLetter(order?.styleOfChair)}
            </p>
          )}

          <h1 style={{ marginTop: 48, marginBottom: 64 }}>
            {order?.price ? (
              <>
                Price: ₦{formatNumberWithCommas(order?.price)} <br />
                <span style={{ fontSize: 14, marginTop: -64 }}>
                  {" "}
                  {/* +₦{formatNumberWithCommas((order?.price * 75) / 1000)} - VAT
                  Charges */}
                </span>
              </>
            ) : (
              "Admin is calculating your price, please wait"
            )}
          </h1>

          <h1 style={{ marginTop: 48, marginBottom: 64, fontSize: 24 }}>
            {order?.isInstallment === true ? (
              <>
                <div>
                  <h1 style={{ fontSize: 18 }}>You Paid in Installments</h1>
                  <div
                    style={{
                      backgroundColor: "#f4f4f4",
                      padding: `12px 12px`,
                      borderRadius: 24,
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {order?.installments.map((installment) => (
                      <p
                        key={installment?._id}
                        style={{
                          backgroundColor: "#fff",
                          padding: `12px 12px`,
                          borderRadius: 12,
                          margin: 0,
                          cursor: "pointer",
                        }}
                        //onClick={()=>handleDownloadPDF(installment)}
                        onClick={() => handleInstallmentClick(installment)}
                      >
                        <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
                          Amount Paid: ₦{installment?.amountPaid}
                          {/* + VAT: ₦  {calculateVAT(installment.amountPaid).toFixed(2)} */}
                        </p>

                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: "#666",
                            margin: 0,
                            // backgroundColor: "#C19F6225",
                            // color: "#C19F62",
                            // padding: `12px 24px`,
                            // borderRadius: 4,
                          }}
                        >
                          Date Paid: {formatDate(installment?.datePaid)}
                        </p>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 400,
                            margin: 0,
                            backgroundColor: "#C19F6225",
                            color: "#C19F62",
                            padding: `10px 24px`,
                            borderRadius: 4,
                            width: "fit-content",
                            marginTop: 16,
                          }}
                        >
                          View receipt
                        </p>
                      </p>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              " "
            )}
          </h1>

          {order?.price !== null
            ? order?.paid !== true &&
              order.isInstallment !== true && (
                // Render the "Proceed to Payment" button only if time remaining
                <div
                  style={{ cursor: "pointer", marginTop: 40, marginBottom: 24 }}
                >
                  <div className="div-btn-auth"></div>
                  <button
                    className="btn-auth"
                    onClick={() => setModalOpen(true)}
                  >
                    Proceed to Pay
                  </button>
                  {/* <PaystackButton
                {...componentProps}
                className="btn-auth"
                onClick={handleClick}
              /> */}
                </div>
              )
            : null}

          {order?.isInstallmentPaid !== true &&
            order.isInstallment === true && (
              // Render the "Proceed to Payment" button only if time remaining
              <div
                style={{
                  cursor: "pointer",
                  width: "fit-content",
                  marginTop: 40,
                  marginBottom: 24,
                }}
              >
                <h3
                  style={{ fontWeight: 600, fontSize: 16, marginBottom: 32 }}
                  //onClick={handleInstallments}
                >
                  {" "}
                  Proceed to Pay balance ₦{order?.balanceLeft}
                  {/* + Vat( ₦
                  {calculateVAT(order?.balanceLeft)}
                  ) */}
                </h3>
                <div
                  className="div-btn-auth"
                  //style={{ width: "fit-content" }}
                ></div>
                {/* <button
                //style={{ width: "fit-content" }}
                className="btn-auth"
                onClick={() => {
                  //setModalOpen(true);
                  setGrandTotal(order?.balanceLeft * 1.075 * 100);
                  console.log(order?.balanceLeft * 1.075 * 100);
                  setLoading(true);
                  handleClick()
                }}
              >
                {/* Proceed to Pay balance ₦{order?.balanceLeft} + Vat( ₦
                {calculateVAT(order?.balanceLeft)})
              </button> */}
                <PaystackButton
                  {...componentProps}
                  className="btn-auth"
                  onClick={
                    handleClick
                    //() => {
                    //setModalOpen(true);
                    // setGrandTotal(order?.balanceLeft * 1.075 * 100);
                    // console.log(
                    //   order?.balanceLeft * 1.075 * 100,
                    //   "order?.balance"
                    // );
                    // setLoading(true);

                    // // Delay handleClick() by 30 seconds
                    // setTimeout(() => {
                    //   handleClick();
                    // }, 30000);
                    // }
                  }
                />
              </div>
            )}

          <div>
            <br />

            <p
              style={{
                fontSize: 14,
              }}
            >
              Description:
            </p>
            <p
              style={{
                backgroundColor: "#C19F6220",
                color: "#C19F62",
                padding: 16,
                borderRadius: 12,
                marginTop: -8,
              }}
            >
              {order?.description}
            </p>
          </div>
          <br />
          <div className="customer-details">
            <h3>Customer Information</h3>
            <p>Customer's Email: {order?.email}</p>
            <p>Customer's Phone Number: {order?.phoneNumber}</p>
            <p>Customer's Address: {order?.address}</p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "auto",
    minWidth: 300,
  },
  optionContainer: {
    marginBottom: "24px",
  },
  label: {
    marginLeft: "8px",
    fontSize: "18px",
  },
  installments: {
    marginTop: "20px",
  },
  progressBarContainer: {
    display: "flex",
    height: "24px",
    borderRadius: "4px",
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
    position: "relative",
  },
  progressBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    position: "relative",
  },
  progressText: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: "18px",
  },
  submitButton: {
    padding: "16px 28px",
    fontSize: "18px",
    backgroundColor: "#121212",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  customLabel: {
    marginLeft: 6,
  },
};

export default OrderDescriptionPage;
