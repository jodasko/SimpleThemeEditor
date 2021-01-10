/**
* DEFINE USEFUL REGULAR EXPRESIONS
--------------------------------------------------------------------------- */
const regexFor = {
  stringContainNum: /\d/, // if it contains a number
  numInString: /[\d|,|.|\d|+]+/g, // find number or decimal in string
  numbers: /^[0-9]*.?[0-9]*$/, // RegExp numbers
  onlyLetters: /^[a-zA-Z][a-zA-Z0-9.,$;]+$/, // only letters
  hexCode: /#([a-fA-F0-9]{3}){1,2}\b/, // only hexadecimal color format
  numAndDot: /^[0-9]+([,.][0-9]+)?$/g, // only number and dot
};

export default regexFor;
