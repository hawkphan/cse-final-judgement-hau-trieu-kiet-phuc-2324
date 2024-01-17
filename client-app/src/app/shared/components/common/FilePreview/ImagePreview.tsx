/* eslint-disable @typescript-eslint/no-explicit-any */

import { Backdrop, Stack } from '@mui/material';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { UploadFileType } from '../FileUpload/helpers';
import Image from '../Image';
import './styles.scss';
import { COLOR_CODE, emptyFunction, useComponentDidMount } from '../../..';

const ImagePreview: React.FC<Props> = ({
  image,
  imageUrl = '',
  thumbnailWidth = '100px',
  thumbnailHeight = '100px',
  onRemove = emptyFunction,
}) => {
  const [parsedUrl, setParsedUrl] = React.useState<string>('');
  const [isZooming, setIsZooming] = React.useState<boolean>(false);

  // TODO: should decode url when having imageUrl

  const { file } = image || {};

  useComponentDidMount(() => {
    if (!file || imageUrl || parsedUrl) return;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const { result } = e.target;
      setParsedUrl(result as string);
    };
    fileReader.readAsDataURL(file as File);
  });

  const setShowBackdrop = () => setIsZooming((prev) => !prev);

  const handleRemove = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    onRemove();
  };

  const renderImage = (imgWidth: string, imgHeight: string) => (
    <Stack className="cmp-preview-image__container" sx={{ width: imgWidth, height: imgHeight }}>
      {!isZooming && (
        <i>
          <AiOutlineClose
            color={COLOR_CODE.WHITE}
            fontSize={20}
            className="cmp-preview-image__remove"
            onClick={handleRemove}
          />
        </i>
      )}
      <Image
        className="cmp-preview-image__image"
        src={parsedUrl}
        alt={file.name}
        style={{ height: imgHeight }}
        onClick={setShowBackdrop}
      />
    </Stack>
  );

  return (
    <Stack className="cmp-preview-image" sx={{ width: thumbnailWidth }}>
      {renderImage(thumbnailWidth, thumbnailHeight)}
      {isZooming && (
        <Backdrop
          open={isZooming}
          sx={{ zIndex: 99999 }}
          onClick={setShowBackdrop}
          transitionDuration={500}
        >
          {renderImage('calc(100vw - 750px)', 'auto')}
        </Backdrop>
      )}
    </Stack>
  );
};

type Props = {
  image: UploadFileType;
  thumbnailWidth?: string;
  thumbnailHeight?: string;
  imageUrl?: string;
  onRemove?: (..._args: any[]) => void;
};

export default ImagePreview;
