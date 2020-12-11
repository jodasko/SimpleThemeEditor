/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import update from 'react-addons-update';
// Local JSON Data
import dataJson from './data/data3.json';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();
const ThemeUpdateStorageContext = React.createContext();
const ThemeUpdateEvenAndOdd = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
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

  // CHANGE VALUE FROM REFERENCE OR ADD A NEW VALUE: PROVIDER
  function changeValueOfReference(id, referenceName, newValue) {
    const regNum = /^[0-9]*.?[0-9]*$/; // RegExp numbers
    const isaDigit = regNum.test(newValue);
    const isaColorCode = newValue.includes('#');

    const namevalue =
      isaDigit || isaColorCode ? newValue : findValueInReference(newValue);

    // UPDATE EDITOR DATA FOR VALUES
    if (isaDigit || isaColorCode) {
      const data = [...editor];
      const elemIndex = data.findIndex((res) => res.id === id);
      const indexItems = data
        .filter((res) => res.id === id)
        .map((re) => re.styles.findIndex((fil) => fil.ref === referenceName));
      const updateItem = update(data[elemIndex], {
        styles: {
          [indexItems]: {
            value: { $set: namevalue },
            variableref: { $set: [''] },
          },
        },
      });
      const newData = update(data, {
        $splice: [[elemIndex, 1, updateItem]],
      });

      setEditor(newData);
    } else {
      const data = [...editor];
      const elemIndex = data.findIndex((res) => res.id === id);
      const indexItems = editor
        .filter((res) => res.id === id)
        .map((re) => re.styles.findIndex((fil) => fil.ref === referenceName));
      const updateItem = update(data[elemIndex], {
        styles: {
          [indexItems]: {
            value: { $set: '' },
            variableref: { $set: namevalue },
          },
        },
      });
      const newData = update(data, {
        $splice: [[elemIndex, 1, updateItem]],
      });

      setEditor(newData);
    }
  }

  // CHANGE VALUE FROM REFERENCE OR ADD A NEW VALUE: PROVIDER TODO
  // eslint-disable-next-line no-unused-vars
  function updateEvenAndOdd(id, referenceName, newValue, type) {
    // for diferents matchs Num + {}, {} #, Num + Num, Num + #
  }

  function saveToLocalStorage(stateData) {
    window.localStorage.setItem('EditorData', JSON.stringify(stateData));
    window.location.reload(false);
  }

  return (
    <ThemeContext.Provider value={editor}>
      <ThemeUpdateContext.Provider value={changeValueOfReference}>
        <ThemeUpdateStorageContext.Provider value={saveToLocalStorage}>
          <ThemeUpdateEvenAndOdd.Provider value={updateEvenAndOdd}>
            {children}
          </ThemeUpdateEvenAndOdd.Provider>
        </ThemeUpdateStorageContext.Provider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
