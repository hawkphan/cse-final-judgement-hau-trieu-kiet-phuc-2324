import { Stack } from "@mui/material";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import { Typo, emptyFunction, getRandomId, useDebounce } from "../../../..";

const SearchField = ({
  className = "",
  keyLabel = "",
  inputPlaceholder = "",
  searchKey = "",
  onSearch = emptyFunction,
}) => {
  const location = useLocation();
  const history = useNavigate();

  const query = new URLSearchParams(location.search);

  const queryValue = query.get(searchKey);

  const id = useRef(`search-input-${getRandomId()}`);

  const [value, setValue] = useState<string>(queryValue ?? "");

  const debouncedValue = useDebounce(value.trim(), 600);

  useEffect(() => {
    if (debouncedValue) query.set(searchKey, debouncedValue);
    else query.delete(searchKey);
    history({ search: query.toString() });
    onSearch({ search: debouncedValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleIconClick = () => {
    setValue("");
  };

  return (
    <Stack
      className={cn("cmp-search-input", className)}
      direction="row"
      flexWrap="nowrap"
    >
      <Stack
        className={cn("cmp-search-input__label")}
        justifyContent="center"
        alignItems="center"
      >
        <Typo variant="body2" sx={{ whiteSpace: "nowrap", fontWeight: 400 }}>
          {keyLabel}
        </Typo>
      </Stack>
      <Stack
        direction="row"
        flexGrow={1}
        style={{ maxWidth: "76%" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <input
          id={id.current}
          className={cn("cmp-input", "cmp-search-input__input", {
            "cmp-input--icon": value,
          })}
          placeholder={inputPlaceholder as string}
          value={value ?? ""}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
        {value && (
          <IoClose
            size={20}
            className={cn("cmp-input__icon mr-8")}
            onClick={handleIconClick}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default SearchField;
