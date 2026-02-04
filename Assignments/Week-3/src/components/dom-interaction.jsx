import { useEffect, useRef } from "react";

/*
2nd Question

Swiggy - DOM Interaction

Build a React component with a bounded container (e.g., a div).
Track the mouse position only when the cursor is inside this container and render a small circle that follows the cursor.
Use useRef to store mouse coordinates so updates do not trigger unnecessary re-renders on every mouse move.

The circle should stop moving when the cursor leaves the container. Focus on correct event handling and performance.
 */
export default function DOMInteraction() {
  const boundingContainerRef = useRef();
  const circleRef = useRef();
  useEffect(() => {
    const circleElem = circleRef.current;
    const boundingContainerElem = boundingContainerRef.current;
    const trackMousePosition = (pos) => {
      if (!circleElem || !boundingContainerElem) return;

      circleElem.style.display = "block";
      circleElem.style.position = "absolute";
      circleElem.style.left = `${pos.clientX}px`;
      circleElem.style.top = `${pos.clientY}px`;
      circleElem.style.zIndex = 1;
    };
    const hideCircle = () => {
      if (!circleElem) return;

      circleElem.style.display = "none";
    };

    boundingContainerElem?.addEventListener("mousemove", trackMousePosition);
    boundingContainerElem?.addEventListener("mouseleave", hideCircle);

    return () => {
      boundingContainerElem?.removeEventListener(
        "mousemove",
        trackMousePosition,
      );
      boundingContainerElem?.removeEventListener("mouseleave", hideCircle);
    };
  }, []);

  return (
    <>
      <div
        style={{
          width: "20rem",
          height: "20rem",
          border: "1px solid red",
          margin: "auto",
          display: "block",
        }}
        ref={boundingContainerRef}
      >
        <div
          style={{
            width: "2rem",
            height: "2rem",
            border: "2px solid yellow",
            margin: 0,
            borderRadius: "50%",
            display: "none",
            padding: 0,
          }}
          ref={circleRef}
        ></div>
      </div>
    </>
  );
}

/*
1st Attempt - 1hr 10min
Have tried multiple to and fro assertions and then came to a solution. Also
referred mdn for event names and difference between mouseleave & mouseout
 */
