import { useMemo } from "react";
import { Box, Typography } from "@mui/material";

import { BasePropertyProps } from "../models/BasePropertyProps.model";
import { useThemeContext } from "../contexts/ThemeContext";
import {
  getType,
  getPropertyValues,
  getColorFromReference,
} from "../helpers/getValuesByReference";
import { Category } from "../models/Category.enum";
import { isTypeForTextReference } from "../helpers/getFormat";

interface PropertyDetailsProps extends BasePropertyProps {
  category: string;
  isEditing: boolean;
  onEdit: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  label,
  value,
  variableReference,
  keyReference,
  type,
  category,
  isEditing,
  onEdit,
}) => {
  const {
    state: { themeData },
  } = useThemeContext();

  const displayType = useMemo(() => {
    return !isTypeForTextReference(keyReference)
      ? null
      : getType(variableReference, type, themeData);
  }, [variableReference, type, themeData]);

  const displayValue = useMemo(() => {
    return category === Category.generalColors ||
      category === Category.globalSizes
      ? value[0]
      : getPropertyValues(
          variableReference,
          keyReference,
          type,
          themeData,
          value
        );
  }, [value, variableReference, keyReference, type, themeData, category]);

  const displayColor = useMemo(() => {
    return value.length > 0
      ? value[0]
      : getColorFromReference(variableReference, themeData);
  }, [variableReference, themeData]);

  return (
    <Box
      className={`variable-row ${isEditing ? "editing" : ""}`}
      onClick={onEdit}
    >
      <Box className="variable-value-container">
        <Typography className="variable-label">
          {label}
          {displayType}
        </Typography>
        <Typography className="variable-value-text">
          <b>{displayValue}</b>
        </Typography>
        {type[0] === "color" && (
          <Box
            className="variable-color-preview"
            style={{ backgroundColor: displayColor }}
          ></Box>
        )}
      </Box>
      <Typography className={`variable-key ${isEditing ? "editing" : ""}`}>
        {keyReference}
      </Typography>
    </Box>
  );
};

export default PropertyDetails;
