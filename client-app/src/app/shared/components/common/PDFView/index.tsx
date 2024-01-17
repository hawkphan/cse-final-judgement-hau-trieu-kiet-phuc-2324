/* eslint-disable @typescript-eslint/no-explicit-any */
import { Backdrop } from "@mui/material";
import cn from "classnames";
import React, { useEffect, useState } from "react";
import {
  BiDownload,
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiRotateLeft,
  BiRotateRight,
  BiX,
  BiZoomIn,
  BiZoomOut,
} from "react-icons/bi";
import { Document, Page, pdfjs } from "react-pdf";

import Button from "../Button";
import Loading from "../Loading";
import View from "../View";
import "./styles.scss";
import { useKeyPress } from "../../..";

const PDFView: React.FC<Props> = ({
  className,
  // style,
  url,
  title = "",
  isVisible,
  onClose,
  onDownload,
  allowDownload = true,
}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotate, setRotate] = useState(0);

  const pdfUrl = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  pdfjs.GlobalWorkerOptions.workerSrc = pdfUrl;

  useEffect(() => {
    if (pageNumber !== 1) {
      setPageNumber(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleClosePDF = () => {
    onClose();
  };

  const zoomIn = () => {
    setScale((current) => current + 0.2);
  };

  const zoomOut = () => {
    setScale((current) => current - 0.2);
  };

  const rotateLeft = () => {
    setRotate((current) => current - 90);
  };

  const rotateRight = () => {
    setRotate((current) => current + 90);
  };

  const handlePDFPrev = () => {
    if (pageNumber > 1) {
      setPageNumber((current) => current - 1);
    } else {
      setPageNumber(numPages);
    }
  };

  const handlePDFNext = () => {
    if (pageNumber < numPages) {
      setPageNumber((current) => current + 1);
    } else {
      setPageNumber(1);
    }
  };

  const disabledEventPropagation = (event: { stopPropagation: () => void }) => {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
  };

  useKeyPress("Escape", () => {
    handleClosePDF();
  });

  const pdfHeight = window.innerHeight - 50;

  return (
    <Backdrop
      classes={{
        root: "cmp-pdf-view__backdrop",
      }}
      open={isVisible}
      onClick={handleClosePDF}
    >
      <Document
        className={cn("cmp-pdf-view", className)}
        // style={style}
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{
          cMapUrl: "cmaps/",
          cMapPacked: true,
        }}
        // onClick={handleClosePDF}
        loading={<Loading size="normal" variant="white" loadingStyle={4} />}
      >
        <View
          className="cmp-pdf-view__pdf-header"
          isRow
          justify="space-between"
          align="center"
          onClick={disabledEventPropagation}
        >
          <span>{title}</span>
          {numPages > 1 && (
            <View
              className="cmp-pdf-view__pdf-page-turner"
              isRow
              align="center"
            >
              <Button
                className="cmp-pdf-view__pdf-action-button"
                onClick={handlePDFPrev}
                variant="text"
                icon={<BiLeftArrowAlt />}
              />
              <span className="cmp-pdf-view__pdf-page-turner-page-number">{`${pageNumber} of ${numPages}`}</span>
              <Button
                className="cmp-pdf-view__pdf-action-button"
                onClick={handlePDFNext}
                variant="text"
                icon={<BiRightArrowAlt />}
              />
            </View>
          )}
          <View isRow>
            <Button
              className="cmp-pdf-view__pdf-action-button"
              onClick={zoomIn}
              variant="text"
              icon={<BiZoomIn />}
            />
            <Button
              className="cmp-pdf-view__pdf-action-button"
              onClick={zoomOut}
              variant="text"
              icon={<BiZoomOut />}
            />
            <Button
              className="cmp-pdf-view__pdf-action-button"
              onClick={rotateLeft}
              variant="text"
              icon={<BiRotateLeft />}
            />
            <Button
              className="cmp-pdf-view__pdf-action-button"
              onClick={rotateRight}
              variant="text"
              icon={<BiRotateRight />}
            />
            {allowDownload && (
              <Button
                className="cmp-pdf-view__pdf-action-button"
                onClick={onDownload}
                variant="text"
                icon={<BiDownload />}
              />
            )}
            <Button
              className="cmp-pdf-view__pdf-action-button"
              onClick={handleClosePDF}
              variant="text"
              icon={<BiX />}
            />
          </View>
        </View>
        <Page
          className="cmp-pdf-view__pdf-page"
          pageNumber={pageNumber}
          height={pdfHeight}
          scale={scale}
          rotate={rotate}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onClick={disabledEventPropagation}
        />
      </Document>
    </Backdrop>
  );
};

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  url: string;
  title?: string;
  isVisible: boolean;
  onClose: (..._args: any[]) => void;
  onDownload?: (..._args: any[]) => void;
  allowDownload?: boolean;
};

export default PDFView;
