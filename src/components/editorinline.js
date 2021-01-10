import React from 'react';
import { Button, Collapse } from 'antd';
import { useTheme } from '../ThemeContext';
import Editor from './editor';
import { toSaveToLocalStorage } from '../container/services';

// Panel Component
const { Panel } = Collapse;

export default function EditorInline() {
  const editor = useTheme();

  // useEffect(() => {
  //   window.localStorage.setItem('editorData', JSON.stringify(editor));
  // }, [editor]);

  return (
    <div>
      {editor.map((resp) => (
        <Collapse>
          <Panel key={resp.id} header={resp.section.toUpperCase()}>
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
        id="save-btn-test"
        className="save-btn"
        onClick={() => toSaveToLocalStorage(editor)}
        type="primary"
        block
      >
        {' '}
        SAVE{' '}
      </Button>
    </div>
  );
}
