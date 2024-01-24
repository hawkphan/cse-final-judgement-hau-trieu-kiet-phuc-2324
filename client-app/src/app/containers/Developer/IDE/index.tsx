/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useRef, useState } from "react";
import Editor, { EditorProps } from "@monaco-editor/react";
import { Stack } from "@mui/material";
import { Button, Grid } from "../../../shared";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const files = {
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: "console.log('Hello World!');",
  },
};

type Monaco = typeof monaco;

const IDE = () => {
  const [filename, setFilename] = useState("script.js");
  const file = files[filename];
  const editorRef = useRef(null);
  const [darkOrLight, setDarkOrLight] = useState("vs-dark");

  const handleComponentDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
    console.log(monaco);
  };

  const toggleDarkOrLightTheme = () => {
    setDarkOrLight(darkOrLight === "vs-dark" ? "light" : "vs-dark");
  };

  const getEditorValue = () => {
    // const blob = new Blob([editorRef.current.getValue()], {
    //   type: "text/plain",
    // });
    // const url = URL.createObjectURL(blob);

    // const link = document.createElement("a");
    // link.download = file.name;
    // link.href = url;
    // link.click();
    alert(editorRef.current.getValue());
  };

  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    autoIndent: "full",
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
    showDeprecated: true,
  };

  return (
    <Stack>
      <Grid.Wrap>
        <Grid.Item xs={6}>
          <Button onClick={() => getEditorValue()}>Submit</Button>
        </Grid.Item>
        <Grid.Item xs={6}>
          <Button onClick={() => toggleDarkOrLightTheme()}>Toggle theme</Button>
        </Grid.Item>
      </Grid.Wrap>
      <Editor
        height="100vh"
        width="100%"
        theme={darkOrLight}
        onMount={handleComponentDidMount}
        defaultLanguage={file.language}
        defaultValue={file.value}
        path={file.name}
        options={options}
      />
    </Stack>
  );
};

export default IDE;

// https://blog.logrocket.com/build-web-editor-with-react-monaco-editor/
// https://stackoverflow.com/questions/70261303/react-monaco-editor-typescript-integration
