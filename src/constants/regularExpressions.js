/**
* DEFINE USEFUL REGULAR EXPRESIONS
--------------------------------------------------------------------------- */
// export const regexFor = {
//   stringContainNum: /\d/, // if it contains a number
//   numInString: /[\d|,|.|\d|+]+/g, // find number or decimal in string
//   numbers: /^[0-9]*.?[0-9]*$/, // RegExp numbers
//   onlyLetters: /^[a-zA-Z][a-zA-Z0-9.,$;]+$/, // only letters
//   hexCode: /#([a-fA-F0-9]{3}){1,2}\b/, // only hexadecimal color format
//   numAndDot: /^[0-9]+([,.][0-9]+)?$/g, // only number and dot
// };

const regex = {
  STRING_CONTAIN_NUMBER: /\d/, // if it contains a number
  NUMBER_IN_STRING: /[\d|,|.|\d|+]+/g, // find number or decimal in string
  NUMBERS: /^[0-9]*.?[0-9]*$/, // RegExp numbers
  STRING_ONLY: /^[a-zA-Z][a-zA-Z0-9.,$;]+$/, // only letters
  HEX_CODE: /#([a-fA-F0-9]{3}){1,2}\b/, // only hexadecimal color format
  NUMBER_AND_DOT: /^[0-9]+([,.][0-9]+)?$/g, // only number and dot
};

export default regex;
