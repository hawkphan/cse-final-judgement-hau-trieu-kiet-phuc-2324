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
  ContestMember,
  ContestProblem,
  CreateContestBody,
  useCreateContest,
  useGetContests,
  useGetProblems,
  useGetProfiles,
} from "../../../../queries";
import WYSIWYGEditor from "../../../../shared/components/common/RichTextEditor";
import { stripHtml } from "string-strip-html";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { allColumns } from "./allColumns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PATHS } from "../../../../configs/paths";
import {
  ContestProperties,
  CreateContestFormSchema,
  EditContestFormSchema,
  contestRuleOptions,
  contestTypeOptions,
  toBreadCrumbs,
} from "./helpers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { allColumnsMember } from "./allColumnsMember";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStore } from "../../../../shared/common/stores/store";

const ContestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = id && id !== "";

  const [problemIdToAdd, setProblemIdToAdd] = useState<string>();
  const [problemScoreToAdd, setProblemScoreToAdd] = useState<number>();
  const [problemSet, setProblemSet] = useState<ContestProblem[]>([]);

  const [userIdToAdd, setUserIdToAdd] = useState<string>();
  const [userRoleToAdd, setUserRoleToAdd] = useState<number>();
  const [userSet, setUserSet] = useState<ContestMember[]>([]);

  const { userStore } = useStore();
  const {
    isFetching,
    selectOptions: problemOptions,
    setParams: setProblemsParams,
  } = useGetProblems();
  const {
    setParams: setProfilesParams,
    selectOptions: profileOptions,
    isFetching: isProfilesFetching,
  } = useGetProfiles();
  const { handleInvalidateContests } = useGetContests();
  const { isPending, onCreateContest } = useCreateContest({
    onSuccess: () => {
      Toastify.success("Successful!");
      navigate(PATHS.contestManagement);
      handleInvalidateContests();
    },
    onError: (error) => {
      Toastify.error(error.message);
      console.log("Error", error);
    },
  });

  const { control, handleSubmit, setValue, watch } = useForm<CreateContestBody>(
    {
      defaultValues: { startTime: null, endTime: null },
      mode: "onChange",
      shouldFocusError: true,
      reValidateMode: "onChange",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: yupResolver<any>(
        isEdit ? EditContestFormSchema : CreateContestFormSchema
      ),
    }
  );

  const startTime = watch(ContestProperties.START_TIME);

  const onSubmit = useCallback(
    (data: CreateContestBody) => {
      data = { ...data, problems: problemSet, members: userSet };
      onCreateContest(data);
    },
    [onCreateContest, problemSet, userSet]
  );

  const handleSetProblemSet = () => {
    const existingProblem = problemSet?.filter(
      (item) => item?.problemId?.toLowerCase() === problemIdToAdd?.toLowerCase()
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

  const handleSetUserSet = () => {
    const existingUser = userSet?.filter(
      (item) => item?.userId?.toLowerCase() === userIdToAdd?.toLowerCase()
    );
    if (
      isEmpty(userIdToAdd) ||
      ![0, 1].includes(userRoleToAdd) ||
      !isEmpty(existingUser)
    ) {
      Toastify.error("Cannot add this user with role!");
      return;
    }

    setUserSet([...userSet, { userId: userIdToAdd, role: userRoleToAdd }]);
    setUserIdToAdd("");
  };

  const handleDeleteProblemRow = useCallback(
    (value: string) => {
      setProblemSet([...problemSet.filter((item) => item.problemId !== value)]);
    },
    [problemSet]
  );

  const handleDeleteUserRow = useCallback(
    (value: string) => {
      setUserSet([...userSet.filter((item) => item.userId !== value)]);
    },
    [userSet]
  );

  const breadCrumbsItems = useMemo(
    () => toBreadCrumbs(isEdit, id),
    [id, isEdit]
  );

  const columns = useMemo(
    () => allColumns({ problemOptions, handleDeleteProblemRow }),
    [problemOptions, handleDeleteProblemRow]
  );

  const columnsMember = useMemo(
    () =>
      allColumnsMember({
        profileOptions,
        handleDeleteUserRow,
        userId: userStore?.user?.id,
      }),
    [profileOptions, handleDeleteUserRow, userStore?.user?.id]
  );

  useEffect(() => {
    setProfilesParams({ pageSize: -1 });
    setProblemsParams({ pageSize: -1 });

    if (!isEdit) {
      setUserSet([{ userId: userStore?.user?.id, role: 0 }]);
    }
  }, [isEdit, setProblemsParams, setProfilesParams, userStore?.user?.id]);

  if (isFetching || isProfilesFetching) {
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
                name={ContestProperties.NAME}
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
                name={ContestProperties.DESCRIPTION}
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
            <Grid.Item xs={3}>
              <Controller
                name={ContestProperties.TYPE}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    label="Type"
                    options={contestTypeOptions}
                    value={field.value}
                    onChange={(_, value) => {
                      field.onChange(value);
                    }}
                    size="small"
                    required
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
            </Grid.Item>
            <Grid.Item xs={3}>
              <Controller
                name={ContestProperties.RULE}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    label="Rule"
                    options={contestRuleOptions}
                    size="small"
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
              <InputLabel sx={{ fontSize: "14px" }}>Start Time</InputLabel>
              <Controller
                name={ContestProperties.START_TIME}
                control={control}
                render={({
                  field: { value, onChange, ...props },
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  fieldState: { error },
                }) => (
                  <DateTimePicker
                    value={dayjs(value)}
                    label=""
                    minDateTime={dayjs(new Date().toISOString())}
                    onChange={(data) => {
                      onChange(data);
                      setValue(
                        ContestProperties.END_TIME,
                        dayjs(data).toISOString()
                      );
                    }}
                    {...props}
                  />
                )}
              />
            </Grid.Item>
          </Grid.Wrap>
          <Grid.Wrap style={{ marginBottom: "10px" }}>
            <Grid.Item xs={6}>
              <InputLabel sx={{ fontSize: "14px" }}>End Time</InputLabel>
              <Controller
                name={ContestProperties.END_TIME}
                control={control}
                render={({
                  field: { value, onChange, ...props },
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  fieldState: { error },
                }) => (
                  <DateTimePicker
                    value={dayjs(value)}
                    label=""
                    minDateTime={dayjs(startTime)}
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
            Participants
          </Typography>
          <Table2<ContestMember>
            columns={columnsMember}
            data={userSet}
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
            renderTopToolbarCustomActions={() => (
              <Stack direction="row" spacing={1} my={0.5} width="100%">
                <Grid.Wrap>
                  <Grid.Item xs={8}>
                    <ViewItem
                      label="Pick a user"
                      value={
                        <MuiSelect
                          style={{ minWidth: "520px" }}
                          size="medium"
                          options={profileOptions}
                          value={userIdToAdd}
                          onChange={(_, value) => {
                            setUserIdToAdd(value);
                          }}
                        />
                      }
                    />
                  </Grid.Item>
                  <Grid.Item xs={4}>
                    <ViewItem
                      label="Set role"
                      value={
                        <MuiSelect
                          label=""
                          options={[
                            { label: "Admin", value: "0" },
                            { label: "Contestant", value: "1" },
                          ]}
                          value={userRoleToAdd + ""}
                          onChange={(_, value) => {
                            setUserRoleToAdd(+value);
                          }}
                        />
                      }
                    />
                  </Grid.Item>
                </Grid.Wrap>
                <Stack justifyContent="flex-end">
                  <Button onClick={handleSetUserSet}>Add</Button>
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
