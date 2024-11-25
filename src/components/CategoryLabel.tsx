import React from "react";
import { getCategoryTitle } from "../helpers/getCategoryTitle";
import Typography from "@mui/material/Typography";

const CategoryLabel: React.FC<{ category: string }> = ({ category }) => {
  return (
    <Typography className="accordion-title">
      {getCategoryTitle(category)}
    </Typography>
  );
};

export default CategoryLabel;
