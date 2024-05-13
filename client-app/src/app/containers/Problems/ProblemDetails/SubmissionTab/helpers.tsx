import { Stack } from "@mui/material";
import { LoadingCommon, Tag } from "../../../../shared";

export const renderStatusTag = (value: number) => {
  let backgroundColor;
  let color;
  let description;

  switch (value) {
    case 1: // In Queue
      backgroundColor = "#BBDEFB";
      color = "#2196F3";
      description = "In Queue";
      break;
    case 2: // Processing
      backgroundColor = "#BBDEFB";
      color = "#2196F3";
      description = "Processing";
      break;
    case 3: // Accepted
      backgroundColor = "#4CAF50";
      color = "#FFFFFF";
      description = "Accepted";
      break;
    case 4: // Wrong Answer
      backgroundColor = "#F44336";
      color = "#FFFFFF";
      description = "Wrong Answer";
      break;
    case 5: // Time Limit Exceeded
      backgroundColor = "#FFC107";
      color = "#FFFFFF";
      description = "Time Limit Exceeded";
      break;
    case 6: // Compilation Error
      backgroundColor = "#FF9800";
      color = "#FFFFFF";
      description = "Compilation Error";
      break;
    case 7: // Runtime Error (SIGSEGV)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (SIGSEGV)";
      break;
    case 8: // Runtime Error (SIGXFSZ)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (SIGXFSZ)";
      break;
    case 9: // Runtime Error (SIGFPE)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (SIGFPE)";
      break;
    case 10: // Runtime Error (SIGABRT)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (SIGABRT)";
      break;
    case 11: // Runtime Error (NZEC)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (NZEC)";
      break;
    case 12: // Runtime Error (Other)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (Other)";
      break;
    case 13: // Internal Error
      backgroundColor = "#9C27B0";
      color = "#FFFFFF";
      description = "Internal Error";
      break;
    case 14: // Exec Format Error
      backgroundColor = "#9C27B0";
      color = "#FFFFFF";
      description = "Exec Format Error";
      break;
    default:
      backgroundColor = "#BBDEFB";
      color = "#2196F3";
      description = "---";
      break;
  }

  return (
    <Stack direction={"row"} gap={2} alignContent={"baseline"}>
      {[1, 2].includes(value) && (
        <LoadingCommon style={{ paddingBottom: "5px" }} />
      )}
      <Tag
        variant="is-customize"
        backgroundColor={backgroundColor}
        color={color}
      >
        {description}
      </Tag>
    </Stack>
  );
};

export const getLanguageNameById = (id: number) => {
  const languages = [
    { id: 45, name: "Assembly (NASM 2.14.02)" },
    { id: 46, name: "Bash (5.0.0)" },
    { id: 47, name: "Basic (FBC 1.07.1)" },
    { id: 75, name: "C (Clang 7.0.1)" },
    { id: 76, name: "C++ (Clang 7.0.1)" },
    { id: 48, name: "C (GCC 7.4.0)" },
    { id: 52, name: "C++ (GCC 7.4.0)" },
    { id: 49, name: "C (GCC 8.3.0)" },
    { id: 53, name: "C++ (GCC 8.3.0)" },
    { id: 50, name: "C (GCC 9.2.0)" },
    { id: 54, name: "C++ (GCC 9.2.0)" },
    { id: 86, name: "Clojure (1.10.1)" },
    { id: 51, name: "C# (Mono 6.6.0.161)" },
    { id: 77, name: "COBOL (GnuCOBOL 2.2)" },
    { id: 55, name: "Common Lisp (SBCL 2.0.0)" },
    { id: 56, name: "D (DMD 2.089.1)" },
    { id: 57, name: "Elixir (1.9.4)" },
    { id: 58, name: "Erlang (OTP 22.2)" },
    { id: 44, name: "Executable" },
    { id: 87, name: "F# (.NET Core SDK 3.1.202)" },
    { id: 59, name: "Fortran (GFortran 9.2.0)" },
    { id: 60, name: "Go (1.13.5)" },
    { id: 88, name: "Groovy (3.0.3)" },
    { id: 61, name: "Haskell (GHC 8.8.1)" },
    { id: 62, name: "Java (OpenJDK 13.0.1)" },
    { id: 63, name: "JavaScript (Node.js 12.14.0)" },
    { id: 78, name: "Kotlin (1.3.70)" },
    { id: 64, name: "Lua (5.3.5)" },
    { id: 89, name: "Multi-file program" },
    { id: 79, name: "Objective-C (Clang 7.0.1)" },
    { id: 65, name: "OCaml (4.09.0)" },
    { id: 66, name: "Octave (5.1.0)" },
    { id: 67, name: "Pascal (FPC 3.0.4)" },
    { id: 85, name: "Perl (5.28.1)" },
    { id: 68, name: "PHP (7.4.1)" },
    { id: 43, name: "Plain Text" },
    { id: 69, name: "Prolog (GNU Prolog 1.4.5)" },
    { id: 70, name: "Python (2.7.17)" },
    { id: 71, name: "Python (3.8.1)" },
    { id: 80, name: "R (4.0.0)" },
    { id: 72, name: "Ruby (2.7.0)" },
    { id: 73, name: "Rust (1.40.0)" },
    { id: 81, name: "Scala (2.13.2)" },
    { id: 82, name: "SQL (SQLite 3.27.2)" },
    { id: 83, name: "Swift (5.2.3)" },
    { id: 74, name: "TypeScript (3.7.4)" },
    { id: 84, name: "Visual Basic.Net (vbnc 0.0.0.5943)" },
  ];

  const language = languages.find((lang) => lang.id === id);
  return language ? language.name : "";
};
