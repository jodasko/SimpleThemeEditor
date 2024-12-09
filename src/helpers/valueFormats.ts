import { ThemeData, valueTypes } from "../models/BasePropertyProps.model";
import {
  Category,
  CategoryProperty,
  VariableReferenceWithMultipleValues,
} from "../models/Category.enum";

const UNIT_CSS_WIDTH_TYPE = ["em", "rem", "px"];

export const getTypeFormat = (label: string, type: valueTypes[]) => {
  return label === CategoryProperty.border || type[0] === "color"
    ? ""
    : ` (${type[0]}): `;
};

export const getValueFormat = (
  value: string[],
  variableReference: string[],
  keyReference: string,
  types: valueTypes[],
  data: ThemeData,
  category: string
) => {
  let printOutValue;

  /**
   * Handle Variables
   * Variables are references itself, not accept other references
   */
  if (
    (category === Category.generalColors ||
      category === Category.globalSizes) &&
    value.length === 1
  ) {
    printOutValue = value[0];
  } else {
    /**
     * Handle Properties
     * 'Border' and 'Font size' have two values, be both by variableRefences or by values or mix
     * Other Properties are single values
     */
    if (keyReference === VariableReferenceWithMultipleValues.textfieldBorder) {
      console.log("sssssssssssssssss");
      const unitAt = types.findIndex((t) => UNIT_CSS_WIDTH_TYPE.includes(t));
      const borderWidth =
        unitAt >= 0
          ? filterUnitValue(
              variableReference,
              data,
              unitAt,
              Category.globalSizes
            )
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
      printOutValue = resolveSingleReference(variableReference, data);
    }
  }

  return printOutValue;
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
  data: ThemeData
) => {
  let resolvedSingleReference;
  [Category.generalColors, Category.globalSizes].forEach((currentCategory) => {
    data[currentCategory].forEach((property) => {
      if (variableReference && variableReference[0] === property.keyReference) {
        resolvedSingleReference = property.value;
      }
    });
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
