import cn from "classnames";
import React from "react";

import { GridProps, Stack, Tooltip } from "@mui/material";
import { IoInformationCircle } from "react-icons/io5";
import { Grid } from "..";
import "./styles.scss";
import { COLOR_CODE, isEmpty } from "../../..";

const ViewItem: React.FC<Props> = ({
  label,
  value,
  xs = 6,
  infoTooltipMessage = "",
  infoTooltipPlacement = "right",
  infoToolTipWithArrow = true,
  isRow = false,
  renderIf = true,
  classNameValue,
  ...props
}) => {
  const isEmptyLine = isEmpty(label) && isEmpty(value);

  if (!renderIf) return null;
  if (isEmptyLine) return <Grid.Item xs={xs} />;

  return (
    <Grid.Item
      xs={xs}
      className={cn("cmp-view-item column", { "cmp-view-item--row": isRow })}
      {...props}
    >
      <Stack
        direction="row"
        alignItems="center"
        className="cmp-view-item__label"
      >
        {label}
        {infoTooltipMessage && (
          <span>
            <Tooltip
              arrow={infoToolTipWithArrow}
              title={infoTooltipMessage}
              placement={infoTooltipPlacement}
            >
              <i className="cursor-pointer ml-1">
                <IoInformationCircle
                  size={16}
                  color={COLOR_CODE.INFO}
                  style={{
                    transform: "translateY(2px)",
                  }}
                />
              </i>
            </Tooltip>
          </span>
        )}
      </Stack>
      <Stack className={cn("cmp-view-item__value", classNameValue)}>
        {value ? value : "--"}
      </Stack>
    </Grid.Item>
  );
};

type Props = GridProps & {
  label?: string | React.ReactElement;
  value?: string | boolean | number | React.ReactElement;
  xs?: number;
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
  isRow?: boolean;
  renderIf?: boolean;
  classNameValue?: string;
};

export default ViewItem;
