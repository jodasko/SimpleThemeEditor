import { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { BasePropertyProps } from "../models/Variable.model";

interface VariableRowProps extends BasePropertyProps {
  onSave: () => void;
  onCancel: () => void;
}

const InlineEditor: React.FC<VariableRowProps> = ({
  label,
  value,
  type,
  keyReference,
  onCancel,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [selectedType, setSelectedType] = useState(type);

  return (
    <Box className="inline-editor">
      <Box className="editor-field">
        <Typography className="editor-label">Value:</Typography>
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="small"
          className="editor-input"
        />
      </Box>
      <Box className="editor-field">
        <Typography className="editor-label">Type:</Typography>
        <RadioGroup
          row
          value={selectedType}
          onChange={(e) =>
            setSelectedType(e.target.value as "text" | "em" | "px" | "color")
          }
          className="editor-radio-group"
        >
          <FormControlLabel
            value="text"
            control={<Radio size="small" />}
            label="Text"
          />
          <FormControlLabel
            value="em"
            control={<Radio size="small" />}
            label="EM"
          />
          <FormControlLabel
            value="px"
            control={<Radio size="small" />}
            label="PX"
          />
          <FormControlLabel
            value="color"
            control={<Radio size="small" />}
            label="Color"
          />
        </RadioGroup>
      </Box>
      <Box className="editor-actions">
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="editor-save-button"
          onClick={onSave}
        >
          OK
        </Button>
        <IconButton
          onClick={onCancel}
          size="small"
          className="editor-close-button"
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default InlineEditor;
