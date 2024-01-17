/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-console */

import { FC, ReactNode } from "react";
import { AiFillWarning } from "react-icons/ai";
import {
  IoCheckmarkCircleSharp,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { ToastOptions, toast } from "react-toastify";
import { COLOR_CODE } from "..";

const error = (
  error?: string,
  options: ToastOptions = {
    icon: <MdOutlineErrorOutline color={COLOR_CODE.DANGER} fontSize={24} />,
  }
) => {
  console.log("errorHandler", error);
  toast.error(
    <Message
      msg={
        error || "An error has occurred. Please check your data and try again."
      }
    />,
    options
  );
};

const success = (
  message: string,
  options: ToastOptions = {
    icon: <IoCheckmarkCircleSharp color={COLOR_CODE.PRIMARY} fontSize={24} />,
  }
) => {
  toast.success(<Message msg={message} />, options);
};

const warning = (
  message: string,
  options: ToastOptions = {
    icon: <AiFillWarning color={COLOR_CODE.WARNING} fontSize={24} />,
  }
) => {
  console.log("warningHandler", message);
  toast.warning(<Message msg={message} />, options);
};
const info = (
  message: string,
  options: ToastOptions = {
    icon: <IoInformationCircleOutline color={COLOR_CODE.INFO} fontSize={24} />,
  }
) => {
  toast.info(<Message msg={message} />, { ...options });
};

const Message: FC<{ msg: string | ReactNode }> = ({ msg }) => {
  return <span>{msg}</span>;
};

export default {
  error,
  success,
  warning,
  info,
};
