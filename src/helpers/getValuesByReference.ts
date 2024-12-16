import { ThemeData } from "../models/BasePropertyProps.model";
import {
  Category,
  VariableReferenceWithMultipleValues,
} from "../models/Category.enum";

const UNIT_CSS_WIDTH_TYPE = ["em", "rem", "px"];

export const getType = (label: string, type: string[]) => {
  return label === VariableReferenceWithMultipleValues.textfieldBorder ||
    type[0] === "color"
    ? ":"
    : ` (${type[0]}): `;
};

export const getPropertyValues = (
  variableReference: string[],
  keyReference: string,
  types: string[],
  data: ThemeData | null,
  value: string[]
) => {
  let printOutValue;

  /**
   * Handle Properties
   * 'Border' and 'Font size' have two values, be both by variableRefences or by values or mix
   * Other Properties are single values
   */
  if (keyReference === VariableReferenceWithMultipleValues.textfieldBorder) {
    const unitAt = types.findIndex((t) => UNIT_CSS_WIDTH_TYPE.includes(t));
    const borderWidth =
      unitAt >= 0
        ? filterUnitValue(variableReference, data, unitAt, Category.globalSizes)
        : "";
    const color =
      filterUnitValue(
        variableReference,
        data,
        types.indexOf("color"),
        Category.generalColors
      ) || "";

    printOutValue = setBorderValueFormat(types, borderWidth, unitAt, color);
  } else if (
    keyReference === VariableReferenceWithMultipleValues.buttonsFontSize
  ) {
    printOutValue = setFontSizeValueFormat(variableReference, data);
  } else {
    if (value) {
      console.log(value);
      printOutValue =
        value.length > 0
          ? value[0]
          : resolveSingleReference(variableReference, data);
    }
  }

  return printOutValue;
};

export const getColorFromReference = (
  variableReference: string[],
  data: ThemeData | null
) => {
  let resolvedSingleReference;
  [Category.generalColors].forEach((currentCategory) => {
    if (data) {
      data[currentCategory].forEach((property) => {
        if (
          variableReference &&
          variableReference[0] === property.keyReference
        ) {
          resolvedSingleReference = property.value;
        }
      });
    }
  });
  return resolvedSingleReference;
};

const filterUnitValue = (
  variableReference: string[],
  data: any,
  unitIndex: number,
  category: string
) => {
  return data[category]
    .filter(
      (property: any) => property.keyReference === variableReference[unitIndex]
    )
    .map((property: any) => property.value[0])[0]; // Return the first value
};

const resolveMultipleReferences = (
  variableReference: string[],
  data: any,
  category: string
) => {
  return variableReference
    .map((reference) =>
      data[category]
        .filter((property: any) => property.keyReference === reference)
        .map((property: any) => property.value)
    )
    .flat(); // Flatten the nested arrays
};

const resolveSingleReference = (
  variableReference: string[],
  data: ThemeData | null
) => {
  let resolvedSingleReference;
  [Category.generalColors, Category.globalSizes].forEach((currentCategory) => {
    if (data) {
      data[currentCategory].forEach((property) => {
        if (
          variableReference &&
          variableReference[0] === property.keyReference
        ) {
          resolvedSingleReference = property.value;
        }
      });
    }
  });
  return resolvedSingleReference;
};

const setBorderValueFormat = (
  types: any,
  borderWidth: string,
  unitAt: number,
  color: string
) => {
  return `${borderWidth}${types[unitAt]} solid ${color}`;
};

const setFontSizeValueFormat = (variableReference: string[], data: any) => {
  const fontSizes = resolveMultipleReferences(
    variableReference,
    data,
    Category.globalSizes
  );
  return `calc(${fontSizes.join(" * ")})`;
};
