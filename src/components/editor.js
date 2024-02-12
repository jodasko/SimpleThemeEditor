import React, { useRef, useState } from 'react';
import { Row, Col, Button, Input, Typography } from 'antd';
import { useTheme, useThemeUpdater } from '../ThemeContext';
import {
  toFindValueInReference,
  counterReferences,
} from '../container/services';
import regexFor from '../constants/regularExpressions';

// Panel Component
const { Text } = Typography;

export default function Editor({
  sectionId,
  propertyName,
  value,
  referenceValues,
  codeReference,
}) {
  const editor = useTheme();
  const updateValues = useThemeUpdater();
  const inputRef = useRef('');

  const [styleValue, setStyleValue] = useState(value);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [input, setInput] = useState('');
  const [showErrorSintax, setShowErrorSintax] = useState(false);
  const [error, setError] = useState('NOT VALID SYNTAX FOR THIS INPUT');

  // FILTER AND CREATE AN NEW OBJECT WITH VALUES AND REFERENCES FROM LIST A
  const findAllList = editor
    .filter((references) => references.id <= 2)
    .map((keyName) =>
      keyName.styles.map((attr) => ({ value: attr.value, ref: attr.ref })),
    );

  // MERGE ALL THE ARRAYS
  // eslint-disable-next-line prefer-spread
  const listReferenceValue = [].concat.apply([], findAllList);

  /**
   * SHOW BOX EDITOR
  --------------------------------------------------------------------------- */
  const toogleEditorBox = () => {
    setIsEditorVisible((prevState) => !prevState);
  };

  /**
   * UPDATE INPUT
  --------------------------------------------------------------------------- */
  const updateInput = (e) => {
    setInput(e.target.value);
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
    setIsEditorVisible(false);
    updateValues(id, ref, passInput);
  };

  /**
   * VALIDATION HANDLING SYNTAX
  --------------------------------------------------------------------------- */
  function validateInput(ref, id, isInput) {
    const validateHexCode = regexFor.HEX_CODE.test(isInput);
    const validateInputEmOrPx = regexFor.NUMBER_IN_STRING.test(isInput);
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
        setError('NOT A VALID CSS HEXCODE SYNTAX FOR COLOR: e.g: #010101');
        return;
      }
      setStyleValue(inputRef.current.input.value);
      isValidated(id, ref, isInput);
    }

    // VALIDATE IF IT COMES FROM GLOBAL SIZES
    if (id === 2) {
      if (!validateInputEmOrPx || hasHashtag) {
        setShowErrorSintax(true);
        setError('NOT A VALID VALUE FOR SIZES PX or EM: e.g: 1 - 2.5');
        return;
      }
      setStyleValue(inputRef.current.input.value);
      isValidated(id, ref, isInput);
    }

    // VALIDATE IF IT COMES FROM TEXT FIELD
    if (id === 3) {
      // IF IT IS COLOR
      if (isReferenceToColors && !isVariableReference) {
        if (!validateHexCode || isInput.length !== 7) {
          setShowErrorSintax(true);
          setError('NOT A VALID CSS HEXCODE SYNTAX FOR COLOR: e.g: #010101');
          return;
        }
        setStyleValue(inputRef.current.input.value);
        isValidated(id, ref, isInput);
      }

      // IF IT IS COLOR REFERENCE
      if (isReferenceToColors && isVariableReference && !isReferenceBorder) {
        const validRef = toFindValueInReference(isInput).toString();
        const isToColor = validRef.includes('colors');
        if (counterReferences(isInput) !== 2 || !isToColor) {
          setShowErrorSintax(true);
          setError('NOT A VALID REFERENCE TO GENERAL COLOR. e.g: colors. ');
          return;
        }
        setStyleValue(inputRef.current.input.value);
        isValidated(id, ref, isInput);
      }

      // IF IT IS SIZE
      if (isReferenceToTextSize && !isVariableReference) {
        if (!validateInputEmOrPx || hasHashtag) {
          setShowErrorSintax(true);
          setError('NOT A VALID VALUE FOR SIZES PX or EM. e.g: 1 - 2.5');
          return;
        }
        setStyleValue(inputRef.current.input.value);
        isValidated(id, ref, isInput);
      }

      // IF IT IS SIZE REFERENCE
      if (isReferenceToTextSize && isVariableReference) {
        const validRef = toFindValueInReference(isInput).toString();
        const isToSize = validRef.includes('sizes');
        if (counterReferences(isInput) !== 2 || !isToSize) {
          setShowErrorSintax(true);
          setError('NOT A VALID REFERENCE TO GLOBAL SIZES. e.g: sizes. ');
          return;
        }
        setStyleValue(inputRef.current.input.value);
        isValidated(id, ref, isInput);
      }

      // IF IT IS BORDER
      if (isReferenceBorder) {
        const getFirstChart = isInput.charAt(0);
        if (
          (regexFor.stringContainNum.test(getFirstChart) && hasHashtag) ||
          (getFirstChart.includes('{') && hasHashtag) ||
          (regexFor.stringContainNum.test(getFirstChart) &&
            isVariableReference) ||
          (counterReferences(isInput) === 4 &&
            isInput != null &&
            isInput.match(/sizes/g).length < 2)
        ) {
          setStyleValue(inputRef.current.input.value);
          isValidated(id, ref, isInput);
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
    if (id === 4) {
      // IF IT IS COLOR
      if (isReferenceToColors && !isVariableReference) {
        if (!validateHexCode || isInput.length !== 7) {
          setShowErrorSintax(true);
          setError('NOT A VALID CSS HEXCODE SYNTAX FOR COLOR: e.g: #010101');
          return;
        }
        setStyleValue(inputRef.current.input.value);
        isValidated(id, ref, isInput);
      }

      // IF IT IS COLOR REFERENCE
      if (isReferenceToColors && isVariableReference) {
        const validRef = toFindValueInReference(isInput).toString();
        const isToColor = validRef.includes('colors');
        if (counterReferences(isInput) !== 2 || !isToColor) {
          setShowErrorSintax(true);
          setError('NOT A VALID REFERENCE TO GENERAL COLOR: colors. ');
          return;
        }
        setStyleValue(inputRef.current.input.value);
        isValidated(id, ref, isInput);
      }

      // IF IT IS FONT SIZES
      if (isReferenceToFontSize) {
        if (isInput.includes('colors') || hasHashtag) {
          setShowErrorSintax(true);
          setError(
            'NOT A VALID VALUE: 2 VALUES or TWO REREFENCES REQUIRED FOR SIZES PX or EM. e.g: 1 - 2.5',
          );
          return;
        }
        setStyleValue(inputRef.current.input.value);
        isValidated(id, ref, isInput);
      }
    }
  }

  const updateEditorProperty = (ref, id) => {
    // VALIDATION
    validateInput(ref, id, input);
  };

  /**
   * GET VALUES
  --------------------------------------------------------------------------- */
  const val =
    styleValue.length === 0
      ? returnValueFromReference(referenceValues)
      : styleValue;

  /**
   * PRINT OUT THE PROPERTY AND ITS VALUE ACCORDING TO THE TYPE OF TAG
  --------------------------------------------------------------------------- */
  let textVariableReference;

  // CSS BORDER PROPERTY
  if (propertyName.toLowerCase() === 'border') {
    // COMES FROM EDITOR BOX
    if (styleValue.length > 3) {
      textVariableReference = <b>{val}</b>;
    }

    // COMES FROM DATA
    if (
      styleValue.length < 3 &&
      (styleValue.length === 2 || referenceValues.length === 2)
    ) {
      textVariableReference = (
        <b>
          {val[0]} <span> px solid </span> {val[1]}
        </b>
      );
    }

    // FOR EVEN AND ODD VALUES
    if (
      styleValue.length < 3 &&
      (styleValue.length === 1 || referenceValues.length === 1)
    ) {
      textVariableReference = (
        <b>
          {/* PX */}
          {referenceValues.toString().includes('sizes')
            ? returnValueFromReference(referenceValues)
            : ''}
          {!styleValue.toString().includes('#') ? styleValue : ''}
          {/* COLOR */}
          {referenceValues.toString().includes('colors')
            ? `px solid ${returnValueFromReference(referenceValues)}`
            : ''}
          {styleValue.toString().includes('#') ? `px solid ${styleValue}` : ''}
        </b>
      );
    }
  } else if (propertyName.toLowerCase() === 'font size (rem)') {
    // COMES FROM EDITOR BOX
    if (styleValue.length > 3) {
      textVariableReference = <b>{val}</b>;
    }

    // COMES FROM DATA
    if (
      styleValue.length < 3 &&
      (styleValue.length === 2 || referenceValues.length === 2)
    ) {
      textVariableReference = (
        <b>
          CALC( {val[0]} * {val[1]} )
        </b>
      );
    }

    // FOR EVEN AND ODD VALUES
    if (
      styleValue.length < 3 &&
      (styleValue.length === 1 || referenceValues.length === 1)
    ) {
      textVariableReference = (
        <b>
          CALC({' '}
          {referenceValues ? returnValueFromReference(referenceValues) : ''} *{' '}
          {styleValue || ''} )
        </b>
      );
    }
  } else {
    textVariableReference = <b> {val} </b>;
  }

  /**
   * RENDER COMPONENT EDITORBOX
  --------------------------------------------------------------------------- */
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
              {propertyName}: {textVariableReference}
            </Col>
            <Col span={8} className="text-italic">
              {codeReference}
            </Col>
          </Row>
        </Button>

        <div className={isEditorVisible ? '' : 'hidden'}>
          {/* Input */}
          <div className="box-space">
            <Input
              type="text"
              addonBefore="Value"
              placeholder={
                sectionId <= 2
                  ? 'Introduce a valid value'
                  : 'Introduce some valid values or Use { } for variable references separated by a space. E.g : 2 #111DDD || {sizes.borderWidth} {colors.primary}'
              }
              value={input}
              ref={inputRef}
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
                    Please, Check Reference for Syntax{' '}
                  </span>
                </Text>
              </Col>

              {/* ADD NEW EDITED PROPERTY */}
              <Col>
                <Button
                  data-testid="set-value-button"
                  onClick={() => updateEditorProperty(codeReference, sectionId)}
                  type="primary"
                >
                  Edit
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
