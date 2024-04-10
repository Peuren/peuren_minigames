import React from "react";
import { useState, useContext } from "react";
import {useNuiEvent} from "../hooks/useNuiEvent";

const GlobalState = React.createContext();

export function StateProvider({ children }) {
    const [currentPage, setCurrentPage] = useState(undefined);
    const [settings, setSettings] = useState({});
    const [pageData, setPageData] = useState({});

    useNuiEvent("openPage", (data) => {
        if(data == false) {
            setPageData(undefined);
            setCurrentPage(undefined);
        }
        setPageData(data.options);
        setCurrentPage(data.page);
    });

    useNuiEvent("setSettings", (data) => {
        setSettings(data);
    });

    return (
        <GlobalState.Provider value={{currentPage, setCurrentPage, pageData, setPageData, settings}}>
            {children}
        </GlobalState.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalState);