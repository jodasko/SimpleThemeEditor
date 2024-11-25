export interface BasePropertyProps {
  label: string;
  value: string[];
  variableReference?: string[];
  keyReference: string;
  type: "text" | "em" | "rem" | "px" | "color";
}

export type ThemeData = {
  generalColors: BasePropertyProps[];
  globalSizes: BasePropertyProps[];
  textField: BasePropertyProps[];
  buttons: BasePropertyProps[];
};

export type Categories = {
  category: "generalColors" | "globalSizes" | "textField" | "buttons";
};
