import { useEffect, useState } from "react";
import { getData } from "../helpers/getData";

type ThemeVariable = {
  label: string;
  value: string;
  type: "color" | "number" | "border" | "size";
  key: string;
};

type ThemeData = {
  generalColors: ThemeVariable[];
  globalSizes: ThemeVariable[];
  textField: ThemeVariable[];
  buttons: ThemeVariable[];
};

const useThemeData = () => {
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
