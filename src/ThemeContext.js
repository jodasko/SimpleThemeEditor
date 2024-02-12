import React, { useContext, useState } from 'react';

// Local JSON Data
import setLocalStorage from './container/localStorage';

// update values
import updateEditorValues from './container/valueUpdater';

/**
 * CONTEXTS
--------------------------------------------------------------------------- */
const ThemeContext = React.createContext();
const ThemeUpdater = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdater() {
  return useContext(ThemeUpdater);
}

export function ThemeProvider({ children }) {
  // DATA INITIALIZE FROM JSON OR FROM LOCALSTORAGE IF ANY
  const [editor, setEditor] = useState(setLocalStorage());

  /**
   * UPDATE EDITOR VALUES
    ---------------------------------------------------------------------------*/
  const updateValues = (id, referenceName, newValue) => {
    setEditor(updateEditorValues(editor, id, referenceName, newValue));
  };

  return (
    <ThemeContext.Provider value={editor}>
      <ThemeUpdater.Provider value={updateValues}>
        {children}
      </ThemeUpdater.Provider>
    </ThemeContext.Provider>
  );
}
