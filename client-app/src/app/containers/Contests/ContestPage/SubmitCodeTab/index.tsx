import { Box, Card, CardContent, Stack } from "@mui/material";
import { Button, MuiSelect, isEmpty } from "../../../../shared";
import { Editor } from "@monaco-editor/react";
import { useEffect, useMemo, useRef, useState } from "react";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { CompilerEnv, ThemeMode } from "../helpers";
import { LanguageOption, useGetLanguages } from "../../../../queries";
import { problemsOpt } from "../data.mock";

export default function SubmitCodeTab() {
  const [currentLanguageId, setCurrentLanguageId] = useState();
  const [currentProblemId, setCurrentProblemId] = useState();
  const { languages, setParams } = useGetLanguages();
  const [darkOrLight, setDarkOrLight] = useState(ThemeMode.DARK);

  const editorRef = useRef(null);
  type Monaco = typeof monaco;
  const handleComponentDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
  };
  const toggleDarkOrLightTheme = () => {
    setDarkOrLight(
      darkOrLight === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK
    );
  };

  const languageOptions: LanguageOption[] = useMemo(
    () => languages.map((item) => ({ label: item.name, value: item.id })),
    [languages]
  );

  const file = CompilerEnv["Python"];

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
    padding: {
      top: 4,
    },
  };

  useEffect(() => {
    setParams({ pageSize: -1 });
  }, [setParams]);

  return (
    <CardContent>
      <Box overflow={"auto"}>
        {/* <Form  autoComplete="off"> */}
        <Card sx={{ height: "550px" }}>
          <Stack
            justifyContent="flex-start"
            direction="row"
            flexGrow={1}
            alignItems="center"
          >
            <MuiSelect
              name="language"
              options={languageOptions}
              size="small"
              value={currentLanguageId}
              placeholder="Select Language"
              onChange={(_, data) => {
                setCurrentLanguageId(data);
              }}
              style={{ width: "220px" }}
            />

            <MuiSelect
              name="language"
              options={problemsOpt}
              size="small"
              value={currentProblemId}
              placeholder="Select Problem"
              onChange={(_, data) => {
                setCurrentProblemId(data);
              }}
              style={{ width: "280px" }}
            />
            <Button
              onClick={() => toggleDarkOrLightTheme()}
              icon={
                darkOrLight === ThemeMode.DARK ? (
                  <LightbulbIcon />
                ) : (
                  <LightbulbOutlinedIcon />
                )
              }
              style={{
                borderRadius: "0px",
                backgroundColor: "gray",
                marginTop: "5px",
              }}
            />
          </Stack>
          <Editor
            height="458px"
            width="100%"
            theme={darkOrLight}
            onMount={handleComponentDidMount}
            defaultLanguage={file.language}
            defaultValue={file.value}
            path={file.name}
            options={options}
          />
          <Stack
            justifyContent="flex-end"
            direction="row"
            flexGrow={1}
            alignItems="center"
            sx={{ marginTop: "-1px" }}
          >
            <Button
              style={{
                borderRadius: "0px",
                backgroundColor: "green",
                width: "100%",
              }}
              type="submit"
              disabled={isEmpty(currentLanguageId)}
            >
              Submit
            </Button>
          </Stack>
        </Card>
        {/* </Form> */}
      </Box>
    </CardContent>
  );
}
