import { useEffect, useState } from "react";

import VariableDescription from "../components/VariableDescription";

import { Category, CategoryProperty } from "../models/category.enum";
import InlineEditor from "../components/InlineEditor";
import {
  BasePropertyProps,
  ThemeData,
} from "../models/BasePropertyProps.model";

interface PropertyProps extends BasePropertyProps {
  // onValueUpdate: (newValue: string) => void;
  // resolvedValue: string; // Add resolvedValue
  data: ThemeData;
  category: string;
  // onValueUpdate: (newValue: string) => void; // Update function
}

const Property: React.FC<PropertyProps> = ({
  label,
  value,
  type,
  keyReference,
  variableReference,
  data,
  category,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [resolvedValue, setResolvedValue] = useState<string[]>([]);
  // const [inputValue, setInputValue] = useState(value);
  // const [selectedType, setSelectedType] = useState(type);

  const toggleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  // const handleSave = (newValue: string) => {
  //   onValueUpdate(newValue); // Update parent state
  //   setEditMode(false);
  // };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const resolveValue = () => {
    // Always reset the resolved values array
    setResolvedValue([]);

    if (
      category === Category.generalColors ||
      category === Category.globalSizes
    ) {
      setResolvedValue(value);
    } else {
      if (
        (category === Category.textField &&
          label === CategoryProperty.border) ||
        (category === Category.buttons &&
          label === CategoryProperty.fontSizeRem)
      ) {
        [Category.generalColors, Category.globalSizes].forEach(
          (currentCategory) => {
            data[currentCategory].forEach((property) => {
              if (variableReference?.length) {
                variableReference.forEach((reference) => {
                  if (reference === property.keyReference) {
                    setResolvedValue((prevValue) => [
                      ...prevValue,
                      ...property.value,
                    ]);
                  }
                });
              }
            });
          }
        );
      } else {
        [Category.generalColors, Category.globalSizes].forEach(
          (currentCategory) => {
            data[currentCategory].forEach((property) => {
              if (
                variableReference &&
                variableReference[0] === property.keyReference
              ) {
                setResolvedValue(property.value);
              }
            });
          }
        );
      }
    }
  };

  useEffect(() => {
    resolveValue();
  }, []);

  return (
    <>
      <VariableDescription
        label={label}
        value={resolvedValue}
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
