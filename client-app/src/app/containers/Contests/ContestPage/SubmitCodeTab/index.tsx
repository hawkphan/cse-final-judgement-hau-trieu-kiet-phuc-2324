import { Box, Card, CardContent, Stack } from "@mui/material";
import {
  Button,
  Form,
  MuiSelect,
  Toastify,
  isEmpty,
} from "../../../../shared";
import { Editor } from "@monaco-editor/react";
import { useEffect, useMemo, useRef, useState } from "react";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { CompilerEnv, ThemeMode } from "../helpers";
import {
  Contest,
  ContestProblem,
  CreateSolutionBody,
  useGetSolutions,
  useSubmitSolution,
} from "../../../../queries";
import { getLanguageNameById } from "../../../Problems/ProblemDetails/SubmissionTab/helpers";
import { SelectOption } from "../../../../shared/components/common/MuiAutoComplete";
import { useStore } from "../../../../shared/common/stores/store";
import { useForm } from "react-hook-form";

interface Props {
  contest: Contest;
}

export default function SubmitCodeTab(props: Readonly<Props>) {
  const { contest } = props;
  const [currentLanguageId, setCurrentLanguageId] = useState("");
  const [currentProblemId, setCurrentProblemId] = useState("");
  const [darkOrLight, setDarkOrLight] = useState(ThemeMode.DARK);
  // const [problemOptions, setProblemOptions] = useState<SelectOption[]>([]);
  const [languageOptions, setLanguageOptions] = useState<SelectOption[]>([]);
  const { userStore } = useStore();
  const user = userStore.user;
  const editorRef = useRef(null);

  const handleComponentDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
  };
  const toggleDarkOrLightTheme = () => {
    setDarkOrLight(
      darkOrLight === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK
    );
  };

  const problemOptions = contest?.problems?.map((p) => ({
    value: p?.problemId,
    label: p?.problem?.code + " - " + p?.problem?.title,
  }));

  useEffect(() => {
    if (!isEmpty(currentProblemId)) {
      const problem: ContestProblem = contest?.problems?.filter(
        (p) => p.problemId == currentProblemId
      )[0];
      setLanguageOptions(
        problem?.problem?.problemLanguages?.map((l) => ({
          label: getLanguageNameById(l.languageId),
          value: l.languageId,
        }))
      );
    }
  }, [contest?.problems, currentProblemId, languageOptions]);

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

  const { handleInvalidateSolutions, setParams: setSolutionParams } =
    useGetSolutions();
  const { handleSubmit } = useForm<CreateSolutionBody>({
    defaultValues: {},
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });
  const { onSubmitSolution, isPending } = useSubmitSolution({
    onSuccess: () => {
      Toastify.success("Successful!");
      handleInvalidateSolutions();
    },
    onError: (error) => {
      Toastify.error(error.message);
      handleInvalidateSolutions();
      console.log("Error", error);
    },
  });

  const getEditorValue = () => {
    return editorRef.current.getValue();
  };
  const getUserId = useMemo(() => {
    return user?.id;
  }, [user?.id]);

  const onSubmit = async (data: CreateSolutionBody) => {
    data.userId = getUserId;
    data.problemId = currentProblemId;
    data.contestId = contest.id;
    data.solution = getEditorValue();
    data.languageId = currentLanguageId;
    onSubmitSolution(data);
  };
  useEffect(() => {
    setSolutionParams({ problemId: currentProblemId, userId: user?.id });
  }, [currentProblemId, setSolutionParams, user?.id]);

  return (
    <CardContent>
      <Box overflow={"auto"}>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Card sx={{ height: "550px" }}>
            <Stack
              justifyContent="flex-start"
              direction="row"
              flexGrow={1}
              alignItems="center"
            >
              <MuiSelect
                name="language"
                options={problemOptions}
                size="small"
                value={currentProblemId}
                placeholder="Select Problem"
                onChange={(_, data) => {
                  setCurrentProblemId(data);
                }}
                style={{ width: "280px" }}
              />
              <MuiSelect
                sx={{ display: currentProblemId == "" ? "none" : "block" }}
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
        </Form>
      </Box>
    </CardContent>
  );
}
