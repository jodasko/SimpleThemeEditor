import { CategoryTitle } from "../models/category.enum";

export const getCategoryTitle = (category: string) => {
  let title: string;
  switch (category) {
    case "generalColors":
      title = CategoryTitle.generalColors;
      break;
    case "globalSizes":
      title = CategoryTitle.globalSizes;
      break;
    case "textField":
      title = CategoryTitle.textField;
      break;
    default:
      title = CategoryTitle.buttons;
      break;
  }
  return title;
};
