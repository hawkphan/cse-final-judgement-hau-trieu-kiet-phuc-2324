import { useMediaQuery } from "@mui/material";
import cn from "classnames";
import { motion, MotionProps } from "framer-motion";
import React, { ReactNode, useEffect, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import Icon from "../Icon";
import Text from "../Text";
import View from "../View";
import "./styles.scss";
import AccordionWrapper from "./Wrapper";
import { muiResponsive } from "../../..";

const Accordion: React.FC<Props> = ({
  title,
  className,
  children,
  isExpanded = false,
  subTitle,
  onToggle,
  customIcon,
  disableToggle = false,
  ...props
}) => {
  const [expanded, setExpanded] = useState<boolean>(isExpanded);
  const isMobileScreen = useMediaQuery(muiResponsive.MOBILE);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !disableToggle && setExpanded(isExpanded);
  }, [isExpanded, disableToggle]);

  const handleToggle = () => {
    if (disableToggle) return;
    if (onToggle) {
      onToggle(!expanded);
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <View
      className={cn(
        "cmp-accordion-item",
        {
          "cmp-accordion-item--collapsed": expanded === false,
          "cmp-accordion-item--expanded": expanded === true,
        },
        className
      )}
    >
      <motion.header initial={false} onClick={handleToggle}>
        <View
          isRow
          align="center"
          className={cn(
            "cmp-accordion-item__header",
            { "cmp-accordion-item__header--expanded": expanded === true },
            { "cmp-accordion-item__header--collapsed": expanded === false }
          )}
        >
          <View
            isRow
            align="center"
            style={{
              marginRight: "16px",
            }}
          >
            {subTitle && <View className="mr-16">{subTitle}</View>}
            {customIcon || (
              <Icon
                className={cn("cmp-accordion-item__header__icon", {
                  "cmp-accordion-item__header__icon--disabled": disableToggle,
                })}
              >
                {expanded ? <IoChevronUp /> : <IoChevronDown />}
              </Icon>
            )}
          </View>
          {typeof title === "string" ? (
            <Text className="fw-bold" size={isMobileScreen ? 14 : 18}>
              {title}
            </Text>
          ) : (
            title
          )}
        </View>
      </motion.header>
      <AccordionWrapper isExpanded={isExpanded} expanded={expanded} {...props}>
        {children}
      </AccordionWrapper>
    </View>
  );
};

type Props = MotionProps & {
  title: string | ReactNode;
  children: ReactNode;
  subTitle?: string | ReactNode;
  className?: string;
  isExpanded?: boolean;
  isTranslatable?: boolean;
  customIcon?: React.ReactElement;
  onToggle?: (_value: boolean) => void;
  disableToggle?: boolean;
};

export default Accordion;
