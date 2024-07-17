import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { subscribeToNewsletter } from "../../../Redux/order/order";
import useCustomToasts from "../../ToastNotifications/Toastify";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { showSuccessToast, showErrorToast } = useCustomToasts();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    dispatch(subscribeToNewsletter(email))
      .then((result) => {
        if (result?.payload?.message === "Subscribed successfully") {
          console.log(result, "resultresultcredentials");
          showSuccessToast("Subscribed successfully!");
          setEmail(""); // Reset the form
        } else if (
          result?.error?.message === "Request failed with status code 400"
        ) {
          showErrorToast("Email Already Subcribed to our Newsletter");
        }
        console.log(result, "resultresultcredentials");

        setLoading(false); // Set loading to false when request is completed
      })
      .catch((error) => {
        console.error("User update encountered an error:", error);
        showErrorToast("Subscription failed. Please try again.");
        setLoading(false); // Set loading to false when an error occurs
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Subscribe to our Newsletter</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <div style={{ width: "100%", alignContent: "center" }}>
          <div
            style={{
              marginTop: 32,
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 120,
            }}
          >
            <div
              className="div-btn-auth"
              style={{ backgroundColor: "#fff", height: 70 }}
            ></div>
            <button
              className="btn-auth"
              style={{
                marginTop: -14,
                height: 65,
                border: `6px solid #ffffff45`,
                backgroundColor: "#C19F62",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Get Started"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    textAlign: "center",
    backgroundColor: "#161616",
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
    color: `var(--darkOrange)`,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    maxWidth: "400px",
    padding: '16px',
  },
  input: {
    width: "100%",
    padding: "16px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: "#161616",
    color: "#fff",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default NewsletterSubscription;
