import React from "react";
import { useForm } from "react-hook-form";

export default function IsDirty() {
  const {
    register,
    handleSubmit,
    formState: { isDirty }, // We are extracting isDirty from formState
  } = useForm({ defaultValues: { name: "" } }); // Default value for name is an empty string

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h2>IsDirty</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Enter your name" />

        <button
          type="submit"
          disabled={!isDirty}
          style={{
            background: isDirty ? "" : "grey", // Change color based on isDirty
            cursor: isDirty ? "pointer" : "not-allowed", // Change cursor based on isDirty
            color: "white", // Default text color
          }}
        >
          Submit
        </button>

        {/* The submit button will be disabled until the user modifies the input */}
      </form>
    </>
  );
}
