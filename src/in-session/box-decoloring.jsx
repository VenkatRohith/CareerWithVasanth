/*
Week - 5

- Create square views in the shape of C as shown in the below image.
They have the colour white.
- Upon clicking one square, it should turn green.
- User has to click all the squares one after the other in any sequence.
Once all squares are clicked, they all turn into green.
- After all squares have been clicked, the program should wait for 3
 seconds and undo the clicks
 in the reverse sequence of their clicks one after the other
 at an interval of 1 second. All divs will turn white in the reverse sequence.

 */

import { useRef, useState } from "react";

const Box = ({ enabled, onBoxClick, boxNum, isDisabled }) => {
  return (
    <button
      style={{
        width: "2rem",
        height: "2rem",
        backgroundColor: enabled ? "green" : "white",
        flexBasis: "31%",
        visibility: boxNum === 4 || boxNum === 5 ? "hidden" : "visible",
        border: "1px solid black",
        cursor: isDisabled ? "not-allowed" : "pointer",
        outline: "none",
      }}
      onClick={() => onBoxClick(boxNum)}
    ></button>
  );
};

export default function BoxDecolouring() {
  const [colorState, setColorState] = useState(() =>
    Array.from({ length: 9 }, () => false),
  );
  const [disableInteraction, setDisableInteraction] = useState(false);
  const historyRef = useRef([]);

  const setBoxColor = (boxNum) => {
    setColorState((oldColorState) => {
      const newColorState = oldColorState.map((enabled, idx) => {
        if (boxNum === idx) {
          return !enabled;
        }
        return enabled;
      });
      return newColorState;
    });
  };

  const undoClicks = (idx) => {
    if (idx < 0) {
      historyRef.current = [];
      setDisableInteraction(false);
      return;
    }
    const boxNum = historyRef.current[idx];
    setBoxColor(boxNum);
    setTimeout(() => undoClicks(idx - 1), 1000);
  };

  const handleBoxClick = (boxNum) => {
    if (disableInteraction) return;
    if (colorState[boxNum]) {
      historyRef.current = historyRef.current.filter((val) => val !== boxNum);
    } else {
      historyRef.current.push(boxNum);
    }
    setBoxColor(boxNum);
    if (historyRef.current.length === 7) {
      setDisableInteraction(true);
      setTimeout(() => undoClicks(historyRef.current.length - 1), 3000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "10rem",
        margin: "auto",
      }}
    >
      {Array.from({ length: 9 }).map((_, idx) => (
        <Box
          key={idx}
          enabled={colorState[idx]}
          boxNum={idx}
          onBoxClick={handleBoxClick}
          isDisabled={disableInteraction}
        />
      ))}
    </div>
  );
}
