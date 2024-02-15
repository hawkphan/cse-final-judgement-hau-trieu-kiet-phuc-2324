/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";

const BasicFileUpload = () => {
  const [fileSelected, setFileSelected] = useState();

  const saveFileSelected= (e: any) => {
    setFileSelected(e.target.files[0]);
    console.log('fileSelected', fileSelected);
  };

  const importFile= async (e: any) => {
    const formData = new FormData();
    formData.append("file", fileSelected);
    try {
      const res = await axios.post("https://localhost:44323/api/importfile", formData);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <input type="file" onChange={saveFileSelected} />
      <input type="button" value="upload" onClick={importFile} />
    </>
  );
};

export default BasicFileUpload;