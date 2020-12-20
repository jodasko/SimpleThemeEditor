import React, { useContext, useState } from 'react';
import update from 'react-addons-update';
// Local JSON Data
import dataJson from './data/data.json';

const ThemeContext = React.createContext();
const ThemeUpdateStorageContext = React.createContext();
const ThemeUpdateEvenAndOdd = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdateStorage() {
  return useContext(ThemeUpdateStorageContext);
}

export function useThemeUpdateEvenAndOdd() {
  return useContext(ThemeUpdateEvenAndOdd);
}

// DATA FROM JSON FILE TO LOCALSTORAGE
localStorage.setItem('editorData', JSON.stringify(dataJson));
const dataEditorFromJson = JSON.parse(localStorage.getItem('editorData'));

export function ThemeProvider({ children }) {
  // DATA INITIALIZE FROM JSON OR FROM LOCALSTORAGE IF ANY
  const [editor, setEditor] = useState(() => {
    try {
      const dataStoredEditor =
        JSON.parse(window.localStorage.getItem('EditorData')) ||
        dataEditorFromJson;
      return dataStoredEditor;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return dataEditorFromJson;
    }
  });

  // EXTRAC REFERENCE FROM CURLY BRACKETS
  const findStringBetween = (str, firstChar, lastChar) => {
    // EXTRACT STRINGS IN CURLY BRACKETS
    const reg = new RegExp(`${firstChar}(.*?)${lastChar}`, 'gm');
    const matchReferences = str.match(reg);
    // GET RID OF CURLY BRACKETS FOR EACH MATCH AND RETURN ONLY REFERENCES
    const sendMatches = matchReferences.map((cleanCurly) =>
      cleanCurly.replace(/[{}]/g, ''),
    );
    return sendMatches;
  };

  const findValueInReference = (str) => {
    const matches = findStringBetween(str, '{', '}');
    return matches;
  };

  // TODO : CHANGE VALUE FROM REFERENCE OR ADD A NEW VALUE: PROVIDER
  // FOR DIFERENT TYPE OF MATCHES NUM + {}, {} #, NUM + NUM, NUM + #
  // eslint-disable-next-line no-unused-vars
  function updateValues(id, referenceName, newValue) {
    // CREATE AN ARRAY TO STORE ALL NEW VALUES
    const newValuesArr = [];

    // REGEXS
    const regStringContainNum = /\d/; // if it contains a number
    const regNumInString = /[\d|,|.|\d|+]+/g; // find number or decimal in string
    const regNum = /^[0-9]*.?[0-9]*$/; // RegExp numbers
    const regOnlyLetters = /^[a-zA-Z][a-zA-Z0-9.,$;]+$/; // only letters
    const isFontSizeRef = referenceName.toLowerCase();

    // NEW VALUE STRING HAS A NUMBER AS FIRST CHARACTER (PX - EM)
    // NOT FOR FONTSIZE
    const getFirstChart = newValue.charAt(0);
    if (
      regStringContainNum.test(getFirstChart) &&
      !isFontSizeRef.includes('fontsize')
    ) {
      const matchNums = newValue.match(regNumInString);
      newValuesArr.push(matchNums[0]);
    }

    // NEW VALUE HAS A REFRENCE, EXTRAC IT AND PUSH IT INTO THE ARRAY :
    // NOT FOR FONTSIZE
    if (newValue.includes('{') && !isFontSizeRef.includes('fontsize')) {
      const namevalue = findValueInReference(newValue);
      newValuesArr.push(namevalue);
    }

    // NEW VALUE HAS CODECOLOR, EXTRAC IT AND PUSH IT INTO THE ARRAY
    if (newValue.includes('#')) {
      const indexStr = newValue.indexOf('#');
      const extractCodeColor = newValue.slice(indexStr, indexStr + 7);
      newValuesArr.push(extractCodeColor.toString());
    }

    // SPECIAL CASE : FONTSIZE (PX - EM) IF HAS NUMBERS OR REFERENCES AS REFERENCES COULD HAVE NUMBER AS H1, H2
    if (isFontSizeRef.includes('fontsize')) {
      // EXTRACT ONLY VALUES OUT OF {}
      if (newValue.includes('{') && (newValue.match(/{/g) || []).length === 1) {
        const namevalue = findValueInReference(newValue);
        const removeRef = newValue.replace(namevalue, '');
        const cleanRefs = removeRef.match(regNumInString);
        newValuesArr.push(cleanRefs);
        const removeNums = newValue.replace(cleanRefs, '');
        const cleanNums = findValueInReference(removeNums);
        newValuesArr.push(cleanNums);
      }

      if (newValue.includes('{') && newValue.match(/{/g).length === 2) {
        const namevalue = findValueInReference(newValue);
        newValuesArr.push(namevalue);
      }

      if (!newValue.includes('{')) {
        const matchNums = newValue.match(regNumInString);
        newValuesArr.push(matchNums);
      }
    }

    if (isFontSizeRef.includes('fontsize')) {
      // UPDATE EDITOR DATA WITH NEW VALUES FROM THE ARRAY
      const data = editor;
      const elemIndex = data.findIndex((res) => res.id === id);
      const indexItems = editor
        .filter((res) => res.id === id)
        .map((re) => re.styles.findIndex((fil) => fil.ref === referenceName));

      const updateItem = update(data[elemIndex], {
        styles: {
          [indexItems]: {
            value: {
              $set: newValuesArr
                .filter((item) => !regOnlyLetters.test(item))
                .map((item) => item)
                .flat(),
            },
            variableref: {
              $set: newValuesArr
                .filter((item) => regOnlyLetters.test(item))
                .map((item) => item)
                .flat(),
            },
          },
        },
      });

      const newData = update(data, {
        $splice: [[elemIndex, 1, updateItem]],
      });

      setEditor(newData);
    } else {
      // UPDATE EDITOR DATA WITH NEW VALUES FROM THE ARRAY
      const data = editor;
      const elemIndex = data.findIndex((res) => res.id === id);
      const indexItems = editor
        .filter((res) => res.id === id)
        .map((re) => re.styles.findIndex((fil) => fil.ref === referenceName));

      const updateItem = update(data[elemIndex], {
        styles: {
          [indexItems]: {
            value: {
              $set: newValuesArr
                .filter((item) => regNum.test(item) || item.includes('#'))
                .map((item) => item),
            },
            variableref: {
              $set: newValuesArr
                .filter((item) => regOnlyLetters.test(item))
                .map((item) => item)
                .flat(),
            },
          },
        },
      });

      const newData = update(data, {
        $splice: [[elemIndex, 1, updateItem]],
      });

      setEditor(newData);
    }
  }

  function saveToLocalStorage(stateData) {
    window.localStorage.setItem('EditorData', JSON.stringify(stateData));
    window.location.reload(false);
  }

  return (
    <ThemeContext.Provider value={editor}>
      <ThemeUpdateStorageContext.Provider value={saveToLocalStorage}>
        <ThemeUpdateEvenAndOdd.Provider value={updateValues}>
          {children}
        </ThemeUpdateEvenAndOdd.Provider>
      </ThemeUpdateStorageContext.Provider>
    </ThemeContext.Provider>
  );
}
