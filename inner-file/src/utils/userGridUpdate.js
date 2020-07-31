import React from "react";

export const userGridUpdate = (num) => {
  const rows = [];

  for (let i = 0; i < num; i++) {
    rows.push(Array.from(Array(num), () => 0));
  }

  return rows;
};
