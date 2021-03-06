import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";

//Return the size of width and height of screen
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export function GetRootState() {
  //it is neccessary for load the language correctly
  const rootState = useSelector((state: RootState) => state);
  //const language = rootState.userActions.language || "es";

  return rootState;
}
