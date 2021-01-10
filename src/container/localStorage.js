// Local JSON Data
import dataJson from '../data/data.json';

/**
 *  DATA FROM JSON FILE TO LOCALSTORAGE
--------------------------------------------------------------------------- */
localStorage.setItem('editorData', JSON.stringify(dataJson));
const dataEditorFromJson = JSON.parse(localStorage.getItem('editorData'));

function setLocalStorage() {
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
}

export default setLocalStorage;
