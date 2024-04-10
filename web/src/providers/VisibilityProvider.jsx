import React, {Context, createContext, useContext, useEffect, useState} from "react";
import {useNuiEvent} from "../hooks/useNuiEvent";
import {fetchNui} from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

const VisibilityCtx = createContext(null);

export const VisibilityProvider = ({ children }) => {
  const [visible, setVisible] = useState(isEnvBrowser());

  useNuiEvent('setVisible', setVisible);

  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e) => {
      if (["Backspace", "Escape"].includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hide");
        else setVisible(!visible);
      }
    }

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible])

  return (
    <VisibilityCtx.Provider
      value={{
        visible,
        setVisible
      }}
    >
    <div style={{ transition: "visibility: 0.5s", visibility: visible ? 'visible' : 'hidden'}}>
      {children}
    </div>
  </VisibilityCtx.Provider>)
}

export const useVisibility = () => useContext(VisibilityCtx);