/* eslint-disable @typescript-eslint/no-explicit-any */

import { Stack } from "@mui/material";

import cn from "classnames";
import React, { useEffect, useState } from "react";
import { isEmpty } from "../../common";
import {
  AccordionWrapper,
  Button,
  Checkbox,
  Icon,
  MuiInput,
  Typo,
} from "../common";
import "./styles.scss";

export const getFilteredOptions = (
  options: CheckboxProps["options"] = [],
  searchText = ""
) => {
  if (!searchText) return options;
  return options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );
};

export const CheckBoxFilter: React.FC<CheckboxProps> = ({
  label,
  options,
  onChange,
  value,
  name,
  errorMessage,
  isSearchable,
  isIgnoreTranslate,
  // onSearch,
}) => {
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [filterOptions, setOptions] =
    useState<CheckboxProps["options"]>(options);
  const allValue = filterOptions.map((x) => x.value);

  useEffect(() => {
    setOptions(options);
  }, [options]);

  useEffect(() => {
    if (value.length === allValue.length && !isEmpty(allValue.length)) {
      setIsSelectAll(true);
    } else {
      setIsSelectAll(false);
    }
  }, [allValue.length, isSelectAll, value]);

  const handleSelectAll: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (isSelectAll) {
      onChange(name, []);
    } else {
      onChange(name, allValue);
    }
    setIsSelectAll((prev) => !prev);
  };

  const handleSearch = (event: { currentTarget: { value: any } }) => {
    const { value } = event.currentTarget;

    const filteredFlagTypeOptions = getFilteredOptions(options, value);
    setOptions(filteredFlagTypeOptions);
  };

  return (
    <Stack className="cmp-filter-checkbox">
      <Stack
        className={cn("mb-8 cmp-filter-checkbox__label", {
          "is-expanded": isExpanded,
        })}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {/* Title - Select All */}
        <Stack direction="row" flexWrap="nowrap" alignItems="center">
          <Typo variant="body1" sx={{ fontWeight: 700 }}>
            {label}
          </Typo>
          <Icon
            name="ic_chevron-down"
            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}
            className="fw-bold ml-1"
          />
        </Stack>
        <Button
          variant="link-primary"
          onClick={handleSelectAll}
          style={{ height: 16 }}
        >
          {!isSelectAll ? "Select All" : "Clear All"}
        </Button>
      </Stack>

      <AccordionWrapper isExpanded expanded={isExpanded}>
        {isSearchable && (
          <Stack className="mb-16">
            <MuiInput
              size="small"
              label={null}
              placeholder="Search"
              onChange={handleSearch}
            />
          </Stack>
        )}
        <Stack className="cmp-filter-checkbox__menu">
          <Stack className="cmp-filter-checkbox__menu__checkbox" width="100%">
            <Checkbox.Group
              label={null}
              options={filterOptions}
              name={name}
              onChange={onChange}
              errorMessage={errorMessage}
              value={value}
              columns={1}
              isGetStringValue
              isIgnoreTranslate={isIgnoreTranslate}
            />
          </Stack>
        </Stack>
      </AccordionWrapper>
    </Stack>
  );
};

type CheckboxProps = {
  label?: string;
  options?: { value: any; label: string; key?: string }[];
  value?: any[];
  name?: string;
  onChange?: (..._arg: any[]) => void;
  errorMessage?: string;
  isSearchable?: boolean;
  onSearch?: (..._args: any[]) => void;
  isIgnoreTranslate?: boolean;
};
