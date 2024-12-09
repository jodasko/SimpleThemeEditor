import { useState } from "react";
import VariableDescription from "../components/VariableDescription";
import InlineEditor from "../components/InlineEditor";
import {
  BasePropertyProps,
  ThemeData,
} from "../models/BasePropertyProps.model";

interface PropertyProps extends BasePropertyProps {
  category: string;
  data: ThemeData;
}

const Property: React.FC<PropertyProps> = ({
  label,
  value,
  variableReference,
  keyReference,
  type,
  data,
  category,
}) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  const handleUpdate = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <>
      <VariableDescription //change name for something that wraps variable and property concept
        label={label}
        value={value}
        variableReference={variableReference}
        category={category}
        keyReference={keyReference}
        type={type}
        data={data}
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
