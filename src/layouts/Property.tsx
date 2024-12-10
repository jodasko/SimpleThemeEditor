import { useState } from "react";
import VariableDescription from "../components/VariableDescription";
import InlineEditor from "../components/InlineEditor";
import {
  BasePropertyProps,
  ThemeData,
} from "../models/BasePropertyProps.model";

interface PropertyProps extends BasePropertyProps {
  category: string;
  // data: ThemeData;
}

const Property: React.FC<PropertyProps> = ({
  label,
  value,
  variableReference,
  keyReference,
  type,
  category,
}) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => setEditMode((prevState) => !prevState);
  const handleCancel = () => setEditMode(false);

  const handleUpdate = () => {
    // Next Step: call an action or context dispatch to update the value
    setEditMode(false);
  };

  return (
    <>
      <VariableDescription //change name for something that wraps variable and property concept
        label={label}
        value={value}
        variableReference={variableReference}
        keyReference={keyReference}
        type={type}
        category={category}
        isEditing={editMode}
        onEdit={toggleEditMode}
      />
      {editMode && (
        <InlineEditor
          label={label}
          value={value}
          type={type}
          keyReference={keyReference}
          variableReference={variableReference}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default Property;
