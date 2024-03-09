import { Container, Stack, Typography } from "@mui/material";
import { SelectOption } from "../../../../shared/components/common/MuiAutoComplete";
import { useSearchParams } from "react-router-dom";
import { ProblemFilterQueryKey } from "../../helpers";
import { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import {
  Button,
  COLOR_CODE,
  Grid,
  MuiDatePicker,
  MuiMultiSelect,
} from "../../../../shared";


const ProblemFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const difficultyOptions: SelectOption[] = [
    { label: "New", value: "0" },
    { label: "Easy", value: "1" },
    { label: "Medium", value: "2" },
    { label: "Hard", value: "3" },
  ];

  const handleClearAll = () => {
    searchParams.delete(ProblemFilterQueryKey.FROM_DATE);
    searchParams.delete(ProblemFilterQueryKey.TO_DATE);
    searchParams.delete(ProblemFilterQueryKey.DIFFICULTY);
    setSearchParams(searchParams);
  };

  const handleChangeDifficulties = useCallback(
    (_name: string, difficulties: string[]) => {
      searchParams.delete(ProblemFilterQueryKey.DIFFICULTY);
      difficulties.forEach((item) =>
        searchParams.append(ProblemFilterQueryKey.DIFFICULTY, item)
      );

      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams]
  );

  const handleChangeFromDate = useCallback(
    (_name: Date) => {
      searchParams.delete(ProblemFilterQueryKey.FROM_DATE);
      searchParams.set(
        ProblemFilterQueryKey.FROM_DATE,
        _name.toLocaleDateString()
      );

      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams]
  );
  const handleChangeToDate = useCallback(
    (_name: Date) => {
      searchParams.delete(ProblemFilterQueryKey.TO_DATE);
      searchParams.set(
        ProblemFilterQueryKey.TO_DATE,
        _name.toLocaleDateString()
      );

      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams]
  );

  const selectedDifficulties = useMemo(() => {
    return searchParams.getAll(ProblemFilterQueryKey.DIFFICULTY) ?? [];
  }, [searchParams]);

  const selectedFromDate = useMemo(() => {
    return searchParams.get(ProblemFilterQueryKey.FROM_DATE) ?? "";
  }, [searchParams]);
  const selectedToDate = useMemo(() => {
    return searchParams.get(ProblemFilterQueryKey.TO_DATE) ?? "";
  }, [searchParams]);

  const difficultyQuery = searchParams.has(ProblemFilterQueryKey.DIFFICULTY);

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
            label="Difficulty"
            placeholder={!difficultyQuery && "All"}
            options={difficultyOptions}
            value={selectedDifficulties}
            onChange={handleChangeDifficulties}
            size="small"
          />
        </Grid.Item>
        <Grid.Item xs={12}>
          <MuiDatePicker
            label="Date after"
            onChange={handleChangeFromDate}
            value={dayjs(selectedFromDate)}
          />
        </Grid.Item>
        <Grid.Item xs={12}>
          <MuiDatePicker
            label="Date before"
            onChange={handleChangeToDate}
            value={dayjs(selectedToDate)}
          />
        </Grid.Item>
      </Grid.Wrap>
    </Container>
  );
};

export default ProblemFilter;
