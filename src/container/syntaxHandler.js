import regex from '../constants/regularExpressions';
import sections from '../constants/sections';

const hexCodeNumberChart = 7;

const check = {
  hexCodeFormat: regex.HEX_CODE.test(value),
  emOrPx: regex.NUMBER_IN_STRING.test(value),
  referenceValues: value.includes('{'),
  hexCode: value.includes('#'),
  referenceBorder: !!codeReference.includes('border'),
  referenceToColors: isCodeReference(codeReference),
  referenceToTextSize: codeReference.includes('textSize'),
  referenceToFontSize: codeReference.includes('fontSize'),
};

function isCodeReference(codeReference) {
  return (
    codeReference.includes('color') || codeReference.includes('background')
  );
}

const checkGeneralColorSyntax = (value) =>
  !check.hexCodeFormat ||
  (value.length !== hexCodeNumberChart &&
    'NOT A VALID CSS HEXCODE SYNTAX FOR COLOR: e.g: #010101');

const checkGlobalSizesSyntax = () =>
  !check.emOrPx ||
  (check.hexCode && 'NOT A VALID VALUE FOR SIZES PX or EM: e.g: 1 - 2.5');

const checkValidSyntax = (codeReference, sectionId, value) => {
  // const hexCodeNumberChart = 7;
  // const check = {
  //   hexCodeFormat: regex.HEX_CODE.test(value),
  //   emOrPx: regex.NUMBER_IN_STRING.test(value),
  //   referenceValues: value.includes('{'),
  //   hexCode: value.includes('#'),
  //   referenceBorder: !!codeReference.includes('border'),
  //   referenceToColors: isCodeReference(codeReference),
  //   referenceToTextSize: codeReference.includes('textSize'),
  //   referenceToFontSize: codeReference.includes('fontSize'),
  // };

  // const validateHexCode = regex.HEX_CODE.test(value);
  // const validateInputEmOrPx = regex.NUMBER_IN_STRING.test(value);
  // const isVariableReference = value.includes('{');
  // const isHexCode = value.includes('#');

  // BORDER FIELD
  // const isReferenceBorder = !!codeReference.includes('border');
  // const isReferenceToColors =
  //   codeReference.includes('color') || codeReference.includes('background');
  // // ONLY SIZES REFRENCES
  // const isReferenceToTextSize = codeReference.includes('textSize');
  // // ONLY FONT REFRENCES
  // const isReferenceToFontSize = codeReference.includes('fontSize');

  if (sectionId === sections.GENERAL_COLORS) {
    checkGeneralColorSyntax(value);
  }

  if (sectionId === sections.GLOBAL_SIZES) {
    checkGlobalSizesSyntax;
  }

  if (sectionId === sections.TEXT_FIELD) {
    // IT IS HEXCODE
    if (
      check.referenceToColors &&
      !check.referenceValues &&
      (!check.hexCodeFormat || value.length !== hexCodeNumberChart)
    ) {
      return 'NOT A VALID CSS HEXCODE SYNTAX FOR COLOR: e.g: #010101';
    }

    // IF IT IS COLOR REFERENCE
    if (isReferenceToColors && isVariableReference && !isReferenceBorder) {
      const validRef = toFindValueInReference(value).toString();
      const isToColor = validRef.includes('colors');

      if (counterReferences(value) !== 2 || !isToColor) {
        setShowErrorSintax(true);
        setError('NOT A VALID REFERENCE TO GENERAL COLOR. e.g: colors. ');
        return;
      }
      setStyleValue(inputRef.current.input.value);
      isValidated(id, codeReference, value);
    }

    // IF IT IS SIZE
    if (codeReference.includes('textSize') && !isVariableReference) {
      if (!validateInputEmOrPx || isHexCode) {
        setShowErrorSintax(true);
        setError('NOT A VALID VALUE FOR SIZES PX or EM. e.g: 1 - 2.5');
        return;
      }
      setStyleValue(inputRef.current.input.value);
      isValidated(id, codeReference, value);
    }

    // IF IT IS SIZE REFERENCE
    if (codeReference.includes('textSize') && isVariableReference) {
      const validRef = toFindValueInReference(value).toString();
      const isToSize = validRef.includes('sizes');
      if (counterReferences(value) !== 2 || !isToSize) {
        setShowErrorSintax(true);
        setError('NOT A VALID REFERENCE TO GLOBAL SIZES. e.g: sizes. ');
        return;
      }
      setStyleValue(inputRef.current.input.value);
      isValidated(id, codeReference, value);
    }

    // IF IT IS BORDER
    if (isReferenceBorder) {
      const getFirstChart = value.charAt(0);
      if (
        (regexFor.stringContainNum.test(getFirstChart) && isHexCode) ||
        (getFirstChart.includes('{') && isHexCode) ||
        (regexFor.stringContainNum.test(getFirstChart) &&
          isVariableReference) ||
        (counterReferences(value) === 4 &&
          value != null &&
          value.match(/sizes/g).length < 2)
      ) {
        setStyleValue(inputRef.current.input.value);
        isValidated(id, codeReference, value);
      } else {
        setShowErrorSintax(true);
        setError(
          'NOT A VALID VALUE. 2 VALUES REQUIRED, STARTING BY A NUMBER + COLOR CODE OR TWO REFERENCES: e.g. 5 #000000, {size.codeReference} {color.codeReference}',
        );
        return;
      }
    }
  }

  // VALIDATE IF IT COMES FROM BUTTONS
  if (id === sections.BUTTONS) {
    // IF IT IS COLOR
    if (isReferenceToColors && !isVariableReference) {
      if (!validateHexCode || value.length !== 7) {
        setShowErrorSintax(true);
        setError('NOT A VALID CSS HEXCODE SYNTAX FOR COLOR: e.g: #010101');
        return;
      }
      setStyleValue(inputRef.current.input.value);
      isValidated(id, codeReference, value);
    }

    // IF IT IS COLOR REFERENCE
    if (isReferenceToColors && isVariableReference) {
      const validRef = toFindValueInReference(value).toString();
      const isToColor = validRef.includes('colors');
      if (counterReferences(value) !== 2 || !isToColor) {
        setShowErrorSintax(true);
        setError('NOT A VALID REFERENCE TO GENERAL COLOR: colors. ');
        return;
      }
      setStyleValue(inputRef.current.input.value);
      isValidated(id, codeReference, value);
    }

    // IF IT IS FONT SIZES
    if (isReferenceToFontSize) {
      if (value.includes('colors') || isHexCode) {
        setShowErrorSintax(true);
        setError(
          'NOT A VALID VALUE: 2 VALUES or TWO REREFENCES REQUIRED FOR SIZES PX or EM. e.g: 1 - 2.5',
        );
        return;
      }
      setStyleValue(inputRef.current.input.value);
      isValidated(id, codeReference, value);
    }
  }

  return false;
};

export default checkValidSyntax;
