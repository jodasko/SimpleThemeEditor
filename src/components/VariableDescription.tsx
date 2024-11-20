import { Box, Typography } from "@mui/material";
import { BasePropertyProps } from "../models/BasePropertyProps.model";

interface VariableRowProps extends BasePropertyProps {
  isEditing: boolean;
  onEdit: () => void;
}

const VariableDescription: React.FC<VariableRowProps> = ({
  label,
  value,
  type,
  keyReference,
  isEditing,
  onEdit,
}) => {
  return (
    <Box
      className={`variable-row ${isEditing ? "editing" : ""}`}
      onClick={onEdit}
    >
      <Box className="variable-value-container">
        <Typography className="variable-label">{label}:</Typography>
        {type === "color" ? (
          <>
            <Typography className="variable-value-text">{value}</Typography>
            <Box
              className="variable-color-preview"
              style={{ backgroundColor: value }}
            />
          </>
        ) : (
          <Typography className="variable-value-text">{value}</Typography>
        )}
      </Box>
      <Typography className={`variable-key ${isEditing ? "editing" : ""}`}>
        {keyReference}
      </Typography>
    </Box>
  );
};

export default VariableDescription;
