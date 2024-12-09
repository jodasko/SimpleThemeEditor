import { useEffect, useState } from "react";
import { ThemeData } from "../models/BasePropertyProps.model";
import { getData } from "../helpers/getData";

const useThemeData = (): ThemeData | undefined => {
  const [themeData, setThemeData] = useState<ThemeData>();

  const getAllData = async () => {
    const themeData = await getData();
    setThemeData(themeData);
  };

  useEffect(() => {
    getAllData();
    // getAllData().catch(console.error);
  }, []);

  return themeData;
};

export default useThemeData;
