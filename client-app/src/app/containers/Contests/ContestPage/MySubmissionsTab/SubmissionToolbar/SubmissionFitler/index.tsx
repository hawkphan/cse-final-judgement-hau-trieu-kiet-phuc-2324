import { Container, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import {
  Button,
  COLOR_CODE,
  Grid,
  MuiMultiSelect,
} from "../../../../../../shared";
import { SelectOption } from "../../../../../../shared/components/common/MuiAutoComplete";
import { SubmissionFilterQueryKey } from "./types";
import { Contest } from "../../../../../../queries";

interface Props {
  contest: Contest;
}

const SubmissionFilter = ({ contest }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const userOptions: SelectOption[] = contest?.members?.map((item) => ({
    label: item?.user?.displayName,
    value: item?.userId,
  }));

  const problemOptions: SelectOption[] = contest?.problems?.map((item) => ({
    label: `${item?.problem?.code} - ${item?.problem?.title}`,
    value: item?.problemId,
  }));

  const handleClearAll = () => {
    searchParams.delete(SubmissionFilterQueryKey.LANGUAGES);
    searchParams.delete(SubmissionFilterQueryKey.PROBLEMS);
    searchParams.delete(SubmissionFilterQueryKey.USERS);
    setSearchParams(searchParams);
  };

  const handleChangeUsers = useCallback(
    (_name: string, users: string[]) => {
      searchParams.delete(SubmissionFilterQueryKey.USERS);
      users.forEach((item) =>
        searchParams.append(SubmissionFilterQueryKey.USERS, item)
      );

      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams]
  );
  const handleChangeProblems = useCallback(
    (_name: string, problems: string[]) => {
      searchParams.delete(SubmissionFilterQueryKey.PROBLEMS);
      problems.forEach((item) =>
        searchParams.append(SubmissionFilterQueryKey.PROBLEMS, item)
      );
      console.log("problem", problems);
      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams]
  );

  const selectedUsers = useMemo(() => {
    return searchParams.getAll(SubmissionFilterQueryKey.USERS) ?? [];
  }, [searchParams]);
  const selectedProblems = useMemo(() => {
    return searchParams.getAll(SubmissionFilterQueryKey.PROBLEMS) ?? [];
  }, [searchParams]);

  const userQuery = searchParams.has(SubmissionFilterQueryKey.USERS);
  const problemQuery = searchParams.has(SubmissionFilterQueryKey.PROBLEMS);

  return (
    <Container maxWidth="xs" sx={{ p: 2, width: 360 }}>
      <Stack
        direction="row"
        alignItems="center"
        mb={2}
        justifyContent="space-between"
      >
        <Typography
          variant="h4"
          mr={3}
          color={COLOR_CODE.HEADER}
          fontWeight={600}
        >
          Filter
        </Typography>
        <Button
          type="button"
          variant="link-primary"
          onClick={handleClearAll}
          style={{ fontWeight: 500 }}
        >
          Clear All
        </Button>
      </Stack>

      <Grid.Wrap spacing={2}>
        <Grid.Item xs={12}>
          <MuiMultiSelect
            label="Members"
            placeholder={!userQuery && "All"}
            options={userOptions}
            value={selectedUsers}
            onChange={handleChangeUsers}
            size="small"
          />
        </Grid.Item>
        <Grid.Item xs={12}>
          <MuiMultiSelect
            label="Problems"
            placeholder={!problemQuery && "All"}
            options={problemOptions}
            value={selectedProblems}
            onChange={handleChangeProblems}
            size="small"
          />
        </Grid.Item>
      </Grid.Wrap>
    </Container>
  );
};

export default SubmissionFilter;
