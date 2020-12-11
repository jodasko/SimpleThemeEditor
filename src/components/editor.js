import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Typography } from 'antd';
import {
  useTheme,
  useThemeUpdate,
  useThemeUpdateEvenAndOdd,
} from '../ThemeContext';

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
  const changeValueOfReference = useThemeUpdate();
  const updateEvenAndOdd = useThemeUpdateEvenAndOdd();

  const [styleValue, setStyleValue] = useState(value);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [input, setInput] = useState('');
  const [showErrorSintax, setShowErrorSintax] = useState(false);

  useEffect(() => {
    setInput(styleValue);
  }, [styleValue]);

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
  const isValidated = (id, ref, passInput, type) => {
    setStyleValue(passInput);
    setIsEditorVisible(false);

    if (type === 1 || type === 2 || type === 3) {
      updateEvenAndOdd(id, ref, passInput, type);
    } else {
      changeValueOfReference(id, ref, passInput);
    }
  };

  //= == VALIDATION INPUT SYNTAX ===//
  const validateInput = (ref, id, isInput) => {
    // eslint-disable-next-line prettier/prettier

    const regHexCode = /#([a-fA-F0-9]{3}){1,2}\b/; // only hexadecimal color format
    const regNumAndDot = /^[0-9]*.?[0-9]*$/; // only number and dot
    const validateHexCode = regHexCode.test(isInput);
    const validateInputEmOrPx = regNumAndDot.test(isInput);
    const isVariableReference = isInput.includes('{');
    const hasHashtag = isInput.includes('#');

    // BORDER FIELD
    const isReferenceBorder = !!ref.includes('border');

    // FONT SIZE
    const isfontSize = !!ref.includes('fontSize');

    // ONLY COLORS REFRENCES
    const isReferenceToColors =
      ref.includes('color') || ref.includes('background');

    // ONLY SIZES REFRENCES
    // const isReferenceToSize = ref.includes('size');

    // CALC EM FIELD
    // const isCalc = !!ref.includes('calc');

    // VALIDATE IF IT COMES FROM GENERAL COLORS
    if (id === 1 && validateHexCode && input.length === 7) {
      isValidated(id, ref, isInput, 0);
    } else {
      setShowErrorSintax(true);
    }

    // VALIDATE IF IT COMES FROM GLOBAL SIZES
    if (id === 2 && validateInputEmOrPx && !hasHashtag) {
      isValidated(id, ref, isInput, 0);
    } else {
      setShowErrorSintax(true);
    }

    /* VALIDATE IF IT COMES FROM TEXT FIELD OR BUTTONS AND ONLY REFERNCES IS INPUT 
      ALSO CHECK IF CURLY BRACKETS ARE {} AND NOT IF ONE OF THEM IS MISSING { .. , ..}
    */

    if ((id === 3 || id === 4) && isVariableReference) {
      const openCurly = isInput.match(/{/g);
      const closeCurly = isInput.match(/}/g);
      const sumCurlies = openCurly.length + closeCurly.length;

      if ((isReferenceBorder || isfontSize) && sumCurlies === 4) {
        isValidated(id, ref, isInput);
      } else if (
        isVariableReference &&
        !isReferenceBorder &&
        !isfontSize &&
        sumCurlies === 2
      ) {
        // ONLY IF REFERENCE VALUE IN {} REFERENCES TO THE SAME TYPE: color to color, size to size
        if (isReferenceToColors) {
          const validRef = findValueInReference(isInput).toString();
          const isToColor = validRef.includes('colors');
          // eslint-disable-next-line no-unused-expressions
          isToColor ? isValidated(id, ref, isInput) : setShowErrorSintax(true);
        } else {
          const validRef = findValueInReference(isInput).toString();
          const isToSize = validRef.includes('sizes');
          // eslint-disable-next-line no-unused-expressions
          isToSize ? isValidated(id, ref, isInput) : setShowErrorSintax(true);
        }
      } else {
        setShowErrorSintax(true);
      }
    } else {
      // eslint-disable-next-line no-unused-expressions
      validateHexCode || validateInputEmOrPx
        ? isValidated(id, ref, isInput)
        : setShowErrorSintax(true);
    }
  };

  const addChange = (ref, id) => {
    // SEND IT TO VALIDATION INPUT
    validateInput(ref, id, input);
  };

  // eslint-disable-next-line prettier/prettier
  const val = styleValue.length === 0 ? returnValueFromReference(variableRef) : styleValue ;

  // PRINT OUT THE PROPERTY AND ITS VALUE ACCORDING TO THE TYPE OF TAG
  let textVariableReference;

  if (name.toLowerCase() === 'border') {
    textVariableReference = (
      <b>
        {val[0]} <span className="toLowerCase">px solid</span> {val[1]}
        <small>only works for 2 references :(</small>
      </b>
    );
  } else if (name.toLowerCase() === 'font size (rem)') {
    textVariableReference = (
      <b>
        <span className="toLowerCase">calc(</span> {val[0]} * {val[1]}
        <span className="toLowerCase">)</span>
        <small>only works for 2 references :(</small>
      </b>
    );
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
              placeholder="Use { } to variable references, e.g : {sizes.borderWidth}px solid {colors.primary}"
              value={input}
              onChange={(event) => updateInput(event)}
            />
          </div>

          {/* ERROR MESSAGE */}
          <div className="box-space">
            <Row>
              <Col span={10}>
                <Text className={showErrorSintax ? '' : 'hidden'}>
                  <span className="error">
                    INVALID CSS SYNTAX OR NOT VALID SYNTAX FOR THIS INPUT{' '}
                  </span>
                </Text>
              </Col>
              <Col span={12}>
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
