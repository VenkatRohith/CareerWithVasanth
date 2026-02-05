/*
5th Question

Google / Amazon - Custom Hooks

Design a custom React hook called useWindowSize that tracks the browser window’s width and height and updates these values when the window is resized. The hook should handle event subscription and cleanup correctly and avoid causing unnecessary re-renders in components that consume it.

The hook should:Return the current window dimensions:
{ width, height }
Listen to the browser’s resize eventUpdate values only when the window size actually changes
Clean up event listeners when the component using the hook unmounts

Performance Expectations (Very Important)
Window resize events can fire many times per second.

Therefore, the hook should:
Avoid unnecessary state updates
Avoid triggering re-renders when dimensions haven’t changed
Use refs where appropriate to store mutable values without re-rendering.

FYI: No external libraries can be used.

*/

import useWindowSize from "../hooks/useWindowSize";

export default function CustomHooks() {
  const { width, height } = useWindowSize();
  return (
    <div style={{ textAlign: "center" }}>
      Width: {width}, Height: {height}
    </div>
  );
}

/*

1st Attempt - haven't referred anything

Time taken - 24min

Solving the frequent state updates using debouncing using 500ms threshold
 */
