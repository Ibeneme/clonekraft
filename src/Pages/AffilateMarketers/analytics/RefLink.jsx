import React, { useRef } from "react";
import { FaCopy } from "react-icons/fa";
import useCustomToasts from "../../ToastNotifications/Toastify";

const ReferralLink = ({ referralId, order }) => {
  const baseReferralLink = "https://lukasdesignlab.com/createaccount/";
  // const baseReferralLink = "http://localhost:5173/createaccount/";

  console.log(referralId, "marketer?.referralId");
  const referralLink = referralId?.referralId
    ? `${baseReferralLink}${referralId?.referralId}`
    : baseReferralLink; // If referralId exists, append it to the base link

  const linkRef = useRef(null);

  const copyToClipboard = () => {
    linkRef.current.select();
    document.execCommand("copy");
    showSuccessToast("Referral Link Copied Successfully");
  };
  const { showSuccessToast, showErrorToast } = useCustomToasts();

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        height: "100%",
      }}
    >
      {order === true ? (
        <>
          <h2 style={{ fontSize: 18 }}>User's Orders</h2>
          <p
            style={{
              color: "#66666699",
              marginBottom: 0,
              fontSize: 14,
              marginTop: -10,
            }}
          >
            Here's a data of all Orders from your referred users
          </p>
        </>
      ) : (
        <>
          <h2 style={{ fontSize: 18 }}>
            Hi
            <span style={{ marginLeft: 4, color: `var(--darkOrange)` }}>
              {referralId?.email}
            </span>
          </h2>
          <p
            style={{
              color: "#66666699",
              marginBottom: 24,
              fontSize: 14,
              marginTop: -10,
            }}
          >
            This is Your Referral Link
          </p>
          <div style={{ display: "flex", alignItems: "center", maxWidth: 700 }}>
            <input
              ref={linkRef}
              type="text"
              value={referralLink}
              readOnly
              style={{
                flex: 1,
                marginRight: 10,
                color: "#66666699",
                borderRadius: 12,
                padding: 16,
                border: "none",
                backgroundColor: "#66666612",
              }}
            />
            <div onClick={copyToClipboard}>
              <FaCopy />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReferralLink;
