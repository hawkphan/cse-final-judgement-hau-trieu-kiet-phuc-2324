/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";

import { MRT_TableInstance } from "material-react-table";
import { Button, COLOR_CODE, Typo } from "../../..";

export default function CustomTableColumnOptionsModal<T>({ table }: Props<T>) {
  const allDataColumns = table
    .getAllLeafColumns()
    .filter((column) => column.columnDef.header);

  const removedColumnHeaders = ["Select", "Expand"];

  const totalCheckedColumns = allDataColumns.reduce(
    (totalCheck, column) => totalCheck + (column.getIsVisible() ? 1 : 0),
    0
  );

  return (
    <Container maxWidth="xs" sx={{ py: "16px", pb: "24px" }}>
      <Stack
        direction="row"
        alignItems="flex-end"
        mb={2}
        justifyContent="space-between"
      >
        <Typo variant="h4" mr={3} color={COLOR_CODE.GREY_900}>
          Column Options
        </Typo>
        <Button
          variant="link-primary"
          onClick={(e) => {
            if (table.getIsAllColumnsVisible()) {
              return;
            }
            table.getToggleAllColumnsVisibilityHandler()(e);
          }}
          style={{ fontSize: 14, height: "100%" }}
        >
          {"Show All"}
        </Button>
      </Stack>
      <Stack>
        <FormGroup>
          {allDataColumns.map(
            (column) =>
              !removedColumnHeaders.includes(column.columnDef.header) && (
                <FormControlLabel
                  key={column.id}
                  control={
                    <Checkbox
                      checked={column.getIsVisible()}
                      disabled={
                        column.getIsVisible() && totalCheckedColumns === 1
                      }
                      onChange={column.getToggleVisibilityHandler()}
                    />
                  }
                  label={column.columnDef.header}
                />
              )
          )}
        </FormGroup>
      </Stack>
    </Container>
  );
}

type Props<T> = {
  table: MRT_TableInstance<T>;
  handleClosePopup?: (..._args: any[]) => void;
};
