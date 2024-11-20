import React from "react";
import { getLabels } from "../helpers/getLabels";
import Typography from "@mui/material/Typography";

const Labels: React.FC<{ category: string }> = ({ category }) => {
  return (
    <Typography className="accordion-title">{getLabels(category)}</Typography>
  );
};

export default Labels;
