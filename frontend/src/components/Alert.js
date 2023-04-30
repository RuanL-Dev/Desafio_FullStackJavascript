import React from "react";

const Alert = ({ message = null }) => {
  if (!message) return null;

  return (
    <div style={{ color: "red", margin: 4 }}>
      <span className="font-medium">Info alert!</span> {message}
    </div>
  );
};

export default Alert;
