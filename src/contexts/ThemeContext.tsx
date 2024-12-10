import React, { createContext, useContext } from "react";
import useFetchData from "../hooks/useFetchData";
import { ThemeData } from "../models/BasePropertyProps.model";

const URL_JSON_DATA = "/data/data.json";

// Define the shape of the context
interface ThemeContextState {
  themeData: ThemeData | null;
  loading: boolean;
  error: string | null;
}

interface ThemeContextProps {
  state: ThemeContextState;
}

const initialState: ThemeContextState = {
  themeData: null,
  loading: false,
  error: null,
};

const ThemeContext = createContext<ThemeContextProps>({
  state: initialState,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: themeData,
    loading,
    error,
  } = useFetchData<ThemeData>(URL_JSON_DATA);

  const state = {
    themeData,
    loading,
    error,
  };

  return (
    <ThemeContext.Provider value={{ state }}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
