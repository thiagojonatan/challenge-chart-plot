import React from 'react';
import {Controlled as CodeMirror} from "react-codemirror2";

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/darcula.css');
require("./codemirror-theme.css");
require("codemirror/mode/jsx/jsx");
require("codemirror/mode/javascript/javascript");

export default (props) => {

    return (
        <>
                <CodeMirror id="editor" className="editor"
                    value={props.value} autoScroll={true}
                    options={{
                        mode: 'javascript',
                        theme: 'codemirror-theme',
                        autoCloseBrackets: true,
                        lineNumbers: true,
                        styleActiveLine: true,
                        smartIndent: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        props.setValue(value);
                    }}
                    onChange={(editor, data, value) => {

                    }}
                />
        </>
    )
}