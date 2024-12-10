import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { BasePropertyProps } from "../models/BasePropertyProps.model";

interface InlineEditorProps extends BasePropertyProps {
  onUpdate: (updatedValue: string) => void;
  onCancel: () => void;
}

const InlineEditor: React.FC<InlineEditorProps> = ({
  label,
  value,
  type,
  onUpdate,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState(value[0] || "");
  const [selectedType, setSelectedType] = useState(type[0]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(e.target.value);
  };

  const handleSave = () => {
    onUpdate(inputValue); // Trigger parent update
  };

  return (
    <Box className="inline-editor">
      <Box className="editor-field">
        <Typography className="editor-label">Value:</Typography>
        <TextField
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          className="editor-input"
        />
      </Box>
      <Box className="editor-field">
        <Typography className="editor-label">Type:</Typography>
        <RadioGroup
          row
          className="editor-radio-group"
          value={selectedType}
          onChange={handleTypeChange}
        >
          {["text", "em", "px", "rem", "color"].map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio size="small" />}
              label={option}
            />
          ))}
        </RadioGroup>
      </Box>
      <Box className="editor-actions">
        <Button
          variant="contained"
          size="small"
          className="editor-save-button"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button size="small" className="editor-close-button" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default InlineEditor;
