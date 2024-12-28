import { ThemeData } from "../models/BasePropertyProps.model";
import {
  Category,
  VariableReferenceWithMultipleValues,
} from "../models/Category.enum";
import { borderCssFormat } from "./getFormat";
import {
  retrieveTypeFromGlobalSizesTypeReference,
  retrieveValueFromGeneralColorsReference,
  retrieveValueFromGlobalSizesTypeReference,
} from "./resolveReferences";

export const getType = (
  variableReference: string[],
  types: string[],
  data: ThemeData | null
) => {
  let type;
  if (types.length === 0) {
    type = retrieveTypeFromGlobalSizesTypeReference(variableReference, data);
  } else {
    type = types[0];
  }
  return type === "color" ? ":" : ` (${type}): `;
};

/**
 * Getting properties values from KeyReferences
 * Both 'Border' and 'Font size' have two values, be by variableRefences or by values or mix
 * Other Properties have single values
 */
export const getPropertyValues = (
  variableReference: string[],
  keyReference: string,
  types: string[],
  data: ThemeData | null,
  value: string[]
) => {
  const isEdited = (types.length > 0 && value.length > 0) || false;
  let printOutValue;
  let borderWidth;
  let color;
  let type;

  if (isEdited) {
    // If the value is edited, return the value
  } else {
    // Building the value for the 'Border' property
    if (keyReference === VariableReferenceWithMultipleValues.textfieldBorder) {
      type = retrieveTypeFromGlobalSizesTypeReference(variableReference, data);
      variableReference.forEach((reference) => {
        if (reference.includes("sizes.")) {
          borderWidth = retrieveValueFromGlobalSizesTypeReference(
            reference,
            data
          );
        }
        if (reference.includes("colors.")) {
          color = retrieveValueFromGeneralColorsReference(reference, data);
        }
      });

      if (borderWidth && type && color) {
        printOutValue = borderCssFormat(borderWidth, type, color);
      } else {
        console.error("One or more values are undefined:", {
          borderWidth,
          type,
          color,
        });
      }
    } else if (
      keyReference === VariableReferenceWithMultipleValues.buttonsFontSize
    ) {
      // Building the value for the 'Font size' property
      printOutValue = setFontSizeValueFormat(variableReference, data);
    } else {
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

const setFontSizeValueFormat = (variableReference: string[], data: any) => {
  const fontSizes = resolveMultipleReferences(
    variableReference,
    data,
    Category.globalSizes
  );
  return `calc(${fontSizes.join(" * ")})`;
};
