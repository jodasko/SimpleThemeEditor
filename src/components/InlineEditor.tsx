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
import {
  BasePropertyProps,
  ThemeData,
} from "../models/BasePropertyProps.model";
import { useThemeContext } from "../contexts/ThemeContext";

interface InlineEditorProps extends BasePropertyProps {
  category: keyof ThemeData;
  onCancel: () => void;
}

type HtmlInputElement = React.ChangeEvent<HTMLInputElement>;

const radioButtonsForTextFieldProperties = (
  type: string,
  keyReference: string
) => {
  if (keyReference === "textfield.textSize" && type === "color") {
    return true;
  }

  if (
    (keyReference === "textfield.color" ||
      keyReference === "textfield.background") &&
    type !== "color" &&
    type !== "text"
  ) {
    return true;
  }
};

const radioButtonsForButtonsProperties = (
  type: string,
  keyReference: string
) => {
  if (keyReference === "buttons.fontSize" && type === "color") {
    return true;
  }
  if (
    (keyReference === "buttons.color" ||
      keyReference === "buttons.background") &&
    type !== "color" &&
    type !== "text"
  ) {
    return true;
  }
};

const InlineEditor: React.FC<InlineEditorProps> = ({
  label,
  value,
  type,
  keyReference,
  category,
  onCancel,
}) => {
  const { dispatch } = useThemeContext();
  const [inputValue, setInputValue] = useState(value[0] || "");
  const [selectedType, setSelectedType] = useState(type[0]);

  const handleInputChange = (e: HtmlInputElement) => {
    setInputValue(e.target.value);
  };

  const handleTypeChange = (e: HtmlInputElement) => {
    setSelectedType(e.target.value);
  };

  const handleSave = () => {
    console.log("save", selectedType);

    dispatch({
      type: "UPDATE_PROPERTY",
      payload: {
        category,
        keyReference,
        newValue: inputValue,
      },
    });
    onCancel();
  };

  const isRadioButtonDisabled = (type: string) => {
    if (keyReference.startsWith("colors.")) {
      return true;
    }
    if (
      keyReference.startsWith("sizes.") &&
      (type === "text" || type === "color")
    ) {
      return true;
    }

    if (keyReference.startsWith("textfield.")) {
      return radioButtonsForTextFieldProperties(type, keyReference);
    }

    if (keyReference.startsWith("buttons.")) {
      return radioButtonsForButtonsProperties(type, keyReference);
    }
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
              disabled={isRadioButtonDisabled(option)}
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
