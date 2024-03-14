/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Container, Stack, Typography } from "@mui/material";
import { stripHtml } from "string-strip-html";
import {
  Breadcrumbs,
  Button,
  Form,
  Grid,
  LoadingCommon,
  MuiInput,
  MuiSelect,
  Toastify,
} from "../../../shared";
import { Controller, useForm } from "react-hook-form";
import {
  CreateProblemBody,
  EditProblemBody,
} from "../../../queries/Problems/types";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../../configs/paths";
import { useEffect, useMemo, useState } from "react";
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
  ValidationMessage,
  mapFormData,
  toBreadCrumbs,
} from "./helpers";
import { API_QUERIES } from "../../../queries/common/constants";
import WYSIWYGEditor from "../../../shared/components/common/RichTextEditor";

const ProblemForm = () => {
  const [fileSelected, setFileSelected] = useState();

  const { id } = useParams();
  const { userStore } = useStore();
  const navigate = useNavigate();
  const { problems, setParams, handleInvalidateProblems } = useGetProblems();
  const { problem, isFetching, handleInvalidateProblem } = useGetProblemById({
    id,
    queryKey: [API_QUERIES.GET_PROBLEM_BY_ID, { id: id }],
  });

  const { onCreateProblem, isPending: isCreatePending } = useCreateProblem({
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

  const { onEditProblem, isPending: isEditPending } = useEditProblem({
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

  const isEdit = id && id !== "";

  const saveFileSelected = (e: any) => {
    setFileSelected(e.target.files[0]);
  };

  const breadCrumbsItems = useMemo(
    () => toBreadCrumbs(isEdit, id),
    [id, isEdit]
  );

  const allProblemNames = useMemo(() => {
    return problems?.map((item) => {
      if (item.code != problem?.code) {
        return item.code;
      }
    });
  }, [problem?.code, problems]);

  const { control, handleSubmit, reset, setError } = useForm<CreateProblemBody>(
    {
      defaultValues: isEdit
        ? { ...problem }
        : {
            [ProblemProperties.TIME_LIMIT]: 1000,
            [ProblemProperties.MEMORY_LIMIT]: 500,
          },
      mode: "onChange",
      shouldFocusError: true,
      reValidateMode: "onChange",
      resolver: yupResolver<any>(
        isEdit ? EditProblemFormSchema : CreateProblemFormSchema
      ),
    }
  );

  const onSubmit = async (data: CreateProblemBody | EditProblemBody) => {
    if (
      allProblemNames.includes(data?.code) &&
      (data as EditProblemBody)?.code
    ) {
      Toastify.error(ValidationMessage.EXISTING_CODE);
      setError(ProblemProperties.CODE, {
        message: ValidationMessage.EXISTING_CODE,
      });
      return;
    }

    const formData = mapFormData(data, fileSelected, userStore.user.id, isEdit);
    if (!isEdit) {
      if (!fileSelected) {
        Toastify.error(ValidationMessage.LACK_OF_FILE);
        return;
      }
      onCreateProblem(formData);
    } else {
      onEditProblem(formData);
    }
  };

  useEffect(() => {
    reset({ ...problem });
  }, [problem, reset]);

  useEffect(() => {
    setParams({ pageSize: -1 });
  }, [setParams]);

  if (isFetching) {
    return <LoadingCommon />;
  }

  return (
    <Container maxWidth="xl" style={{ padding: "10px" }}>
      <Breadcrumbs items={breadCrumbsItems} />
      <Card sx={{ padding: "10px", marginTop: "10px" }}>
        <Typography variant="h5" mb={5} mt={2}>
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
            <Grid.Item xs={12}>
              <Controller
                name={ProblemProperties.DESCRIPTION}
                control={control}
                render={({ field }) => (
                  <div>
                    <Typography fontSize={14}>Description</Typography>
                    <WYSIWYGEditor {...field} />
                  </div>
                )}
                rules={{
                  validate: {
                    required: (v) =>
                      (v && stripHtml(v).result.length > 0) ||
                      "Description is required",
                    maxLength: (v) =>
                      (v && stripHtml(v).result.length <= 2000) ||
                      "Maximum character limit is 2000",
                  },
                }}
              />
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
                    label="Time Limit (ms)"
                    type="number"
                    placeholder="Time Limit (ms)"
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
            <Grid.Item xs={6}>
              <Controller
                name={ProblemProperties.MEMORY_LIMIT}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiInput
                    label="Memory Limit (MB)"
                    type="number"
                    placeholder="Memory Limit (s)"
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
            <Grid.Item xs={6}>
              <Controller
                name={ProblemProperties.COMPARE_MODE}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    label="Compare Mode"
                    options={[
                      { label: "Approximate", value: "0" },
                      { label: "Absolute", value: "1" },
                      { label: "Without Space", value: "2" },
                    ]}
                    value={field.value}
                    onChange={(_, value) => {
                      field.onChange(value);
                    }}
                    required
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
            </Grid.Item>
            <Grid.Item xs={6}>
              <Controller
                name={ProblemProperties.APPROXIMATE_VALUE}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    label="Approximate Value"
                    options={[
                      { label: "10^(-1)", value: "0" },
                      { label: "10^(-2)", value: "1" },
                      { label: "10^(-3)", value: "2" },
                      { label: "10^(-4)", value: "3" },
                      { label: "10^(-5)", value: "4" },
                      { label: "10^(-6)", value: "5" },
                      { label: "10^(-7)", value: "6" },
                      { label: "10^(-8)", value: "7" },
                      { label: "10^(-9)", value: "8" },
                    ]}
                    value={field.value}
                    onChange={(_, value) => {
                      field.onChange(value);
                    }}
                    required
                    errorMessage={fieldState.error?.message}
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
            <Button
              type="submit"
              label={"Save"}
              isLoading={isCreatePending || isEditPending}
            />
          </Stack>
        </Form>
      </Card>
    </Container>
  );
};

export default ProblemForm;
