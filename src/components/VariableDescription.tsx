import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import {
  BasePropertyProps,
  ThemeData,
} from "../models/BasePropertyProps.model";
import { getTypeFormat, getValueFormat } from "../helpers/valueFormats";

import { Category, CategoryProperty } from "../models/Category.enum";

interface VariableDescriptionProps extends BasePropertyProps {
  isEditing: boolean;
  onEdit: () => void;
  category: string;
  data: ThemeData;
}

const VariableDescription: React.FC<VariableDescriptionProps> = ({
  label,
  value,
  variableReference,
  keyReference,
  type,
  isEditing,
  onEdit,
  category,
  data,
}) => {
  return (
    <Box
      className={`variable-row ${isEditing ? "editing" : ""}`}
      onClick={onEdit}
    >
      <Box className="variable-value-container">
        <Typography className="variable-label">
          {label}
          {getTypeFormat(label, type)}
        </Typography>
        <Typography className="variable-value-text">
          <b>
            {getValueFormat(
              value,
              variableReference,
              keyReference,
              type,
              data,
              category
            )}
          </b>
        </Typography>
        {type[0] === "color" && (
          <Box
            className="variable-color-preview"
            style={{ backgroundColor: Array.isArray(value) ? value[0] : value }}
          ></Box>
        )}
      </Box>
      <Typography className={`variable-key ${isEditing ? "editing" : ""}`}>
        {keyReference}
      </Typography>
    </Box>
  );
};

export default VariableDescription;
