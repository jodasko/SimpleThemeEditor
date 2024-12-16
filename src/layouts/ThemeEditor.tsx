import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ThemeData } from "../models/BasePropertyProps.model";
import { useThemeContext } from "../contexts/ThemeContext";
import CategoryLabel from "../components/CategoryLabel";
import Loading from "../components/Loading";
import Property from "./Property";

export const ThemeEditor: React.FC = () => {
  const { state, dispatch } = useThemeContext();
  const { themeData, loading, error } = state;

  const handleSave = () => {
    dispatch({ type: "SAVE_TO_LOCAL_STORAGE" });
    alert("Changes saved to localStorage!");
  };

  if (loading) return <Loading />;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box className="theme-editor__container">
      <Typography className="theme-editor__header">
        <b>Simple Theme Editor</b>
      </Typography>
      {themeData &&
        Object.keys(themeData).map((categoryKey) => (
          <Accordion key={categoryKey}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <CategoryLabel category={categoryKey} />
            </AccordionSummary>
            <AccordionDetails>
              {themeData[categoryKey as keyof typeof themeData].map(
                (variable) => (
                  <Property
                    key={variable.keyReference}
                    {...variable}
                    category={categoryKey as keyof ThemeData}
                  />
                )
              )}
            </AccordionDetails>
          </Accordion>
        ))}

      <Box className="button-actions">
        <Button variant="text">Clean</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
