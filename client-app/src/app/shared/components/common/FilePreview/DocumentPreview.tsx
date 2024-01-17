/* eslint-disable @typescript-eslint/no-explicit-any */

import { Stack } from '@mui/material';
import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { IoTrash } from 'react-icons/io5';
import { MdDownload } from 'react-icons/md';
import { UploadFileType } from '../FileUpload/helpers';
import PDFView from '../PDFView';
import { COLOR_CODE, Typo, emptyFunction, isEmpty } from '../../..';

export const getFileName = (fileName = '') =>
  fileName.length > 50 ? `${fileName.slice(0, 15)}...${fileName.slice(-6)}` : fileName;

const convertByteToMb = (size = 0): string => Number(size / (1024 * 1024)).toFixed(2);

const DocumentPreview: React.FC<Props> = ({
  doc,
  onRemove = emptyFunction,
  // onShowLightBox = emptyFunction,
}) => {
  const { file } = doc;
  const { name, path } = file || {};
  const isPdf = path.includes('.pdf');
  const [openPdf, setOpenPdf] = React.useState<{ title: string; url: string }>(null);

  const handleDownloadFile = (url: string, name: string) => {
    if (!url) return null;
    const element = document.createElement('a');
    element.href = url;
    element.target = '_blank';
    element.rel = 'noopener noreferrer';
    element.setAttribute('download', name);
    document.body.appendChild(element);
    element.click();
    return element.parentNode.removeChild(element);
  };

  const handleOpenFile =
    (file: UploadFileType, isDownloading = false) =>
    () => {
      // if (file.url) {
      //   if (isPdf && !isDownloading) {
      //     return onShowLightBox({ url: file.url, name: file.name });
      //   }
      //   return handleDownloadFile(file.url, file.name);
      // }
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          if (isPdf && !isDownloading) {
            setOpenPdf({ url: result as string, title: name });
          } else {
            handleDownloadFile(result as string, name);
          }
        }
      };
      fileReader.readAsDataURL(file.file);
    };

  return (
    <>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Stack flexGrow={1} mr={4}>
          <Typo variant="body1">
            {getFileName(name)}{' '}
            {file && (
              <span style={{ color: COLOR_CODE.GREY_500 }}>({convertByteToMb(file?.size)} MB)</span>
            )}
          </Typo>
          {/* {isUploading && <LinearProgress variant="determinate" value={uploadProgress} />} */}
        </Stack>
        <Stack flexDirection="row" alignItems="center">
          <i>
            <MdDownload
              fontSize={20}
              color={COLOR_CODE.GREY_400}
              onClick={handleOpenFile(doc, true)}
              cursor="pointer"
            />
          </i>
          {isPdf && (
            <i>
              <AiFillEye
                fontSize={20}
                color={COLOR_CODE.GREY_400}
                onClick={handleOpenFile(doc)}
                cursor="pointer"
                className="ml-8"
              />
            </i>
          )}
          {file && (
            <i>
              <IoTrash
                fontSize={20}
                color={COLOR_CODE.GREY_400}
                title="Remove document"
                cursor="pointer"
                className="ml-8"
                onClick={onRemove}
              />
            </i>
          )}
        </Stack>
      </Stack>
      {openPdf && (
        <PDFView
          url={openPdf.url}
          title={openPdf.title}
          isVisible={!isEmpty(openPdf.url)}
          onClose={() => setOpenPdf(null)}
          allowDownload={false}
        />
      )}
    </>
  );
};

type Props = {
  doc?: UploadFileType;
  onRemove?: (..._args: any[]) => void;
  // onShowLightBox?: Callback;
};

export default DocumentPreview;
