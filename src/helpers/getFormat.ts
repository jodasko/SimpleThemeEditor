import { VariableReferenceWithMultipleValues } from "../models/Category.enum";

export const borderCssFormat = (
  borderWidth: string,
  type: string,
  color: string
) => {
  return `${borderWidth}${type} solid ${color}`;
};

export const isTypeForTextReference = (keyReference: string) => {
  if (
    keyReference.includes(".color") ||
    keyReference.includes(".background") ||
    keyReference.includes(VariableReferenceWithMultipleValues.textfieldBorder)
  ) {
    return false;
  }
  return true;
};
