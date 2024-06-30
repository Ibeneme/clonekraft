import React, { useRef } from "react";
import { FaCopy } from "react-icons/fa";

const ReferralLink = ({ referralId }) => {
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
  };

  return (
    <div>
      <h2>Hello {referralId?.email} This is Your Referral Link</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          ref={linkRef}
          type="text"
          value={referralLink}
          readOnly
          style={{ flex: 1, marginRight: 10 }}
        />
        <button onClick={copyToClipboard}>
          <FaCopy />
        </button>
      </div>
    </div>
  );
};

export default ReferralLink;
