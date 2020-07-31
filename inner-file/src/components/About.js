import React from "react";

export const About = () => {
  return (
    <div>
      <h1>Conways game of life build</h1>
      <h2>Background:</h2>
      <p>
        The Game of Life, also known simply as Life, is a cellular automaton
        devised by the British mathematician John Horton Conway in 1970.
        <br /> It is a zero-player game, meaning that its evolution is
        determined by its initial state, requiring no further input.
        <br />
        <br />
        In other words, evolution of cells, relative to John Conways rules for
        the game of life.
      </p>
      <h2>Rules:</h2>
      <p>
        If the cell is alive and has 2 or 3 neighbors, then it remains alive.
        Else it dies.
        <br />
        If the cell is dead and has exactly 3 neighbors, then it comes to life.
        Else if remains dead.
      </p>
    </div>
  );
};
