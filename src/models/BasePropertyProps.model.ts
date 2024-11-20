export interface BasePropertyProps {
  label: string;
  value: string;
  type: "text" | "em" | "rem" | "px" | "color" | "border";
  keyReference: string;
}
