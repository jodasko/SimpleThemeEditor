import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useThemeData from "../../hooks/useThemeData";
import { Category } from "../../models/category.enum";
import "./ThemeEditor.css";

export const ThemeEditor = () => {
  const themeData = useThemeData();

  const getCategoryTitle = (category: string) => {
    let title: string;

    switch (category) {
      case "generalColors":
        title = Category.generalColors;
        break;
      case "globalSizes":
        title = Category.globalSizes;
        break;
      case "textField":
        title = Category.textField;
        break;
      default:
        title = Category.buttons;
        break;
    }

    return title;
  };

  return (
    <Box className="theme-editor_container">
      <Typography className="theme-editor_header" variant="h5" mb={2}>
        Simple Theme Editor in React, TypeScript & Vite{" "}
      </Typography>
      {themeData &&
        Object.keys(themeData).map((categoryKey) => (
          <Accordion key={categoryKey} className="accordion_container">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${categoryKey}-content`}
              id={`${categoryKey}-header`}
              className="accordion-custom_summary"
            >
              <Typography>{getCategoryTitle(categoryKey)}</Typography>
            </AccordionSummary>
            <AccordionDetails className="accordion-custom_details">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
        ))}
      <div className="button_actions">
        <Button variant="text">Clean</Button>
        <Button variant="contained">Save</Button>
      </div>
    </Box>
  );
};
