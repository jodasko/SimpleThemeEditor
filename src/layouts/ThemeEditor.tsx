import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useThemeContext } from "../contexts/ThemeContext";
import CategoryLabel from "../components/CategoryLabel";
import Loading from "../components/Loading";
import Property from "./Property";

export const ThemeEditor: React.FC = () => {
  const {
    state: { themeData, loading, error },
  } = useThemeContext();

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
                    category={categoryKey}
                  />
                )
              )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};
