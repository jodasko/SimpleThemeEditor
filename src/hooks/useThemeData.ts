import { useEffect, useState } from "react";
import { getData } from "../helpers/getData";

export type ThemeVariable = {
  label: string;
  value: string;
  type: "text" | "em" | "rem" | "px" | "color" | "border";
  keyReference: string;
};

export type ThemeData = {
  generalColors: ThemeVariable[];
  globalSizes: ThemeVariable[];
  textField: ThemeVariable[];
  buttons: ThemeVariable[];
};

const useThemeData = (): ThemeData | null => {
  const [themeData, setThemeData] = useState<ThemeData | null>(null);

  const getAllData = async () => {
    const themeData = await getData();
    setThemeData(themeData);
  };

  useEffect(() => {
    getAllData();
    getAllData().catch(console.error);
  }, []);

  return themeData;
};

export default useThemeData;
