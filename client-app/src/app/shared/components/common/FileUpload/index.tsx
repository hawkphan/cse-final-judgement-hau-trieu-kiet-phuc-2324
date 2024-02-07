/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from "classnames";
import React from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";

import { IconButton, Stack } from "@mui/material";
import { Trans } from "react-i18next";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "../Button";
import Typo from "../Typo";
import View from "../View";
import { getFilesInfo } from "./helpers";
import "./styles.scss";
import { COLOR_CODE, COMMON_TYPE, Toastify } from "../../..";

const DEFAULT_MESSAGE = (
  <Trans i18nKey="default_message_file_upload">
    Drag and Drop your files here or
    <span
      style={{
        color: COLOR_CODE.PRIMARY_400,
      }}
    >
      Browse files
    </span>
  </Trans>
);

const FileUpload = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      onChange,
      numberAllow = null,
      onError,
      acceptFileType,
      message = DEFAULT_MESSAGE,
      errorMessage = "",
    },
    innerRef
  ) => {
    const [myFiles, setMyFiles] = React.useState<File[]>([]);
    const [rejectFiles, setRejectFiles] = React.useState<FileRejection[]>([]);
    const [isFileSelected, setIsFileSelected] = React.useState<boolean>(false);

    const hasError = !!errorMessage;
    const MAXIMUM_FILE_SIZE = 1024 * 1024 * 50;
    const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setMyFiles(acceptedFiles);
      setRejectFiles(fileRejections);
      setIsFileSelected(true);
    };

    const handleChange = (files: File[]) => {
      const formattedFilesInfo = getFilesInfo(files);
      onChange(formattedFilesInfo);
    };

    // List MIME can be found here:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: acceptFileType || COMMON_TYPE,
      maxSize: MAXIMUM_FILE_SIZE,
    });

    React.useEffect(() => {
      if (rejectFiles.length > 0) {
        rejectFiles.forEach((file) => {
          const error = file.errors[0];
          Toastify.error(error.message);
        });
      }
      if (rejectFiles.length > 0) {
        if (rejectFiles[0]?.file?.size > MAXIMUM_FILE_SIZE) {
          onError("Your file size is greater than 50MB. Please try again.");
        }
      }
    }, [MAXIMUM_FILE_SIZE, onError, rejectFiles]);

    React.useEffect(() => {
      if (!!numberAllow && myFiles.length > numberAllow) {
        return Toastify.error(`Can not upload more than ${numberAllow} files`);
      }
      if (myFiles.length > 0) handleChange(myFiles);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myFiles, numberAllow]);

    const handleFileDelete = (fileIndex: number) => {
      const updatedFiles = [...myFiles];
      updatedFiles.splice(fileIndex, 1);
      setMyFiles(updatedFiles);

      if (updatedFiles.length === 0) {
        setIsFileSelected(false);
      }
    };

    const handleFileDownload = (file: File) => {
      const downloadLink = document.createElement("a");
      const objectUrl = URL.createObjectURL(file);
      downloadLink.href = objectUrl;
      downloadLink.download = file.name;
      downloadLink.click();

      URL.revokeObjectURL(objectUrl);
    };

    // For more info about react dropzone follow:
    // https://react-dropzone.js.org/
    return (
      <Stack className={cn(className, "cmp-file-upload")}>
        {isFileSelected ? (
          <View>
            {myFiles.map((file, index) => (
              <View key={index}>
                <p>
                  <Button
                    label={file.name}
                    variant="link-primary"
                    onClick={() => handleFileDownload(file)}
                    style={{ fontWeight: 500 }}
                  />
                  <IconButton
                    sx={{
                      color: COLOR_CODE.HEADER,
                      p: "10px",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: COLOR_CODE.BG_SURFACE_HOVER,
                      },
                      float: "right",
                    }}
                    onClick={() => handleFileDelete(index)}
                  >
                    <FaRegTrashAlt size={15} />
                  </IconButton>
                </p>
              </View>
            ))}
          </View>
        ) : (
          <Stack
            {...getRootProps({
              className: cn("cmp-file-upload__body", {
                "cmp-file-upload__body--error": hasError,
              }),
            })}
          >
            <input
              data-testid="upload-input"
              {...getInputProps()}
              {...(innerRef && {
                ref: innerRef,
              })}
            />
            <Stack my={1} justifyContent="center" alignItems="center">
              <Typo
                variant="body1"
                fontWeight={500}
                color={COLOR_CODE.GREY_600}
              >
                {message}
              </Typo>
              <Typo mt={1} color={COLOR_CODE.GREY_500} variant="body2">
                <Trans i18nKey="max_size_file_upload">
                  Max file size:
                  <span
                    style={{
                      color: COLOR_CODE.GREY_700,
                    }}
                  >
                    50MB
                  </span>
                </Trans>
              </Typo>
              <Typo color={COLOR_CODE.GREY_500} variant="body2">
                <Trans i18nKey={"support_types_file_upload"}>
                  Supported file types:
                  <span
                    style={{
                      color: COLOR_CODE.GREY_700,
                    }}
                  >
                    DOC, EXCEL, PDF, CSV, JPG, PNG
                  </span>
                </Trans>
              </Typo>
            </Stack>
          </Stack>
        )}
        {hasError && !isFileSelected && (
          <Typo mt="3px" variant="body2" color={COLOR_CODE.DANGER}>
            {errorMessage}
          </Typo>
        )}
      </Stack>
    );
  }
);

type Props = {
  className?: string;
  numberAllow?: number;
  onChange: (...args: any[]) => void;
  onError?: (value: any) => void;
  acceptFileType?: Accept;
  message?: string | React.ReactNode;
  innerRef?: React.Ref<HTMLInputElement>;
  errorMessage?: string;
};

export default FileUpload;
