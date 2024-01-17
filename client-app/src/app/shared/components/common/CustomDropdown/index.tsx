import React from "react";
import { Icon } from "..";
import DropdownContainer, { DropdownItem } from "./DropdownContainer";
import "./styles.scss";

const CustomDropdown: React.FC<Props> = ({ items, ...props }) => {
  return (
    <DropdownContainer items={items} {...props}>
      {items.map((item, idx) => (
        <span key={`dropdown__item--${idx}`}>
          {item.icon && typeof item.icon === "string" ? (
            <Icon className="cmp-dropdown__item-icon" name={item.icon} />
          ) : (
            item.icon
          )}
          {item.label}
        </span>
      ))}
    </DropdownContainer>
  );
};

type Props = {
  flexPosition?: "flex-start" | "flex-end";
  labelClassName?: string;
  label: React.ReactNode;
  items: DropdownItem[];
  xPosition?: "left" | "right";
  yPosition?: "top" | "bottom";
};

export default CustomDropdown;
