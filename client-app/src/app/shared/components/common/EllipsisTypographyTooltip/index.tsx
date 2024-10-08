import { SxProps, Tooltip, TypographyProps } from "@mui/material";
import { Typo } from "../../..";

const EllipsisTypographyTooltip: React.FC<Props> = ({
  lengthShowTooltip = 10,
  hideTooltip,
  children,
  placement = "bottom",
  tooltipSx,
  ...props
}) => {
  return (
    <Tooltip
      title={children}
      enterDelay={500}
      disableHoverListener={
        hideTooltip ||
        !children ||
        children.toString().length < lengthShowTooltip
      }
      placement={placement}
      sx={tooltipSx}
    >
      <Typo
        noWrap
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
        }}
        {...props}
      >
        {children}
      </Typo>
    </Tooltip>
  );
};

type Props = TypographyProps & {
  lengthShowTooltip?: number;
  tooltipSx?: SxProps;
  hideTooltip?: boolean;
  placement?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start";
};

export default EllipsisTypographyTooltip;
