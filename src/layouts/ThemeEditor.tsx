import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useThemeData from "./../hooks/useThemeData";
import { ThemeData } from "../models/BasePropertyProps.model";
import Property from "./Property";
import CategoryLabel from "../components/CategoryLabel";
import Loading from "../components/Loading";

export const ThemeEditor = () => {
  const [themeData, setThemeData] = useState<ThemeData | null>(null);
  const fetchThemeData = useThemeData();

  useEffect(() => {
    if (fetchThemeData) {
      setThemeData(fetchThemeData);
    }
  }, [fetchThemeData]);

  return (
    <Box className="theme-editor__container">
      {!themeData ? (
        <Loading />
      ) : (
        <>
          <Typography className="theme-editor__header">
            Simple Theme Editor
          </Typography>
          {themeData &&
            Object.keys(themeData).map((categoryKey) => {
              const _categoryKey = categoryKey as keyof ThemeData;
              return (
                <Accordion key={categoryKey} className="accordion__container">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <CategoryLabel category={_categoryKey} />
                  </AccordionSummary>
                  <AccordionDetails>
                    {themeData[_categoryKey].map((variable) => (
                      <Property
                        category={_categoryKey}
                        key={variable.keyReference}
                        data={themeData}
                        {...variable}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          <div className="button__actions">
            <Button variant="text">Clean</Button>
            <Button variant="contained">Save</Button>
          </div>
        </>
      )}
    </Box>
  );
};
