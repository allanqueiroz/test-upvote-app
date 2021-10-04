import React from "react";
import "./toast.css";

function Toast({ text }) {
  return <div className="snackbar">{text}</div>;
}

export default Toast;
