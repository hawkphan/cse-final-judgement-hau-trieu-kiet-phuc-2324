/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";
import {
  AnimatedTabPanel,
  Button,
  COLOR_CODE,
  Grid,
  LoadingCommon,
  MuiSelect,
  TabsBar,
  Tag,
  formatDateOrNull,
} from "../../../shared";
import { PATHS } from "../../Navbar/helpers";
import { useMemo, useRef, useState } from "react";
import { languageOptions, renderDifficultyTag } from "./helpers";
import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { API_QUERIES } from "../../../queries/common/constants";
import { LanguageOption, useGetLanguages } from "../../../queries/Languages";
import { useGetProblemById } from "../../../queries/Problems";

const ProblemDetail = () => {
  const [tab, setTab] = useState("tab1");
  const { id } = useParams<{ id: string }>();

  const { problem, isFetching } = useGetProblemById({
    id,
    queryKey: [API_QUERIES.GET_PROBLEM_BY_ID, { id: id }],
  });

  const { languages } = useGetLanguages();

  const languageOptions: LanguageOption[] = useMemo(
    () => languages.map((item) => ({ label: item.name, value: item.id })),
    [languages]
  );

  const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: "console.log('Hello World!');",
    },
  };

  type Monaco = typeof monaco;

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
    padding: {
      top: 4,
    },
  };

  if (isFetching) {
    return <LoadingCommon />;
  }

  return (
    <Container maxWidth="xl" style={{ padding: "10px" }}>
      <Stack sx={{ marginBottom: "10px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to={PATHS.problems}
            style={{ textDecoration: "none", color: COLOR_CODE.PRIMARY_300 }}
          >
            <Typography textAlign="center" style={{ textDecoration: "none" }}>
              Problems
            </Typography>
          </Link>
          <Typography color="text.primary">{problem.code}</Typography>
        </Breadcrumbs>
      </Stack>
      <Stack>
        <Grid.Wrap>
          <Grid.Item xs={6}>
            <Card sx={{ height: "800px" }}>
              <Box>
                <Stack>
                  <TabsBar
                    tabsList={[
                      {
                        label: "Description",
                        value: "tab1",
                      },
                      {
                        label: "Submission",
                        value: "tab2",
                      },
                    ]}
                    value={tab}
                    onChange={(_, value) => {
                      setTab(value);
                    }}
                  />

                  <AnimatedTabPanel
                    uniqKey={`userType-${tab}`}
                    transitionTime={0.2}
                  >
                    {tab === "tab1" && (
                      <CardContent>
                        <Typography variant="h4" mb={2}>
                          {problem.code} - {problem.title}
                        </Typography>
                        {renderDifficultyTag(problem.difficulty)}
                        <span style={{ marginLeft: "5px", fontSize: "14px" }}>
                          Published on {formatDateOrNull(problem.date)}
                        </span>
                        <span
                          style={{
                            marginLeft: "5px",
                            fontSize: "14px",
                            fontStyle: "italic",
                          }}
                        >
                          by{" "}
                          <Tag
                            style={{ marginLeft: "10px" }}
                            variant="is-customize"
                          >
                            {problem.user.displayName}
                          </Tag>
                        </span>
                        <Box>
                          <ReactMarkdown
                            remarkPlugins={[
                              [remarkGfm, { singleTilde: false }],
                            ]}
                          >
                            {problem.description}
                          </ReactMarkdown>
                        </Box>
                      </CardContent>
                    )}
                    {tab === "tab2" && <CardContent>Submission</CardContent>}
                  </AnimatedTabPanel>
                </Stack>
              </Box>
            </Card>
          </Grid.Item>
          <Grid.Item xs={6}>
            <Card sx={{ height: "800px" }}>
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
                  value={1}
                  placeholder="Select Language"
                  onChange={(_, data) => {
                    console.log(data);
                  }}
                  style={{ width: "220px" }}
                />
                <Button
                  onClick={() => toggleDarkOrLightTheme()}
                  icon={
                    darkOrLight === "vs-dark" ? (
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
                height="708px"
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
                  style={{ borderRadius: "0px", backgroundColor: "green" }}
                  onClick={() => getEditorValue()}
                >
                  Submit
                </Button>
              </Stack>
            </Card>
          </Grid.Item>
        </Grid.Wrap>
      </Stack>
    </Container>
  );
};

export default ProblemDetail;
