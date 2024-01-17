/* eslint-disable @typescript-eslint/no-unused-vars */

// import { useGetPresignedDownloadUrl } from '@queries';

import React from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { MdDownload } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import { getFileName } from './DocumentPreview';
import { COLOR_CODE, ErrorService, useDownloadFile } from '../../..';
import { Stack } from '@mui/material';

const RemoteDocumentPreview: React.FC<Props> = ({ name, url }) => {
  const dispatch = useDispatch();

  const isPdf = url.includes('.pdf');
  const download = useDownloadFile();

  // const { isLoading, onGetDecodeUrl } = useGetPresignedDownloadUrl({
  //   onDecodeUrlChange(decodedUrl: string, params) {
  //     download(decodedUrl, name, params.isPrint);
  //   },
  //   onError(error) {
  //     ErrorService.handler(error);
  //   },
  // });

  const handleOpenFile = (url: string, name: string) => () => {
    // dispatch(showLightBox({ name, url }));
  };

  return (
    <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
      <Stack flexGrow={1} mr={4}>
        <Button
          variant="link-primary"
          style={{ height: 20, width: 'fit-content' }}
          onClick={handleOpenFile(url, name)}
          disabled={true}
        >
          {getFileName(name)}
        </Button>
      </Stack>
      <Stack flexDirection="row" alignItems="center">
        <i>
          <MdDownload
            fontSize={20}
            color={COLOR_CODE.GREY_400}
            // onClick={() => onGetDecodeUrl({ filePath: url })}
            cursor="pointer"
          />
        </i>
        {isPdf && (
          <i>
            <AiFillPrinter
              fontSize={20}
              color={COLOR_CODE.GREY_400}
              // onClick={() => onGetDecodeUrl({ filePath: url, isPrint: true })}
              cursor="pointer"
              className="ml-8"
            />
          </i>
        )}
      </Stack>
    </Stack>
  );
};

type Props = {
  url: string;
  name: string;
};

export default RemoteDocumentPreview;
