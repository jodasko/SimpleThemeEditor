import React, { useState } from 'react';
import { Row, Col, Button, Input, Typography } from 'antd';
import { useTheme, useThemeUpdateEvenAndOdd } from '../ThemeContext';

// Panel Component
const { Text } = Typography;

export default function Editor({
  idsection,
  name,
  value,
  variableRef,
  reference,
}) {
  const editor = useTheme();
  const updateValues = useThemeUpdateEvenAndOdd();

  const [styleValue, setStyleValue] = useState(value);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [input, setInput] = useState('');
  const [showErrorSintax, setShowErrorSintax] = useState(false);
  const [error, setError] = useState('NOT VALID SYNTAX FOR THIS INPUT');

  // useEffect(() => {
  //   setInput(styleValue);
  // }, [styleValue]);

  // FILTER AND CREATE AN NEW OBJECT WITH VALUES AND REFERENCES FROM LIST A
  const findAllList = editor
    .filter((references) => references.id <= 2)
    .map((keyName) =>
      keyName.styles.map((attr) => ({ value: attr.value, ref: attr.ref })),
    );

  // MERGE ALL THE ARRAYS
  // eslint-disable-next-line prefer-spread
  const listReferenceValue = [].concat.apply([], findAllList);

  // SHOW BOX EDITOR
  const toogleEditorBox = () => {
    setIsEditorVisible((prevState) => !prevState);
  };

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

  // UPDATE INPUT
  const updateInput = (e) => {
    setInput(e.target.value);
    setStyleValue(e.target.value);
    setShowErrorSintax(false);
  };

  // CREATE A REDUCE OBJECT ONLY OF REFERENCES
  const returnValueFromReference = (resource) =>
    resource.map((varReference) =>
      listReferenceValue
        .filter((r) => r.ref === varReference)
        .map((refValue) => refValue.value),
    );

  // CHECK IF INPUTS ARE ALLOWED
  const isValidated = (id, ref, passInput) => {
    // setStyleValue(passInput);
    setIsEditorVisible(false);
    updateValues(id, ref, passInput);
  };

  //= == VALIDATION INPUT SYNTAX ===//
  function validateInput(ref, id, isInput) {
    const regHexCode = /#([a-fA-F0-9]{3}){1,2}\b/; // only hexadecimal color format
    const regNumAndDot = /^[0-9]+([,.][0-9]+)?$/g; // only number and dot
    const regStringContainNum = /\d/; // if it contains a number
    const validateHexCode = regHexCode.test(isInput);
    const validateInputEmOrPx = regNumAndDot.test(isInput);
    const isVariableReference = isInput.includes('{');
    const hasHashtag = isInput.includes('#');

    // BORDER FIELD
    const isReferenceBorder = !!ref.includes('border');
    // ONLY COLORS REFRENCES
    const isReferenceToColors =
      ref.includes('color') || ref.includes('background');
    // ONLY SIZES REFRENCES
    const isReferenceToTextSize = ref.includes('textSize');
    // ONLY FONT REFRENCES
    const isReferenceToFontSize = ref.includes('fontSize');

    // VALIDATE IF IT COMES FROM GENERAL COLORS
    if (id === 1) {
      if (!validateHexCode || isInput.length !== 7) {
        setShowErrorSintax(true);
        throw setError(
          'NOT A VALID CSS HEXCODE SYNTAX FOR COLOR: e.g: #010101',
        );
      }
      isValidated(id, ref, isInput);
    }

    // VALIDATE IF IT COMES FROM GLOBAL SIZES
    if (id === 2) {
      if (!validateInputEmOrPx || hasHashtag) {
        setShowErrorSintax(true);
        throw setError('NOT A VALID VALUE FOR SIZES PX or EM: e.g: 1 - 2.5');
      }
      isValidated(id, ref, isInput);
    }

    // VALIDATE IF IT COMES FROM TEXT FIELD
    if (id === 3) {
      // IF IT IS COLOR
      if (isReferenceToColors && !isVariableReference) {
        if (!validateHexCode || isInput.length !== 7) {
          setShowErrorSintax(true);
          throw setError(
            'NOT A VALID CSS HEXCODE SYNTAX FOR COLOR: e.g: #010101',
          );
        }
        isValidated(id, ref, isInput);
      }

      // IF IT IS COLOR REFERENCE
      if (isReferenceToColors && isVariableReference && !isReferenceBorder) {
        const openCurly = isInput.match(/{/g);
        const closeCurly = isInput.match(/}/g);
        const sumCurlies = openCurly.length + closeCurly.length;
        const validRef = findValueInReference(isInput).toString();
        const isToColor = validRef.includes('colors');
        if (sumCurlies !== 2 || !isToColor) {
          setShowErrorSintax(true);
          throw setError(
            'NOT A VALID REFERENCE TO GENERAL COLOR. e.g: colors. ',
          );
        }
        isValidated(id, ref, isInput);
      }

      // IF IT IS SIZE
      if (isReferenceToTextSize && !isVariableReference) {
        if (!validateInputEmOrPx || hasHashtag) {
          setShowErrorSintax(true);
          throw setError('NOT A VALID VALUE FOR SIZES PX or EM. e.g: 1 - 2.5');
        }
        isValidated(id, ref, isInput);
      }

      // IF IT IS SIZE REFERENCE
      if (isReferenceToTextSize && isVariableReference) {
        const openCurly = isInput.match(/{/g);
        const closeCurly = isInput.match(/}/g);
        const sumCurlies = openCurly.length + closeCurly.length;
        const validRef = findValueInReference(isInput).toString();
        const isToSize = validRef.includes('sizes');
        if (sumCurlies !== 2 || !isToSize) {
          setShowErrorSintax(true);
          throw setError('NOT A VALID REFERENCE TO GLOBAL SIZES. e.g: sizes. ');
        }
        isValidated(id, ref, isInput);
      }

      // IF IT IS BORDER
      if (isReferenceBorder) {
        const getFirstChart = isInput.charAt(0);
        const openCurly = isInput.match(/{/g) || 0;
        const closeCurly = isInput.match(/}/g) || 0;
        const sumCurlies = openCurly.length + closeCurly.length;
        if (
          (regStringContainNum.test(getFirstChart) && hasHashtag) ||
          (getFirstChart.includes('{') && hasHashtag) ||
          (regStringContainNum.test(getFirstChart) && isVariableReference) ||
          sumCurlies === 4
        ) {
          isValidated(id, ref, isInput);
        } else {
          setShowErrorSintax(true);
          throw setError(
            'NOT A VALID VALUE. 2 VALUES REQUIRED, STARTING BY A NUMBER + COLOR CODE OR TWO REFERENCES: e.g. 5 #000000, {size.reference} {color.reference}',
          );
        }
      }
    }

    // VALIDATE IF IT COMES FROM BUTTONS
    if (id === 4) {
      // IF IT IS COLOR
      if (isReferenceToColors && !isVariableReference) {
        if (!validateHexCode || isInput.length !== 7) {
          setShowErrorSintax(true);
          throw setError(
            'NOT A VALID CSS HEXCODE SYNTAX FOR COLOR: e.g: #010101',
          );
        }
        isValidated(id, ref, isInput);
      }

      // IF IT IS COLOR REFERENCE
      if (isReferenceToColors && isVariableReference) {
        const openCurly = isInput.match(/{/g);
        const closeCurly = isInput.match(/}/g);
        const sumCurlies = openCurly.length + closeCurly.length;
        const validRef = findValueInReference(isInput).toString();
        const isToColor = validRef.includes('colors');
        if (sumCurlies !== 2 || !isToColor) {
          setShowErrorSintax(true);
          throw setError('NOT A VALID REFERENCE TO GENERAL COLOR: colors. ');
        }
        isValidated(id, ref, isInput);
      }

      // IF IT IS FONT SIZES
      if (isReferenceToFontSize) {
        isValidated(id, ref, isInput);
      }
    }
  }

  const addChange = (ref, id) => {
    // VALIDATION
    validateInput(ref, id, input);
  };

  const val =
    styleValue.length === 0
      ? returnValueFromReference(variableRef)
      : styleValue;
  // PRINT OUT THE PROPERTY AND ITS VALUE ACCORDING TO THE TYPE OF TAG
  let textVariableReference;

  if (name.toLowerCase() === 'border') {
    if (styleValue.length === 2 || variableRef.length === 2) {
      textVariableReference = (
        <b>
          {val[0]} <span> px solid </span> {val[1]}
        </b>
      );
    } else {
      // FOR EVEN AND ODD VALUES
      textVariableReference = (
        <b>
          {/* PX */}
          {variableRef.toString().includes('sizes')
            ? `${returnValueFromReference(variableRef)} px solid`
            : ''}
          {!styleValue.toString().includes('#') ? `${styleValue} px solid` : ''}
          {/* COLOR */}
          {variableRef.toString().includes('colors')
            ? returnValueFromReference(variableRef)
            : ''}
          {styleValue.toString().includes('#') ? styleValue : ''}
        </b>
      );
    }
  } else if (name.toLowerCase() === 'font size (rem)') {
    if (styleValue.length === 2 || variableRef.length === 2) {
      textVariableReference = (
        <b>
          <span className="toLowerCase">calc(</span> {val[0]} * {val[1]}
          <span className="toLowerCase">)</span>
        </b>
      );
    } else {
      // FOR EVEN AND ODD VALUES
      textVariableReference = (
        <b>
          calc ( {variableRef ? returnValueFromReference(variableRef) : ''} *{' '}
          {styleValue || ''} )
        </b>
      );
    }
  } else {
    textVariableReference = <b> {val} </b>;
  }

  return (
    <div>
      {/* COMPONENT: IN-PLACE VARIABLE EDITOR */}
      <div className={isEditorVisible ? 'editor-box' : ''}>
        <Button
          className="txt-left"
          type="link"
          block
          onClick={toogleEditorBox}
        >
          <Row>
            <Col span={16}>
              {name}: {textVariableReference}
            </Col>
            <Col span={8} className="text-italic">
              {reference}
            </Col>
          </Row>
        </Button>

        <div className={isEditorVisible ? '' : 'hidden'}>
          {/* Input */}
          <div className="box-space">
            <Input
              addonBefore="Value"
              placeholder={
                idsection <= 2
                  ? 'Introduce a valid value'
                  : 'Introduce some valid values or Use { } for variable references, e.g : {sizes.borderWidth} , {colors.primary}'
              }
              value={input}
              onChange={(event) => updateInput(event)}
            />
          </div>

          {/* ERROR MESSAGE */}
          <div className="box-space">
            <Row>
              <Col span={12}>
                <Text className={showErrorSintax ? '' : 'hidden'}>
                  <span className="error">{error}</span>
                </Text>
              </Col>
              <Col span={10}>
                <Text className={showErrorSintax ? '' : 'hidden'}>
                  <span className="error">
                    Please, Check Documentation for Syntax{' '}
                  </span>
                </Text>
              </Col>

              {/* ADD NEW EDITED PROPERTY */}
              <Col>
                <Button
                  data-testid="set-value-button"
                  onClick={() => addChange(reference, idsection)}
                  type="primary"
                >
                  {' '}
                  OK
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
