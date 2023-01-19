import "./Popup.css";
// React
import { useEffect, useRef } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { resetPopup } from "./slices/popupSlice";

export default function Popup() {
  // State
  const message = useSelector((state) => state.popup.message);
  const type = useSelector((state) => state.popup.type);
  // Hooks
  const dispatch = useDispatch();
  const timerId = useRef(null);

  //----- Set timer for popup
  useEffect(() => {
    // Scroll to top of page
    window.scrollTo(0, 0);

    // 3sec duration
    timerId.current = setTimeout(() => {
      dispatch(resetPopup());
    }, 3000);
    // Clear timer on unmount
    return () => {
      clearTimeout(timerId.current);
    };
  }, [message]);

  if(message && type) {
    return (
      <div 
        id="popup"
        className={ type === "success" ? "popup-success" : "popup-error" }>
        { message }
      </div>
    );
  }
};