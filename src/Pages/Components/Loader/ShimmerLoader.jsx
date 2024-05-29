import React from "react";
import "./ShimmerLoader.css"; // Import CSS file for styling

const ShimmerLoader = () => {
  return (
    <>
      <div className="shimmer-loader " style={{ height: 100 }}>
        <div className="shimmer-animation" style={{ height: 100 }}></div>
      </div>
      <div className="shimmer-loader " style={{ height: 100 }}>
        <div className="shimmer-animation" style={{ height: 100 }}></div>
      </div>
      <div className="shimmer-loader " style={{ height: 100 }}>
        <div className="shimmer-animation" style={{ height: 100 }}></div>
      </div>
      <div className="shimmer-loader " style={{ height: 100 }}>
        <div className="shimmer-animation" style={{ height: 100 }}></div>
      </div>
      <div className="shimmer-loader " style={{ height: 100 }}>
        <div className="shimmer-animation" style={{ height: 100 }}></div>
      </div>
      <div className="shimmer-loader " style={{ height: 100 }}>
        <div className="shimmer-animation" style={{ height: 100 }}></div>
      </div>
    </>
  );
};

export default ShimmerLoader;
