import React from "react";

export const clearGrid = (rowBase, columnBase) => {
  const rows = [];

  for (let i = 0; i < rowBase; i++) {
    rows.push(Array.from(Array(columnBase), () => 0));
  }

  return rows;
};
