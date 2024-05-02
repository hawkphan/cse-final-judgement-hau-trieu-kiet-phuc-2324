import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import {
  PaginationResponseNetType,
  isEmpty,
  responseWrapper,
} from "../../shared";
import { API_QUERIES } from "../common/constants";

import { Table2Params } from "../common/types";
import { Language } from ".";
import { getLanguages } from "./apis";

export function useGetLanguages(
  options?: UseQueryOptions<PaginationResponseNetType<Language>, Error> & {
    [key: string]: string | number | string[] | boolean;
  }
) {
  const [params, setParams] = useState<Table2Params>({});
  const {
    error,
    data,
    isFetching,
    refetch: onGetLanguages,
  } = useQuery<PaginationResponseNetType<Language>, Error>({
    queryKey: [API_QUERIES.GET_PROBLEMS, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseNetType<Language>>(
        getLanguages,
        params
      );
    },

    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateLanguages = () =>
    queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_LANGUAGES] });

  const { data: languages = [], pageSize, totalCount, succeeded } = data || {};

  const languageOptions = [
    {
      value: 45,
      label: "Assembly (NASM 2.14.02)",
    },
    {
      value: 46,
      label: "Bash (5.0.0)",
    },
    {
      value: 47,
      label: "Basic (FBC 1.07.1)",
    },
    {
      value: 75,
      label: "C (Clang 7.0.1)",
    },
    {
      value: 76,
      label: "C++ (Clang 7.0.1)",
    },
    {
      value: 48,
      label: "C (GCC 7.4.0)",
    },
    {
      value: 52,
      label: "C++ (GCC 7.4.0)",
    },
    {
      value: 49,
      label: "C (GCC 8.3.0)",
    },
    {
      value: 53,
      label: "C++ (GCC 8.3.0)",
    },
    {
      value: 50,
      label: "C (GCC 9.2.0)",
    },
    {
      value: 54,
      label: "C++ (GCC 9.2.0)",
    },
    {
      value: 86,
      label: "Clojure (1.10.1)",
    },
    {
      value: 51,
      label: "C# (Mono 6.6.0.161)",
    },
    {
      value: 77,
      label: "COBOL (GnuCOBOL 2.2)",
    },
    {
      value: 55,
      label: "Common Lisp (SBCL 2.0.0)",
    },
    {
      value: 56,
      label: "D (DMD 2.089.1)",
    },
    {
      value: 57,
      label: "Elixir (1.9.4)",
    },
    {
      value: 58,
      label: "Erlang (OTP 22.2)",
    },
    {
      value: 44,
      label: "Executable",
    },
    {
      value: 87,
      label: "F# (.NET Core SDK 3.1.202)",
    },
    {
      value: 59,
      label: "Fortran (GFortran 9.2.0)",
    },
    {
      value: 60,
      label: "Go (1.13.5)",
    },
    {
      value: 88,
      label: "Groovy (3.0.3)",
    },
    {
      value: 61,
      label: "Haskell (GHC 8.8.1)",
    },
    {
      value: 62,
      label: "Java (OpenJDK 13.0.1)",
    },
    {
      value: 63,
      label: "JavaScript (Node.js 12.14.0)",
    },
    {
      value: 78,
      label: "Kotlin (1.3.70)",
    },
    {
      value: 64,
      label: "Lua (5.3.5)",
    },
    {
      value: 89,
      label: "Multi-file program",
    },
    {
      value: 79,
      label: "Objective-C (Clang 7.0.1)",
    },
    {
      value: 65,
      label: "OCaml (4.09.0)",
    },
    {
      value: 66,
      label: "Octave (5.1.0)",
    },
    {
      value: 67,
      label: "Pascal (FPC 3.0.4)",
    },
    {
      value: 85,
      label: "Perl (5.28.1)",
    },
    {
      value: 68,
      label: "PHP (7.4.1)",
    },
    {
      value: 43,
      label: "Plain Text",
    },
    {
      value: 69,
      label: "Prolog (GNU Prolog 1.4.5)",
    },
    {
      value: 70,
      label: "Python (2.7.17)",
    },
    {
      value: 71,
      label: "Python (3.8.1)",
    },
    {
      value: 80,
      label: "R (4.0.0)",
    },
    {
      value: 72,
      label: "Ruby (2.7.0)",
    },
    {
      value: 73,
      label: "Rust (1.40.0)",
    },
    {
      value: 81,
      label: "Scala (2.13.2)",
    },
    {
      value: 82,
      label: "SQL (SQLite 3.27.2)",
    },
    {
      value: 83,
      label: "Swift (5.2.3)",
    },
    {
      value: 74,
      label: "TypeScript (3.7.4)",
    },
    {
      value: 84,
      label: "Visual Basic.Net (vbnc 0.0.0.5943)",
    },
  ];

  return {
    languages,
    payloadSize: pageSize,
    totalRecords: totalCount,
    error,
    isFetching,
    succeeded,
    params,
    languageOptions,
    onGetLanguages,
    setParams,
    handleInvalidateLanguages,
  };
}
