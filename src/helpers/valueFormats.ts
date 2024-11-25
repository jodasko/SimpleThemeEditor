import { CategoryProperty } from "../models/Category.enum";

export const valueFormat = (
  label: string,
  type: string,
  value: string[]
): string | string[] => {
  let valueFormat: string | string[];
  if (label === CategoryProperty.border) {
    valueFormat = `${value[1]}${type[0]} solid ${value[0]}`;
  } else if (label === CategoryProperty.fontSizeRem) {
    valueFormat = `calc(${value[1]}*${value[0]})`;
  } else {
    valueFormat = value;
  }
  return valueFormat;
};

export const typeFormat = (label: string, type: string) => {
  let typeFormat: string;
  if (label === CategoryProperty.border || type[0] === "color") {
    typeFormat = "";
  } else {
    typeFormat = ` (${type[0]}): `;
  }
  return typeFormat;
};
