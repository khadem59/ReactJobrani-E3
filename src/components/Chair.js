import React, { useState, useContext } from "react";
import style from "../styles/style.module.css";

const Chair = ({ number, price, state, clickHandler }) => {
  return (
    <>
      <button
        onClick={()=>clickHandler(number)}
        className={`${style["chair"]} ${style[`chair-${state}`]}`}
        title={`${price}`}
      >
        {number}
      </button>
    </>
  );
};

export default Chair;
