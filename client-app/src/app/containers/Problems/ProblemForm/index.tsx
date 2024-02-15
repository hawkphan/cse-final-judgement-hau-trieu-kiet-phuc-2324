/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumbs,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import {
  Button,
  COLOR_CODE,
  Form,
  Grid,
  MuiInput,
  TextArea,
} from "../../../shared";
import { MuiFileInput } from "mui-file-input";
import { Controller, useForm } from "react-hook-form";
import { Problem } from "../../../queries/Problems/types";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../../configs/paths";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { acceptedFileType } from "./helpers";
import BasicFileUpload from "../../../shared/components/common/BasicFileUpload";

const ProblemForm = () => {
  const { id } = useParams();

  const isEdit = !id && id !== "";

  const [file, setFile] = useState<File | null>(null)

  const handleChange = (newValue: File | null) => {
    setFile(newValue);
  }

  const onSubmit = (data: Problem) => {
    setValue("testCasesFiles", file);

    console.log("formSubmit", JSON.stringify(data));
  };

  const { control, setValue, handleSubmit } = useForm<Problem>({
    defaultValues: {},
    mode: "onChange",
  });

  const [description, setDescription] = useState("");

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
        {!isEdit ? (
          <Typography color="text.primary">Edit</Typography>
        ) : (
          <Typography color="text.primary">Create</Typography>
        )}

        {!isEdit ? <Typography color="text.primary">{id}</Typography> : ""}
      </Breadcrumbs>
      <Card sx={{ padding: "10px", marginTop: "10px" }}>
        <Typography variant="h4" mb={5} mt={2}>
          {isEdit ? "Create New Problem" : "Edit Problem"}
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid.Wrap>
            <Grid.Item xs={4}>
              <Controller
                name={"code"}
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
                name={"title"}
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
                name={"userId"}
                control={control}
                render={({
                  field: { onChange, value, ...props },
                  fieldState: { error },
                }) => (
                  <MuiInput
                    label="Author"
                    placeholder="Author"
                    onChange={(data) => {
                      onChange(data);
                    }}
                    value={value}
                    errorMessage={error?.message}
                    {...props}
                    required
                  />
                )}
              />
            </Grid.Item>
            <Grid.Item xs={6}>
              <Controller
                name={"description"}
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
                    style={{ maxWidth: "95%", overflow: "hidden" }}
                    {...props}
                  />
                )}
              />
            </Grid.Item>
            <Grid.Item xs={6}>
              <Typography fontSize={14}>Preview</Typography>
              <Card sx={{ padding: "10px" }}>
                <ReactMarkdown
                  remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                >
                  {description}
                </ReactMarkdown>
              </Card>
            </Grid.Item>
          </Grid.Wrap>
          <Grid.Wrap>
            <Grid.Item xs={12}>
              <BasicFileUpload />
              {/* <MuiFileInput
                value={file}
                onChange={handleChange}
                size="small"
                variant="outlined"
                
                InputProps={{
                  inputProps: {
                    accept: "application/zip",
                  },
       
                }}
              /> */}
              {/* <FileUpload
                onChange={(value: any) => setFiles([...value])}
                numberAllow={1}
                acceptFileType={acceptedFileType}
                message="Upload your test cases"
                errorMessage={""}
              /> */}
            </Grid.Item>
          </Grid.Wrap>
          <Stack direction="row" justifyContent="flex-end" mt={4}>
            <Button
              label="Cancel"
              type="button"
              variant="grey"
              className="mr-16"
              onClick={() => {}}
            />
            <Button type="submit" label={"Create"} isLoading={false} />
          </Stack>
        </Form>
      </Card>
    </Container>
  );
};

export default ProblemForm;
