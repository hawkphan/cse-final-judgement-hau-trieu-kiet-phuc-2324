/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { KeyboardEvent } from "react";

const Form: React.FC<Props> = ({
  children,
  preventDefault = false,
  customSubmit,
  ...props
}) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (preventDefault && event.key === "Enter") {
      customSubmit && customSubmit();

      event.preventDefault();
    }
  };

  return (
    <form onKeyDown={handleKeyDown} {...props}>
      {children}
    </form>
  );
};

type Props = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  preventDefault?: boolean;
  customSubmit?: (..._args: any[]) => void;
};

export default Form;
