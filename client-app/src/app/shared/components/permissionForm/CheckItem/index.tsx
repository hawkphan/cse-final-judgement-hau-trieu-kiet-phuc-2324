/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@mui/material";
import cn from "classnames";
import React, { HTMLProps, useRef } from "react";
import "./styles.scss";
import { getRandomId } from "../../..";

const CheckItem: React.FC<CheckboxProps> = ({
  disabled,
  style,
  isTentative,
  handleClickCheck,
  title,
  ...props
}) => {
  const id = useRef(getRandomId());
  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const { checked, name, value } = e.currentTarget;
    handleClickCheck(name, +value, checked);
  };

  return (
    <Stack
      className={cn(
        "cmp-checkbox-item",
        { "cmp-checkbox-item__disabled": disabled },
        { "cmp-checkbox-item__tentative": isTentative }
      )}
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction="row" style={style}>
        <input
          id={id.current}
          type="checkbox"
          className={cn("cmp-checkbox-item__input")}
          style={{ appearance: "checkbox" }}
          onClick={handleClick}
          onChange={() => {}}
          {...props}
        />
        <label
          className={cn({
            "cmp-checkbox-item__label--disabled": disabled,
          })}
          htmlFor={id.current}
          title={title as string}
        >
          {null}
        </label>
      </Stack>
    </Stack>
  );
};

type BaseInputProps = Pick<
  HTMLProps<HTMLInputElement>,
  Exclude<keyof HTMLProps<HTMLInputElement>, "label">
>;
type CheckboxProps = BaseInputProps & {
  isTentative?: boolean;
  handleClickCheck?: (..._args: any[]) => void;
};

export default CheckItem;
