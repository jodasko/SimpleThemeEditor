import React, { useEffect } from 'react';
import { Button, Collapse } from 'antd';
import { useTheme, useThemeUpdateStorage } from '../ThemeContext';
import Editor from './editor';

// Panel Component
const { Panel } = Collapse;

export default function EditorInline() {
  const editor = useTheme();
  const saveToLocalStorage = useThemeUpdateStorage();

  useEffect(() => {
    window.localStorage.setItem('editorData', JSON.stringify(editor));
  }, [editor]);

  return (
    <div>
      {editor.map((resp) => (
        <Collapse>
          <Panel header={resp.section.toUpperCase()}>
            {resp.styles.map((style) => (
              <Editor
                idsection={resp.id}
                name={style.name}
                value={style.value}
                variableRef={style.variableref}
                reference={style.ref}
                keyref={0}
              />
            ))}
          </Panel>
        </Collapse>
      ))}
      <Button
        className="save-btn"
        onClick={() => saveToLocalStorage(editor)}
        type="primary"
        block
      >
        {" "}
        SAVE{" "}
      </Button>
    </div>
  );
}
