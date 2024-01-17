import cn from "classnames";
import React from "react";
import { Tooltip } from "@mui/material";
import { IoInformationCircle } from "react-icons/io5";
import Typo from "../Typo";
import View, { ViewProps } from "../View";
import "./styles.scss";
import { COLOR_CODE, isEmpty } from "../../..";

export const ElementLabel: React.FC<LabelProps> = ({
  infoToolTipWithArrow,
  infoTooltipMessage,
  infoTooltipPlacement,
  label,
  required,
}) => {
  return (
    <Typo
      variant="body1"
      sx={{
        height: 20,
        marginBottom: 1,
        fontWeight: 500,
        fontSize: 14,
        color: COLOR_CODE.LABEL,
      }}
    >
      {label}{" "}
      {required && (
        <span className="has-text-danger fw-bold text-is-16">*</span>
      )}
      {infoTooltipMessage && (
        <span>
          <Tooltip
            arrow={infoToolTipWithArrow}
            title={
              <span style={{ whiteSpace: "pre-line" }}>
                {infoTooltipMessage}
              </span>
            }
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
    </Typo>
  );
};

const Element: React.FC<Props> = ({
  children,
  errorMessage,
  label,
  className,
  subLabel,
  required,
  infoTooltipMessage = "",
  infoTooltipPlacement = "right",
  infoToolTipWithArrow = true,
  ...props
}) => {
  const hasError = !isEmpty(errorMessage);
  const hasLabel = !isEmpty(label);
  const hasSubLabel = !isEmpty(subLabel);
  return (
    <View className={cn(className, "form-element")} {...props}>
      {hasLabel && (
        <ElementLabel
          {...{
            label: label,
            infoTooltipMessage: infoTooltipMessage as string,
            infoTooltipPlacement,
            infoToolTipWithArrow,
            required,
          }}
        />
      )}

      {hasSubLabel && <>{subLabel}</>}
      {children}
      {hasError && (
        <Typo
          variant="subtitle1"
          color="error"
          classes={{
            root: "mt-1",
          }}
        >
          {errorMessage}
        </Typo>
      )}
    </View>
  );
};

type LabelProps = {
  label?: React.ReactNode;
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

type Props = ViewProps &
  LabelProps & {
    children: React.ReactNode;
    id?: string;
    errorMessage?: string;
    className?: string;
    subLabel?: React.ReactNode;
  };

export default Element;
