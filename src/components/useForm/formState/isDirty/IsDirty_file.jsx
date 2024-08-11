import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function FileUploadForm() {
  const {
    register,
    formState: { isDirty },
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: { file: null },
  });

  const [initialFile, setInitialFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Initialize the initial file state from defaultValues
    setInitialFile(getValues("file"));
  }, [getValues]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setValue("file", file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setValue("file", null);
  };

  // Determine if the form is dirty based on file changes
  const isFormDirty = () => {
    return selectedFile !== initialFile;
  };

  return (
    <form>
      <input type="file" {...register("file")} onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <button type="button" onClick={handleFileRemove}>
            Remove File
          </button>
        </div>
      )}
      <p>Form is dirty: {isFormDirty() ? "Yes" : "No"}</p>
    </form>
  );
}

export default FileUploadForm;
