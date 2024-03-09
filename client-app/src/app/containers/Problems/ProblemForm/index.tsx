/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumbs, Card, Container, Stack, Typography } from "@mui/material";
import {
  Button,
  COLOR_CODE,
  Form,
  Grid,
  LoadingCommon,
  MuiInput,
  MuiSwitch,
  TextArea,
  Toastify,
} from "../../../shared";
import { Controller, useForm } from "react-hook-form";
import { CreateProblemBody } from "../../../queries/Problems/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../../configs/paths";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateProblem,
  useEditProblem,
  useGetProblemById,
  useGetProblems,
} from "../../../queries/Problems";
import { useStore } from "../../../shared/common/stores/store";
import {
  CreateProblemFormSchema,
  EditProblemFormSchema,
  ProblemProperties,
  mapFormData,
} from "./helpers";
import { API_QUERIES } from "../../../queries/common/constants";

const ProblemForm = () => {
  const { id } = useParams();

  const { userStore } = useStore();

  const isEdit = id && id !== "";
  const navigate = useNavigate();

  const { problem, isFetching, handleInvalidateProblem } = useGetProblemById({
    id,
    queryKey: [API_QUERIES.GET_PROBLEM_BY_ID, { id: id }],
  });

  const { handleInvalidateProblems } = useGetProblems();

  const [fileSelected, setFileSelected] = useState();
  const [description, setDescription] = useState("");
  const [previewMarkdown, setPreviewMarkdown] = useState<boolean>();

  const { onCreateProblem } = useCreateProblem({
    onSuccess: () => {
      Toastify.success("Successful!");
      handleInvalidateProblems();
      handleInvalidateProblem();
      navigate(PATHS.problems);
    },
    onError: (error) => {
      Toastify.error(error.message);
      console.log("Error", error);
    },
  });

  const { onEditProblem } = useEditProblem({
    onSuccess: () => {
      Toastify.success("Successful!");
      handleInvalidateProblems();
      handleInvalidateProblem();
      navigate(PATHS.problems);
    },
    onError: (error) => {
      Toastify.error(error.message);
      console.log("Error", error);
    },
  });

  const saveFileSelected = (e: any) => {
    setFileSelected(e.target.files[0]);
  };

  const onSubmit = async (data: CreateProblemBody) => {
    const formData = mapFormData(data, fileSelected, userStore.user.id, isEdit);
    if (!isEdit) {
      onCreateProblem(formData);
    } else {
      onEditProblem(formData);
    }
  };

  const { control, handleSubmit, reset } = useForm<CreateProblemBody>({
    defaultValues: isEdit
      ? { ...problem }
      : { [ProblemProperties.TIME_LIMIT]: 1 },
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
    resolver: yupResolver<any>(
      isEdit ? EditProblemFormSchema : CreateProblemFormSchema
    ),
  });

  useEffect(() => {
    reset({ ...problem });
    setDescription(problem?.description);
  }, [problem, reset]);

  if (isFetching) {
    return <LoadingCommon />;
  }

  return (
    <Container maxWidth="xl" style={{ padding: "10px" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to={PATHS.problems}
          style={{ textDecoration: "none", color: COLOR_CODE.PRIMARY_300 }}
        >
          <Typography textAlign="center" style={{ textDecoration: "none" }}>
            Problems
          </Typography>
        </Link>
        <Typography color="text.primary">
          {isEdit ? "Edit" : "Create"}
        </Typography>
        {isEdit ? <Typography color="text.primary">{id}</Typography> : ""}
      </Breadcrumbs>
      <Card sx={{ padding: "10px", marginTop: "10px" }}>
        <Typography variant="h4" mb={5} mt={2}>
          {isEdit ? "Edit Problem" : "Create New Problem"}
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid.Wrap>
            <Grid.Item xs={4}>
              <Controller
                name={ProblemProperties.CODE}
                control={control}
                render={({
                  field: { value, onChange, ...props },
                  fieldState: { error },
                }) => (
                  <MuiInput
                    label="Problem Code"
                    placeholder="Problem Code"
                    required
                    value={value}
                    errorMessage={error?.message}
                    onChange={(data) => {
                      onChange(data);
                    }}
                    {...props}
                  />
                )}
              />
            </Grid.Item>
            <Grid.Item xs={8}>
              <Controller
                name={ProblemProperties.TITLE}
                control={control}
                render={({
                  field: { value, onChange, ...props },
                  fieldState: { error },
                }) => (
                  <MuiInput
                    label="Problem Title"
                    placeholder="Problem Title"
                    required
                    value={value}
                    errorMessage={error?.message}
                    onChange={(data) => {
                      onChange(data);
                    }}
                    {...props}
                  />
                )}
              />
            </Grid.Item>
            <Grid.Item xs={6}>
              <MuiSwitch
                label="Preview Markdown"
                isShowDescription={false}
                onChange={() => setPreviewMarkdown(!previewMarkdown)}
                checked={previewMarkdown}
              />
              {!previewMarkdown && (
                <Controller
                  name={ProblemProperties.DESCRIPTION}
                  control={control}
                  render={({
                    field: { onChange, value, ...props },
                    fieldState: { error },
                  }) => (
                    <TextArea
                      label="Description"
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setDescription((e.target as HTMLTextAreaElement).value);
                      }}
                      errorMessage={error?.message}
                      style={{ maxWidth: "96%", overflow: "hidden" }}
                      {...props}
                    />
                  )}
                />
              )}

              {previewMarkdown && (
                <div>
                  <Typography fontSize={14}>Description</Typography>
                  <Card
                    sx={{
                      padding: "10px",
                      marginTop: "8px",
                      minHeight: "65px",
                      border: "initial",
                    }}
                  >
                    <ReactMarkdown
                      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                    >
                      {description}
                    </ReactMarkdown>
                  </Card>
                </div>
              )}
            </Grid.Item>
            <Grid.Item xs={6}></Grid.Item>
          </Grid.Wrap>
          <Grid.Wrap>
            <Grid.Item xs={6}>
              <Controller
                name={ProblemProperties.TIME_LIMIT}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiInput
                    label="Time Limit (s)"
                    type="number"
                    placeholder="Time Limit (s)"
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (Number(newValue) >= 0) {
                        field.onChange(newValue);
                      }
                    }}
                    value={field.value}
                    errorMessage={fieldState.error?.message}
                    required
                  />
                )}
              />
            </Grid.Item>
            <Grid.Item xs={12}>
              <Typography fontSize={14}>Import Test Case File</Typography>
              <input
                type="file"
                accept=".zip"
                onChange={saveFileSelected}
                style={{ marginTop: "8px" }}
              />
            </Grid.Item>
          </Grid.Wrap>
          <Stack direction="row" justifyContent="flex-end" mt={4}>
            <Button type="submit" label={"Save"} isLoading={false} />
          </Stack>
        </Form>
      </Card>
    </Container>
  );
};

export default ProblemForm;
