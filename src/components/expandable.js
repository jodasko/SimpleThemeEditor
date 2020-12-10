import React from 'react';
import EditorInline from '../components/editorinline';

export default function AppExpandable () {
    return(
        <div className="block propertiesBlock">
            <div className="container-fluid">
            
                    <EditorInline section="General colors" key="1" />

                    <EditorInline section="Global sizes" key="2" />

                    <EditorInline section="Text field" key="3" />

                    <EditorInline section="Buttons" key="4" />
            </div>
        </div>
    );
}