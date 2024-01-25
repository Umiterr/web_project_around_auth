import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Popup } from "./Popup/Popup";
import "../styles/InfoTooltip.css";

const InfoTooltip = ({ isOpen, closePopup }) => {
  const handler = async (event) => {
    event.preventDefault();
    closePopup();
  };
  return (
    <div className="InfoTooltip">
      <Popup
        type="InfoTooltip"
        className="form"
        isOpen={isOpen}
        closePopup={closePopup}
      >
        <div className="InfoTooltip_window"></div>
      </Popup>
    </div>
  );
};

export default InfoTooltip;
