export function syntaxColorCss(validateHexCode, input) {
  return !!(validateHexCode || input.length !== 7);
}

export function syntax() {}

// if (!validateHexCode || isInput.length !== 7) {
//     setShowErrorSintax(true);
//     throw setError(
//       'NOT A VALID CSS HEXCODE SYNTAX FOR COLOR: e.g: #010101',
//     );
//   }
//   isValidated(id, ref, isInput);
