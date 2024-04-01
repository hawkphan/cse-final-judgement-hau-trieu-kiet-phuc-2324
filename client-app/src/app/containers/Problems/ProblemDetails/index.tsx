/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Container, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  AnimatedTabPanel,
  Breadcrumbs,
  Button,
  Form,
  Grid,
  LoadingCommon,
  MuiSelect,
  TabsBar,
  Toastify,
  isEmpty,
} from "../../../shared";
import { useEffect, useMemo, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { API_QUERIES } from "../../../queries/common/constants";
import { LanguageOption, useGetLanguages } from "../../../queries/Languages";
import { useGetProblemById } from "../../../queries/Problems";
import DescriptionTab from "./DescriptionTab";
import SubmissionTab from "./SubmissionTab";
import {
  CompilerEnv,
  Tab,
  ThemeMode,
  tabsList,
  toBreadcrumbs,
} from "./helpers";
import {
  CreateSolutionBody,
  useGetSolutions,
  useSubmitSolution,
} from "../../../queries";
import { useForm } from "react-hook-form";
import { useStore } from "../../../shared/common/stores/store";

const ProblemDetail = () => {
  const [tab, setTab] = useState(Tab.DESCRIPTION);
  const [currentLanguageId, setCurrentLanguageId] = useState();
  const { id } = useParams<{ id: string }>();

  const { userStore } = useStore();
  const user = userStore.user;

  const { problem, isFetching } = useGetProblemById({
    id,
    queryKey: [API_QUERIES.GET_PROBLEM_BY_ID, { id: id }],
  });

  const { languages, setParams } = useGetLanguages();

  const languageOptions: LanguageOption[] = useMemo(
    () => languages.map((item) => ({ label: item.name, value: item.id })),
    [languages]
  );

  type Monaco = typeof monaco;

  const file = CompilerEnv["Python"];
  const editorRef = useRef(null);
  const [darkOrLight, setDarkOrLight] = useState(ThemeMode.DARK);

  const handleComponentDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
  };

  const getUserId = useMemo(() => {
    return user?.id;
  }, [user?.id]);

  const toggleDarkOrLightTheme = () => {
    setDarkOrLight(
      darkOrLight === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK
    );
  };

  const getEditorValue = () => {
    return editorRef.current.getValue();
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

  const { handleSubmit } = useForm<CreateSolutionBody>({
    defaultValues: {},
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  const { handleInvalidateSolutions } = useGetSolutions();

  const { onSubmitSolution, isPending } = useSubmitSolution({
    onSuccess: () => {
      Toastify.success("Successful!");
      handleInvalidateSolutions();
      setTab(Tab.SUBMISSION);
    },
    onError: (error) => {
      Toastify.error(error.message);
      handleInvalidateSolutions();
      setTab(Tab.SUBMISSION);
      console.log("Error", error);
    },
  });

  const onSubmit = async (data: CreateSolutionBody) => {
    data.userId = getUserId;
    data.problemId = problem.id;
    data.solution = getEditorValue();
    data.languageId = currentLanguageId;
    onSubmitSolution(data);
  };

  useEffect(() => {
    setParams({ pageSize: -1 });
  }, [setParams]);

  const renderTab = () => {
    switch (tab) {
      case Tab.DESCRIPTION:
        return <DescriptionTab problem={problem} />;
      case Tab.SUBMISSION:
        return <SubmissionTab userId={getUserId} problemId={problem?.id} />;
      case Tab.OTHER:
        return <></>;
      default:
        <LoadingCommon />;
    }
  };

  if (isFetching) {
    return <LoadingCommon />;
  }

  return (
    <Container maxWidth="xl" style={{ padding: "10px" }}>
      <Breadcrumbs items={toBreadcrumbs({ problem })} />
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack>
          <Grid.Wrap>
            <Grid.Item xs={6}>
              <Card sx={{ height: "550px" }}>
                <Box>
                  <Stack>
                    <TabsBar
                      tabsList={tabsList}
                      value={tab}
                      onChange={(_, value) => {
                        setTab(value);
                      }}
                    />
                    <AnimatedTabPanel
                      uniqKey={`userType-${tab}`}
                      transitionTime={0.2}
                    >
                      {renderTab()}
                    </AnimatedTabPanel>
                  </Stack>
                </Box>
              </Card>
            </Grid.Item>
            <Grid.Item xs={6}>
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
                    isLoading={isPending}
                  >
                    Submit
                  </Button>
                </Stack>
              </Card>
            </Grid.Item>
          </Grid.Wrap>
        </Stack>
      </Form>
    </Container>
  );
};

export default ProblemDetail;
