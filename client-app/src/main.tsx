import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <LabLocalizationProvider dateAdapter={AdapterDayjs}> */}
      <RouterProvider router={router} />
      {/* </LabLocalizationProvider> */}
    </LocalizationProvider>
  </React.StrictMode>
);
