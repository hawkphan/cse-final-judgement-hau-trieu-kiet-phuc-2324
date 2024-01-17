/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from '@mui/material';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { FileType, UploadFileType } from '../FileUpload/helpers';
import DocumentPreview from './DocumentPreview';
import ImagePreview from './ImagePreview';

const FilePreview: React.FC<Props> = ({
  files = [],
  onRemoveAttachment,
  // isUploading = false,
  // uploadProgress = 0,
  // canRemove = true,
  // canPreview = true,
}) => {
  const documentFiles = files.filter((file) => file.type === FileType.Document);

  const imageFiles = files.filter((file) => file.type === FileType.Image);

  const renderDocuments = (documents: UploadFileType[] = []) => (
    <>
      {documents.map((doc: UploadFileType) => {
        const { id = uuid() } = doc;
        return <DocumentPreview key={id} doc={doc} onRemove={() => onRemoveAttachment(id)} />;
      })}
    </>
  );

  const renderImages = (images: UploadFileType[] = []) => (
    <Stack flexDirection="row" alignItems="center" overflow="auto">
      {images.map((image: UploadFileType) => {
        const { id = uuid() } = image;
        return <ImagePreview key={id} image={image} onRemove={() => onRemoveAttachment(id)} />;
      })}
    </Stack>
  );

  return (
    <Stack my={1}>
      {renderImages(imageFiles)}
      {renderDocuments(documentFiles)}
    </Stack>
  );
};

type Props = {
  files: UploadFileType[];
  onRemoveAttachment: (..._args: any[]) => void;
  isUploading?: boolean;
  uploadProgress?: number;
  canRemove?: boolean;
  canPreview?: boolean;
};

export default FilePreview;
