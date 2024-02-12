import update from 'react-addons-update';
import regexFor from '../constants/regularExpressions';
import { toFindValueInReference } from './services';

/* UPDATE VALUES FROM EDITOR: 
   FOR DIFERENT TYPE OF MATCHES: NUM + {} | {} + # | NUM + NUM | NUM + #
    ---------------------------------------------------------------------------*/
// eslint-disable-next-line prettier/prettier
export default function updateEditorValues(
  promise,
  id,
  referenceName,
  newValue,
) {
  // CREATE AN ARRAY TO STORE ALL NEW VALUES
  const data = promise;
  const newValuesArr = [];
  const isFontSizeRef = referenceName.toLowerCase();

  // NEW VALUE STRING HAS A NUMBER AS FIRST CHARACTER (PX - EM) : **NOT FOR FONTSIZE
  const getFirstChart = newValue.charAt(0);
  if (
    regexFor.stringContainNum.test(getFirstChart) &&
    !isFontSizeRef.includes('fontsize')
  ) {
    const matchNums = newValue.match(regexFor.numInString);
    newValuesArr.push(matchNums[0]);
  }

  // NEW VALUE HAS A REFRENCE, EXTRAC IT AND PUSH IT INTO THE ARRAY : **NOT FOR FONTSIZE
  if (newValue.includes('{') && !isFontSizeRef.includes('fontsize')) {
    const namevalue = toFindValueInReference(newValue);
    newValuesArr.push(namevalue);
  }

  // NEW VALUE HAS CODECOLOR, EXTRAC IT AND PUSH IT INTO THE ARRAY
  if (newValue.includes('#')) {
    const indexStr = newValue.indexOf('#');
    const extractCodeColor = newValue.slice(indexStr, indexStr + 7);
    newValuesArr.push(extractCodeColor.toString());
  }

  // **SPECIAL CASE : FONTSIZE (PX - EM) IF HAS NUMBERS OR REFERENCES AS REFERENCES COULD HAVE NUMBER AS H1, H2
  if (isFontSizeRef.includes('fontsize')) {
    // EXTRACT ONLY VALUES OUT OF {}
    if (newValue.includes('{') && (newValue.match(/{/g) || []).length === 1) {
      const namevalue = toFindValueInReference(newValue);
      const removeRef = newValue.replace(namevalue, '');
      const cleanRefs = removeRef.match(regexFor.numInString);
      newValuesArr.push(cleanRefs);
      const removeNums = newValue.replace(cleanRefs, '');
      const cleanNums = toFindValueInReference(removeNums);
      newValuesArr.push(cleanNums);
    }

    if (newValue.includes('{') && newValue.match(/{/g).length === 2) {
      const namevalue = toFindValueInReference(newValue);
      newValuesArr.push(namevalue);
    }

    if (!newValue.includes('{')) {
      const matchNums = newValue.match(regexFor.numInString);
      newValuesArr.push(matchNums);
    }
  }

  // UPDATE EDITOR DATA WITH NEW VALUES FROM THE ARRAY FOR FONTSIZE
  if (isFontSizeRef.includes('fontsize')) {
    const elemIndex = data.findIndex((res) => res.id === id);
    const indexItems = data
      .filter((res) => res.id === id)
      .map((re) => re.styles.findIndex((fil) => fil.ref === referenceName));

    const updateItem = update(data[elemIndex], {
      styles: {
        [indexItems]: {
          value: {
            $set: newValuesArr
              .filter((item) => !regexFor.onlyLetters.test(item))
              .map((item) => item)
              .flat(),
          },
          variableref: {
            $set: newValuesArr
              .filter((item) => regexFor.onlyLetters.test(item))
              .map((item) => item)
              .flat(),
          },
        },
      },
    });

    const newData = update(data, {
      $splice: [[elemIndex, 1, updateItem]],
    });

    return newData;
  }

  // UPDATE EDITOR DATA WITH NEW VALUES FROM THE ARRAY
  const elemIndex = data.findIndex((res) => res.id === id);
  const indexItems = data
    .filter((res) => res.id === id)
    .map((re) => re.styles.findIndex((fil) => fil.ref === referenceName));

  const updateItem = update(data[elemIndex], {
    styles: {
      [indexItems]: {
        value: {
          $set: newValuesArr
            .filter((item) => regexFor.numbers.test(item) || item.includes('#'))
            .map((item) => item),
        },
        variableref: {
          $set: newValuesArr
            .filter((item) => regexFor.onlyLetters.test(item))
            .map((item) => item)
            .flat(),
        },
      },
    },
  });

  const newData = update(data, {
    $splice: [[elemIndex, 1, updateItem]],
  });

  return newData;
}
