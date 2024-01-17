/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from "react";
import { Accept } from "react-dropzone";
import "./styles.scss";
import { Button, FileUpload } from "../../..";

const AttachmentUploadButton: React.FC<Props> = ({
  acceptFileType,
  icon,
  content = "upload",
  onAddAttachment,
  onError,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenSelectFileModal = () => {
    inputRef.current?.click();
  };

  const handleSelectFile = (files: File[]) => {
    onAddAttachment(files);
  };

  return (
    <>
      <Button
        variant="link-primary"
        className="mb-4 cmp-upload-button text-is-16"
        onClick={handleOpenSelectFileModal}
        type="button"
      >
        <i className="cmp-upload-button__icon">{icon}</i>
        {content}
      </Button>
      <FileUpload
        acceptFileType={acceptFileType}
        className="is-hidden"
        onChange={handleSelectFile}
        innerRef={inputRef}
        onError={(errorMessage) => onError(errorMessage)}
      />
    </>
  );
};

type Props = {
  acceptFileType: Accept;
  icon?: any;
  content: string;
  onAddAttachment: (..._args: any[]) => void;
  onError: (_value: any) => void;
};

export default AttachmentUploadButton;
