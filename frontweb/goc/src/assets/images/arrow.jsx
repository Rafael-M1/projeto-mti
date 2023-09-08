import React from "react";

export const ArrowIcon = ({colour, width, height}) => {

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L11 11L1 21"
        stroke={colour}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
