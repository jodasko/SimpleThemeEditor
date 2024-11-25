import { Box, Typography } from "@mui/material";
import { BasePropertyProps } from "../models/BasePropertyProps.model";
import { typeFormat, valueFormat } from "../helpers/valueFormats";

interface VariableDescriptionProps extends BasePropertyProps {
  isEditing: boolean;
  onEdit: () => void;
}

const VariableDescription: React.FC<VariableDescriptionProps> = ({
  label,
  value,
  keyReference,
  type,
  isEditing,
  onEdit,
}) => {
  return (
    <Box
      className={`variable-row ${isEditing ? "editing" : ""}`}
      onClick={onEdit}
    >
      <Box className="variable-value-container">
        <Typography className="variable-label">
          {label}
          {typeFormat(label, type)}
        </Typography>
        <Typography className="variable-value-text">
          {valueFormat(label, type, value)}
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
