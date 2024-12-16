import React, { createContext, useContext, useEffect, useReducer } from "react";
import useFetchData from "../hooks/useFetchData";
import { ThemeData } from "../models/BasePropertyProps.model";

const URL_JSON_DATA = "/data/data.json";
const LOCAL_STORAGE = "LocalData";

// Define the shape of the context
interface ThemeContextState {
  themeData: ThemeData | null;
  loading: boolean;
  error: string | null;
}

// Define action types
type ThemeAction =
  | { type: "SET_THEME_DATA"; payload: ThemeData }
  | {
      type: "UPDATE_PROPERTY";
      payload: {
        category: keyof ThemeData;
        keyReference: string;
        newValue: string;
      };
    }
  | { type: "SAVE_TO_LOCAL_STORAGE" };

interface ThemeContextProps {
  state: ThemeContextState;
  dispatch: React.Dispatch<ThemeAction>;
}

const initialState: ThemeContextState = {
  themeData: null,
  loading: false,
  error: null,
};

const themeReducer = (
  state: ThemeContextState,
  action: ThemeAction
): ThemeContextState => {
  switch (action.type) {
    case "SET_THEME_DATA":
      return { ...state, themeData: action.payload, loading: false };

    case "UPDATE_PROPERTY": {
      const { category, keyReference, newValue } = action.payload;

      // Update the specific property in the themeData
      if (state.themeData) {
        const updatedCategory = state.themeData[category].map((property) =>
          property.keyReference === keyReference
            ? { ...property, value: [newValue] }
            : property
        );

        return {
          ...state,
          themeData: { ...state.themeData, [category]: updatedCategory },
        };
      }
      return state;
    }

    case "SAVE_TO_LOCAL_STORAGE":
      if (state.themeData) {
        localStorage.setItem(LOCAL_STORAGE, JSON.stringify(state.themeData));
      }
      return state;

    default:
      return state;
  }
};

const ThemeContext = createContext<ThemeContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const {
    data: themeData,
    loading,
    error,
  } = useFetchData<ThemeData>(URL_JSON_DATA, LOCAL_STORAGE);

  useEffect(() => {
    if (themeData) {
      dispatch({ type: "SET_THEME_DATA", payload: themeData });
    }
  }, [themeData]);

  // const {
  //   data: themeData,
  //   loading,
  //   error,
  // } = useFetchData<ThemeData>(URL_JSON_DATA, LOCAL_STORAGE);

  // const state = {
  //   themeData,
  //   loading,
  //   error,
  // };

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
