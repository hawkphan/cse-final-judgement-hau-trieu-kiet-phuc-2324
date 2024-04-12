/* eslint-disable @typescript-eslint/no-explicit-any */

import { IconButton, Stack, Tooltip } from "@mui/material";

import { MaterialSymbol } from "react-material-symbols";
import { COLOR_CODE } from "../..";

const RowActions: React.FC<Props> = ({
  DetailFunction,
  DeleteFunction,
  CreateFunction,
  EditFunction,
  ReverseFunction,
  EnterFunction,
  hideDetail = true,
  hideCreate = true,
  hideEdit = true,
  hideDelete = true,
  hideReverse = true,
  hideEnter = true,
  disableDetail = false,
  disableCreate = false,
  disableEdit = false,
  disableDelete = false,
  disableReverse = false,
  disableEnter = false,
  titleDetail = "Detail",
  titleCreate = "Create",
  titleEdit = "Edit",
  titleDelete = "Delete",
  titleReverse = "Reverse",
  titleEnter = "Enter",
}) => {
  return (
    <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
      {!hideDetail && (
        <Tooltip title={titleDetail} arrow placement="top">
          <IconButton
            disableRipple={disableDetail}
            onClick={(event) => {
              event.stopPropagation();
              !disableDetail && DetailFunction();
            }}
            sx={{
              "&:hover": !disableDetail && {
                bgcolor: COLOR_CODE.WHITE,
                boxShadow:
                  "0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
              },
              p: "4px",
            }}
          >
            <MaterialSymbol
              icon="list"
              size={20}
              color={
                disableDetail ? COLOR_CODE.GREY_500 : COLOR_CODE.PRIMARY_400
              }
            />
          </IconButton>
        </Tooltip>
      )}
      {!hideCreate && (
        <Tooltip title={titleCreate} arrow placement="top">
          <IconButton
            disableRipple={disableCreate}
            onClick={(event) => {
              event.stopPropagation();
              !disableCreate && CreateFunction();
            }}
            sx={{
              "&:hover": !disableCreate && {
                bgcolor: COLOR_CODE.WHITE,
                boxShadow:
                  "0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
              },
              p: "4px",
            }}
          >
            <MaterialSymbol
              icon="add_circle"
              size={20}
              color={
                disableCreate ? COLOR_CODE.GREY_500 : COLOR_CODE.PRIMARY_400
              }
            />
          </IconButton>
        </Tooltip>
      )}
      {!hideEdit && (
        <Tooltip title={titleEdit} arrow placement="top">
          <IconButton
            disableRipple={disableEdit}
            onClick={(event) => {
              event.stopPropagation();
              !disableEdit && EditFunction();
            }}
            sx={{
              "&:hover": !disableEdit && {
                bgcolor: COLOR_CODE.WHITE,
                boxShadow:
                  "0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
              },
              p: "4px",
            }}
          >
            <MaterialSymbol
              icon="edit_square"
              size={20}
              color={disableEdit ? COLOR_CODE.GREY_500 : COLOR_CODE.PRIMARY_400}
            />
          </IconButton>
        </Tooltip>
      )}
      {!hideDelete && (
        <Tooltip title={titleDelete} arrow placement="top">
          <IconButton
            disableRipple={disableDelete}
            onClick={(event) => {
              event.stopPropagation();
              !disableDelete && DeleteFunction();
            }}
            sx={{
              "&:hover": !disableDelete && {
                bgcolor: COLOR_CODE.WHITE,
                boxShadow:
                  "0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
              },
              p: "4px",
            }}
          >
            <MaterialSymbol
              icon="delete"
              size={20}
              color={disableDelete ? COLOR_CODE.GREY_500 : COLOR_CODE.DANGER}
            />
          </IconButton>
        </Tooltip>
      )}
      {!hideReverse && (
        <Tooltip title={titleReverse} arrow placement="top">
          <IconButton
            disabled={disableDelete}
            onClick={(event) => {
              event.stopPropagation();
              ReverseFunction();
            }}
            sx={{
              "&:hover": {
                bgcolor: COLOR_CODE.WHITE,
                boxShadow:
                  "0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
              },
              p: "4px",
            }}
          >
            <MaterialSymbol
              icon="autorenew"
              size={20}
              color={disableReverse ? COLOR_CODE.GREY_500 : COLOR_CODE.PRIMARY}
            />
          </IconButton>
        </Tooltip>
      )}
      {!hideEnter && (
        <Tooltip title={titleEnter} arrow placement="top">
          <IconButton
            disableRipple={disableEnter}
            onClick={(event) => {
              event.stopPropagation();
              EnterFunction();
            }}
            sx={{
              "&:hover": !disableEnter && {
                bgcolor: COLOR_CODE.WHITE,
                boxShadow:
                  "0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
              },
              p: "4px",
            }}
          >
            <MaterialSymbol
              icon="keyboard_return"
              size={20}
              color={
                disableEnter ? COLOR_CODE.GREY_500 : COLOR_CODE.PRIMARY_400
              }
            />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

type Props = {
  DetailFunction?: (..._args: any[]) => void;
  DeleteFunction?: (..._args: any[]) => void;
  CreateFunction?: (..._args: any[]) => void;
  EditFunction?: (..._args: any[]) => void;
  ReverseFunction?: (..._args: any[]) => void;
  EnterFunction?: (..._args: any[]) => void;
  hideDetail?: boolean;
  hideCreate?: boolean;
  hideEdit?: boolean;
  hideDelete?: boolean;
  hideReverse?: boolean;
  hideEnter?: boolean; // New prop for hiding Enter button
  disableDetail?: boolean;
  disableCreate?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
  disableReverse?: boolean;
  disableEnter?: boolean;
  titleDetail?: string;
  titleCreate?: string;
  titleEdit?: string;
  titleDelete?: string;
  titleReverse?: string;
  titleEnter?: string;
};

export default RowActions;
