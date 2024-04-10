import {useEffect, useRef} from "react";
import {noop} from "../utils/misc";

export const useNuiEvent = (
  action,
  handler
) => {
  const savedHandler = useRef(noop);

  // Make sure we handle for a reactive handler
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => {
      const { action: eventAction, data } = event.data;

      if (savedHandler.current) {
        if (eventAction === action) {
          savedHandler.current(data);
        }
      }
    };

    window.addEventListener("message", eventListener);
    // Remove Event Listener on component cleanup
    return () => window.removeEventListener("message", eventListener);
  }, [action]);
};
