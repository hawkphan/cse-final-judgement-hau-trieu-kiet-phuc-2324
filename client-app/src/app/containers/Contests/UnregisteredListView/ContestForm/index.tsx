import {
  Breadcrumbs,
  Button,
  EmptyTable,
  Form,
  Grid,
  LoadingCommon,
  MuiInput,
  MuiSelect,
  Table2,
  Toastify,
  ViewItem,
  isEmpty,
} from "../../../../shared";
import { Card, Container, InputLabel, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  ContestProblem,
  CreateContestBody,
  GetPropertiesParams,
  useCreateContest,
  useGetProblems,
} from "../../../../queries";
import WYSIWYGEditor from "../../../../shared/components/common/RichTextEditor";
import { stripHtml } from "string-strip-html";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { allColumns } from "./allColumns";
import { useCallback, useMemo, useState } from "react";
import { PATHS } from "../../../../configs/paths";
import { toBreadCrumbs } from "./helpers";
import { DateTimePicker } from "@mui/x-date-pickers";

const ContestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = id && id !== "";

  const [problemIdToAdd, setProblemIdToAdd] = useState<string>();
  const [problemScoreToAdd, setProblemScoreToAdd] = useState<number>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [problemSet, setProblemSet] = useState<any[]>([]);

  console.log("problemSet", problemSet);
  const {
    setParams,
    isFetching,
    selectOptions: problemOptions,
  } = useGetProblems();
  const { isPending, onCreateContest } = useCreateContest({
    onSuccess: () => {
      Toastify.success("Successful!");
      navigate(PATHS.contests);
    },
    onError: (error) => {
      Toastify.error(error.message);
      console.log("Error", error);
    },
  });

  const { control, handleSubmit } = useForm<CreateContestBody>({
    defaultValues: { startTime: null, endTime: null },
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  const onSubmit = useCallback(
    (data: CreateContestBody) => {
      onCreateContest(data);
    },
    [onCreateContest]
  );

  const handleGetProblems = useCallback(
    (params: GetPropertiesParams) => {
      setParams({ ...params });
    },
    [setParams]
  );

  const handleSetProblemSet = () => {
    const existingProblem = problemSet?.filter(
      (item) => item.problemId === problemIdToAdd
    );

    if (
      isEmpty(problemIdToAdd) ||
      isEmpty(problemScoreToAdd) ||
      !isEmpty(existingProblem)
    ) {
      Toastify.error("Cannot add the problem!");
      return;
    }

    setProblemSet([
      ...problemSet,
      { problemId: problemIdToAdd, score: problemScoreToAdd },
    ]);
    setProblemIdToAdd("");
  };

  const handleDeleteProblemRow = useCallback(
    (value: string) => {
      setProblemSet([...problemSet.filter((item) => item.problemId !== value)]);
    },
    [problemSet]
  );

  const breadCrumbsItems = useMemo(
    () => toBreadCrumbs(isEdit, id),
    [id, isEdit]
  );

  const columns = useMemo(
    () => allColumns({ problemOptions, handleDeleteProblemRow }),
    [problemOptions, handleDeleteProblemRow]
  );

  if (isFetching) {
    return <LoadingCommon />;
  }

  return (
    <Container maxWidth="xl" style={{ padding: "10px" }}>
      <Breadcrumbs items={breadCrumbsItems} />
      <Card sx={{ padding: "10px", marginTop: "10px" }}>
        <Typography variant="h5" mb={5} mt={2}>
          {isEdit ? "Edit Contest" : "Create New Contest"}
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid.Wrap>
            <Grid.Item xs={4}>
              <Controller
                name={"name"}
                control={control}
                render={({
                  field: { value, onChange, ...props },
                  fieldState: { error },
                }) => (
                  <MuiInput
                    label="Name"
                    placeholder="Name"
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
              <InputLabel sx={{ fontSize: "14px" }}>Description</InputLabel>
              <Controller
                name={"description"}
                control={control}
                render={({ field }) => <WYSIWYGEditor {...field} />}
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
          </Grid.Wrap>
          <Grid.Wrap style={{ marginBottom: "10px" }}>
            <Grid.Item xs={6}>
              <InputLabel sx={{ fontSize: "14px" }}>Start Time</InputLabel>
              <Controller
                name={"startTime"}
                control={control}
                render={({
                  field: { value, onChange, ...props },
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  fieldState: { error },
                }) => (
                  // <MuiDatePicker
                  //   label="Start Time"
                  //   value={dayjs(value)}
                  //   errorMessage={error?.message}
                  //   onChange={(data) => {
                  //     onChange(data);
                  //   }}
                  //   {...props}
                  //   required
                  // />

                  <DateTimePicker
                    value={dayjs(value)}
                    label=""
                    onChange={(data) => {
                      onChange(data);
                    }}
                    {...props}
                  />
                )}
              />
            </Grid.Item>
          </Grid.Wrap>
          <Grid.Wrap style={{ marginBottom: "10px" }}>
            <Grid.Item xs={4}>
              <Controller
                name={"type"}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    label="Type"
                    options={[
                      { label: "Public", value: "0" },
                      { label: "Private", value: "1" },
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
            <Grid.Item xs={4}>
              <Controller
                name={"rule"}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    label="Rule"
                    options={[
                      { label: "ACM/ICPC", value: "0" },
                      { label: "Olympic", value: "1" },
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
          </Grid.Wrap>
          <Grid.Wrap style={{ marginBottom: "10px" }}>
            <Grid.Item xs={6}>
              <InputLabel sx={{ fontSize: "14px" }}>End Time</InputLabel>
              <Controller
                name={"endTime"}
                control={control}
                render={({
                  field: { value, onChange, ...props },
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  fieldState: { error },
                }) => (
                  // <MuiDatePicker
                  //   label="End Time"
                  //   value={dayjs(value)}
                  //   errorMessage={error?.message}
                  //   onChange={(data) => {
                  //     onChange(data);
                  //   }}
                  //   {...props}
                  //   required
                  // />

                  <DateTimePicker
                    value={dayjs(value)}
                    label=""
                    onChange={(data) => {
                      onChange(data);
                    }}
                    {...props}
                  />
                )}
              />
            </Grid.Item>
          </Grid.Wrap>
          <Typography variant="h5" mt={5}>
            Problem Set
          </Typography>
          <Table2<ContestProblem>
            columns={columns}
            data={problemSet}
            onAction={handleGetProblems}
            enableTopToolbar={true}
            recordName="items"
            enablePagination={false}
            singularRecordName="item"
            enableDensityToggle={false}
            enableColumnOrdering={false}
            enableRowActions
            paginationDisplayMode="pages"
            isColumnPinning={false}
            nameColumnPinning="actions"
            state={{
              isLoading: isFetching,
            }}
            renderTopToolbarCustomActions={() => (
              <Stack direction="row" spacing={1} my={0.5} width="100%">
                <Grid.Wrap>
                  <Grid.Item xs={8}>
                    <ViewItem
                      label="Pick a problem"
                      value={
                        <MuiSelect
                          style={{ minWidth: "520px" }}
                          size="medium"
                          options={problemOptions}
                          value={problemIdToAdd}
                          onChange={(_, value) => {
                            setProblemIdToAdd(value);
                          }}
                        />
                      }
                    />
                  </Grid.Item>
                  <Grid.Item xs={4}>
                    <ViewItem
                      label="Set a score"
                      value={
                        <MuiInput
                          type="number"
                          size="medium"
                          value={problemScoreToAdd}
                          onChange={(value) => {
                            setProblemScoreToAdd(+value.target.value);
                          }}
                        />
                      }
                    />
                  </Grid.Item>
                </Grid.Wrap>
                <Stack justifyContent="flex-end">
                  <Button onClick={handleSetProblemSet}>Add</Button>
                </Stack>
              </Stack>
            )}
            renderToolbarInternalActions={() => {
              return <></>;
            }}
            renderFallbackValue={<EmptyTable />}
            muiTopToolbarProps={{
              sx: {
                backgroundColor: "transparent",
                mx: "-8px",
                my: "4px",
                fontFamily: "Roboto",
              },
            }}
          />
          <Typography variant="h5" mt={5}>
            Problem Set
          </Typography>
          <Table2<ContestProblem>
            columns={columns}
            data={problemSet}
            onAction={handleGetProblems}
            enableTopToolbar={true}
            recordName="items"
            enablePagination={false}
            singularRecordName="item"
            enableDensityToggle={false}
            enableColumnOrdering={false}
            enableRowActions
            paginationDisplayMode="pages"
            isColumnPinning={false}
            nameColumnPinning="actions"
            state={{
              isLoading: isFetching,
            }}
            renderTopToolbarCustomActions={() => (
              <Stack direction="row" spacing={1} my={0.5} width="100%">
                <Grid.Wrap>
                  <Grid.Item xs={8}>
                    <ViewItem
                      label="Pick a problem"
                      value={
                        <MuiSelect
                          style={{ minWidth: "520px" }}
                          size="medium"
                          options={problemOptions}
                          value={problemIdToAdd}
                          onChange={(_, value) => {
                            setProblemIdToAdd(value);
                          }}
                        />
                      }
                    />
                  </Grid.Item>
                  <Grid.Item xs={4}>
                    <ViewItem
                      label="Set a score"
                      value={
                        <MuiInput
                          type="number"
                          size="medium"
                          value={problemScoreToAdd}
                          onChange={(value) => {
                            setProblemScoreToAdd(+value.target.value);
                          }}
                        />
                      }
                    />
                  </Grid.Item>
                </Grid.Wrap>
                <Stack justifyContent="flex-end">
                  <Button onClick={handleSetProblemSet}>Add</Button>
                </Stack>
              </Stack>
            )}
            renderToolbarInternalActions={() => {
              return <></>;
            }}
            renderFallbackValue={<EmptyTable />}
            muiTopToolbarProps={{
              sx: {
                backgroundColor: "transparent",
                mx: "-8px",
                my: "4px",
                fontFamily: "Roboto",
              },
            }}
          />
          <Stack direction="row" justifyContent="flex-end" mt={4}>
            <Button type="submit" label={"Save"} isLoading={isPending} />
          </Stack>
        </Form>
      </Card>
    </Container>
  );
};

export default ContestForm;
