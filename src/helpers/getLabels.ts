import { Category } from "../models/category.enum";

export const getLabels = (category: string) => {
  console.log(category);
  let title: string;

  switch (category) {
    case "generalColors":
      title = Category.generalColors;
      break;
    case "globalSizes":
      title = Category.globalSizes;
      break;
    case "textField":
      title = Category.textField;
      break;
    default:
      title = Category.buttons;
      break;
  }

  return title;
};
