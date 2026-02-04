import { useEffect, useRef, useState } from "react";

const useWindowSize = () => {
  const windowDimensionsRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timerId;
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      windowDimensionsRef.current = { width: innerWidth, height: innerHeight };
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        console.log("executing");
        setDimensions({ ...windowDimensionsRef.current });
      }, 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return { ...dimensions };
};

export default useWindowSize;
