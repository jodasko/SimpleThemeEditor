import { useState } from "react";

import VariableDescription from "../components/VariableDescription";
import InlineEditor from "../components/InlineEditor";
import { BasePropertyProps } from "../models/Variable.model";

interface PropertyProps extends BasePropertyProps {
  // onValueUpdate: (newValue: string) => void;
}

const Property: React.FC<PropertyProps> = ({
  label,
  value,
  type,
  keyReference,
}) => {
  const [editMode, setEditMode] = useState(false);
  // const [inputValue, setInputValue] = useState(value);
  // const [selectedType, setSelectedType] = useState(type);

  const toggleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <>
      <VariableDescription
        label={label}
        value={value}
        type={type}
        keyReference={keyReference}
        isEditing={editMode}
        onEdit={toggleEditMode}
      />
      {editMode && (
        <InlineEditor
          label={label}
          value={value}
          type={type}
          keyReference={keyReference}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default Property;
