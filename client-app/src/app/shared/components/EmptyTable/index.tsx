import { Stack } from "@mui/material";
import React from "react";
import "./styles.scss";
import { Image, Typo } from "..";
import { IMAGES } from "../../../configs/images";
import { COLOR_CODE } from "../..";

const EmptyTable: React.FC<Props> = ({
  title = "No records",
  image = "",
  width = 120,
}) => (
  <Stack flexGrow={1} justifyContent="center" alignItems="center" my={2}>
    <Image src={image || IMAGES.documentView} width={width} className="mb-8" />
    <Typo
      variant="body1"
      color={COLOR_CODE.GREY_600}
      fontWeight={500}
      textAlign={"center"}
    >
      {title}
    </Typo>
  </Stack>
);

type Props = {
  title?: string;
  style?: React.CSSProperties;
  image?: string;
  width?: number;
};

export default EmptyTable;
