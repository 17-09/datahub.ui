import React from "react";
import "./index.css";

export default function PornLogo(props) {
  return (
    <div className="hub">
      <span>{props.leftText}</span>
      <span>{props.rightText}</span>
    </div>
  );
}
