/* eslint-disable @typescript-eslint/no-explicit-any */

import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import cn from "classnames";
import React from "react";
import { Image, Text, View } from "../common";
import "./styles.scss";
import { IMAGES } from "../../../configs/images";

const clsPrefix = "cmp-logo";

export const LogoName = {
  title: "LMS",
  subTitle: "Product of LMS",
};

const Logo: React.FC<Props> = ({
  className = "",
  logoSize = {
    width: 80,
    height: 80,
  },
  logoUrl = IMAGES.logo,
  title = LogoName.title,
  titleSize = 20,
  subTitle = LogoName.subTitle,
  subTitleSize = 20,
  spacing = 16,
  onClick,
  hideTitle,
  hideSubTitle,
  titleColor,
  subTitleColor,
  isColumn = false,
}) => {
  return (
    <View
      className={cn(clsPrefix, className, { "cursor-pointer": !!onClick })}
      onClick={onClick}
    >
      {isColumn ? (
        <View className={`${clsPrefix} text-center`}>
          <View align="center">
            <Image
              src={logoUrl}
              className={`${clsPrefix}__img`}
              width={logoSize.width}
              height={logoSize.height}
            />
          </View>
          <Text
            size={titleSize}
            className={cn("fw-bold text-color-primary-900 mt-16", {
              "text-center": isColumn,
            })}
            color={titleColor || undefined}
          >
            {title}
          </Text>
          <Text
            size={subTitleSize}
            className={cn("fw-normal text-color-primary-600  mt-8", {
              "text-center": isColumn,
            })}
            color={subTitleColor || undefined}
          >
            {subTitle}
          </Text>
        </View>
      ) : (
        <ListItem
          alignItems="center"
          classes={{ root: className || undefined }}
          disableGutters
        >
          <ListItemAvatar
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={logoUrl}
              className={`${clsPrefix}__img`}
              width={logoSize.width}
              height={logoSize.height}
            />
          </ListItemAvatar>
          <ListItemText
            style={{
              marginLeft: spacing,
            }}
            primary={
              !hideTitle ? (
                <span
                  className={cn("fw-bold text-color-primary-900", {
                    "text-center": isColumn,
                  })}
                  style={{
                    color: titleColor,
                    fontSize: titleSize,
                  }}
                >
                  {title}
                </span>
              ) : null
            }
            secondary={
              !hideSubTitle ? (
                <span
                  className={cn("fw-bold text-color-primary-900", {
                    "text-center": isColumn,
                  })}
                  style={{
                    color: subTitleColor,
                    fontSize: subTitleSize,
                    whiteSpace: "nowrap",
                  }}
                >
                  {subTitle}
                </span>
              ) : null
            }
          />
        </ListItem>
      )}
    </View>
  );
};
type Props = {
  className?: string;
  logoSize?: {
    width: number;
    height: number;
  };
  title?: string;
  titleSize?: number;
  subTitle?: string;
  subTitleSize?: number;
  spacing?: number;
  onClick?: (..._args: any[]) => void;
  hideTitle?: boolean;
  hideSubTitle?: boolean;
  titleColor?: string;
  subTitleColor?: string;
  isColumn?: boolean;
  logoUrl?: string;
};

export default Logo;
