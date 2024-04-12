import {
  Breadcrumbs,
  Button,
  CustomTableSearch,
  EmptyTable,
  Form,
  Grid,
  MuiDatePicker,
  MuiInput,
  Table2,
  Toastify,
} from "../../../../shared";
import { Card, Container, InputLabel, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  CreateContestBody,
  GetPropertiesParams,
  Problem,
  useCreateContest,
  useGetProblems,
} from "../../../../queries";
import WYSIWYGEditor from "../../../../shared/components/common/RichTextEditor";
import { stripHtml } from "string-strip-html";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { allColumns } from "./allColumns";
import { useCallback, useMemo, useState } from "react";
import { ProblemFilterQueryKey } from "../../../Problems/helpers";
import ProblemToolbar from "../../../Problems/ProblemToolbar";
import { PATHS } from "../../../../configs/paths";
import { MRT_RowSelectionState } from "material-react-table";
import { toBreadCrumbs } from "./helpers";
import BasicTimezoneProp from "./BasicTimeZoneProp";

const ContestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = id && id !== "";

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const { problems, totalRecords, setParams, isFetching } = useGetProblems();
  const { isPending, onCreateContest } = useCreateContest({
    onSuccess: () => {
      Toastify.success("Successful!");
      // handleInvalidateProblems();
      // handleInvalidateProblem();
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
      data.problemIds = Object.keys(rowSelection);
      onCreateContest(data);
    },
    [onCreateContest, rowSelection]
  );

  

  const handleGetProblems = useCallback(
    (params: GetPropertiesParams) => {
      setParams({ ...params });
    },
    [setParams]
  );

  const handleNavigateToDetail = (id: string) => {
    navigate(`${PATHS.problems}/${id}`);
  };

  const breadCrumbsItems = useMemo(
    () => toBreadCrumbs(isEdit, id),
    [id, isEdit]
  );

  const columns = useMemo(() => allColumns(), []);

    // if (isFetching) {
    //   return <LoadingCommon />;
    // }

  return (
    <Container maxWidth="xl" style={{ padding: "10px" }}>
      <Breadcrumbs items={breadCrumbsItems} />
      <Card sx={{ padding: "10px", marginTop: "10px" }}>
        <Typography variant="h5" mb={5} mt={2}>
          {isEdit ? "Edit Contest" : "Create New Contest"}
        </Typography>
       <BasicTimezoneProp />
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid.Wrap>
            <Grid.Item xs={4}>
              <Controller
                name={"title"}
                control={control}
                render={({
                  field: { value, onChange, ...props },
                  fieldState: { error },
                }) => (
                  <MuiInput
                    label="Title"
                    placeholder="Title"
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
              <Controller
                name={"startTime"}
                control={control}
                render={({
                  field: { value, onChange, ...props },
                  fieldState: { error },
                }) => (
                  <MuiDatePicker
                    label="Start Time"
                    value={dayjs(value)}
                    errorMessage={error?.message}
                    onChange={(data) => {
                      onChange(data);
                    }}
                    {...props}
                    required
                  />
                )}
              />
            </Grid.Item>
          </Grid.Wrap>
          <Grid.Wrap style={{ marginBottom: "10px" }}>
            <Grid.Item xs={6}>
              <Controller
                name={"endTime"}
                control={control}
                render={({
                  field: { value, onChange, ...props },
                  fieldState: { error },
                }) => (
                  <MuiDatePicker
                    label="End Time"
                    value={dayjs(value)}
                    errorMessage={error?.message}
                    onChange={(data) => {
                      onChange(data);
                    }}
                    {...props}
                    required
                  />
                )}
              />
            </Grid.Item>
          </Grid.Wrap>
          <Typography variant="h5" mt={5}>
            Problem Set
          </Typography>
          <Table2<Problem>
            rowCount={totalRecords}
            columns={columns}
            data={problems}
            onAction={handleGetProblems}
            enableTopToolbar={true}
            recordName="items"
            enableRowSelection={true}
            getRowId={(originalRow) => originalRow.id}
            onRowSelectionChange={setRowSelection}
            singularRecordName="item"
            enableDensityToggle={false}
            enableColumnOrdering={false}
            enableRowActions
            paginationDisplayMode="pages"
            isColumnPinning={false}
            nameColumnPinning="actions"
            state={{
              isLoading: isFetching,
              rowSelection,
            }}
            additionalFilterParams={[
              ProblemFilterQueryKey.FROM_DATE,
              ProblemFilterQueryKey.TO_DATE,
              ProblemFilterQueryKey.DIFFICULTY,
              ProblemFilterQueryKey.KEYWORDS,
            ]}
            muiTableBodyRowProps={({ row }) => ({
              onClick: () => {
                handleNavigateToDetail(row.original.id);
              },
            })}
            renderTopToolbarCustomActions={() => (
              <Stack direction="row" spacing={1} my={0.5}>
                <Stack width="328px">
                  <CustomTableSearch
                    placeholder="Search by Title"
                    searchKey="keywords"
                  />
                </Stack>
              </Stack>
            )}
            renderToolbarInternalActions={({ table }) => {
              return <ProblemToolbar table={table} isExternal />;
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
