/*

Week 2
Create four buttons (A,B,C,D) which will output the respective output. Although
when the first button then it shold output letter with arrow, but
from subsequent click, the arrow should act as delimeter

A, B, C, D
click A => A ➡️
click B next => A ➡️ B
click C next => A ➡️ B ➡️ C


Follow up, each button should only be outputted once (allowed to click one).
*/

import { useState } from "react";

const buttons = ["A", "B", "C", "D"];

export default function MultipleButton() {
  const [letterSequence, setLetterSequence] = useState("");

  const handleButtonClick = (letter) => {
    let updatedSequence = letterSequence;
    if (updatedSequence === "") {
      updatedSequence = `${letter}➡️`;
    } else if (!letterSequence.includes(letter)) /* follow up solution*/ {
      if (letterSequence.length === 3) {
        updatedSequence += letter;
      } else {
        updatedSequence = updatedSequence + `➡️${letter}`;
      }
    }
    setLetterSequence(updatedSequence);
  };

  return (
    <div style={{ margin: "auto", textAlign: "center", width: "100%" }}>
      {buttons.map((letter) => (
        <button onClick={() => handleButtonClick(letter)}>{letter}</button>
      ))}
      <h3>Output</h3>
      <div style={{ wordBreak: "break-word" }}>{letterSequence}</div>
    </div>
  );
}
