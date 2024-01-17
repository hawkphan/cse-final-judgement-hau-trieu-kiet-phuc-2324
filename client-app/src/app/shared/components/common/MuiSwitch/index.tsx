/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack, Switch, SwitchProps, Typography } from "@mui/material";

import { InputLabel } from "../MuiInput";
import { COLOR_CODE, emptyFunction } from "../../..";

const MuiSwitch: React.FC<MuiSwitchProps> = ({
  infoTooltipMessage,
  infoTooltipPlacement,
  infoToolTipWithArrow,
  label,
  required,
  value,
  checked,
  name,
  isShowDescription = true,
  onChange = emptyFunction,
  ...props
}) => {
  return (
    <Stack>
      <InputLabel
        {...{
          infoTooltipMessage,
          infoTooltipPlacement,
          infoToolTipWithArrow,
          label,
          required,
        }}
      />
      <Stack direction="row" alignItems="center" gap={1} height="40px" mb="4px">
        <Switch
          checked={checked}
          onChange={onChange}
          name={name}
          {...props}
          sx={{
            width: 50,
            height: 26,
            padding: 0,
            "& .MuiSwitch-switchBase": {
              padding: 0,
              margin: "2px",
              transitionDuration: "300ms",
              "&.Mui-checked": {
                transform: "translateX(24px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                  backgroundColor: COLOR_CODE.PRIMARY,
                  opacity: 1,
                  border: 0,
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                  opacity: 0.5,
                },
              },
              "&.Mui-focusVisible .MuiSwitch-thumb": {
                color: "#33cf4d",
                border: "6px solid #fff",
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                color: COLOR_CODE.GREY_00,
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.7,
              },
            },
            "& .MuiSwitch-thumb": {
              boxSizing: "border-box",
              width: 22,
              height: 22,
            },
            "& .MuiSwitch-track": {
              borderRadius: 26 / 2,
              backgroundColor: "#E9E9EA",
              opacity: 1,
            },
          }}
        />
        {isShowDescription && (
          <Typography variant="body2" fontWeight={500} height={20}>
            {checked ? "Active" : "Inactive"}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export type MuiSwitchProps = Omit<SwitchProps, "onChange"> & {
  onChange?: (..._args: any[]) => void;
  containerClassName?: string;
  label?: string | React.ReactNode;
  isShowDescription?: boolean;
  required?: boolean;
  infoTooltipMessage?: string;
  infoTooltipPlacement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  infoToolTipWithArrow?: boolean;
};

export default MuiSwitch;
