/**
  * SAVE TO LOCALSTORAGE
--------------------------------------------------------------------------- */
export function toSaveToLocalStorage(stateData) {
  window.localStorage.setItem('EditorData', JSON.stringify(stateData));
  window.location.reload(false);
}

/**
 * EXTRACT REFERENCE FROM CURLY BRACKETS
 --------------------------------------------------------------------------- */
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

/**
 * FIND VALUE IN REFERENCES
 --------------------------------------------------------------------------- */
export function toFindValueInReference(str) {
  const matches = findStringBetween(str, '{', '}');
  return matches;
}
