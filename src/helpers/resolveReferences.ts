import { ThemeData } from "../models/BasePropertyProps.model";
import { Category } from "../models/Category.enum";

export const resolveSingleReference = (
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

export const resolveMultipleReferences = (
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

export const retrieveTypeFromGlobalSizesTypeReference = (
  variableReference: string[],
  data: ThemeData | null
) => {
  let type;
  if (data) {
    data[Category.globalSizes].forEach((property) => {
      if (variableReference && variableReference[0] === property.keyReference) {
        type = property.type[0];
      }
    });
  }
  return type;
};

export const retrieveValueFromGlobalSizesTypeReference = (
  variableReference: string,
  data: ThemeData | null
) => {
  let value;
  if (data) {
    data[Category.globalSizes].find((keyRef) => {
      if (variableReference === keyRef.keyReference) {
        value = keyRef.value[0];
      }
    });
  }
  return value;
};

export const retrieveValueFromGeneralColorsReference = (
  variableReference: string,
  data: ThemeData | null
) => {
  let value;
  if (data) {
    data[Category.generalColors].find((keyRef) => {
      if (variableReference === keyRef.keyReference) {
        value = keyRef.value[0];
      }
    });
  }
  return value;
};
