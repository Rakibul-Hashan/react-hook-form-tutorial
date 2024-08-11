import React from "react";
import { useForm } from "react-hook-form";

export default function IsValid() {
  const {
    register,
    handleSubmit,
    formState: { isValid }, // We are extracting isValid from formState
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: true })}
        placeholder="Email"
      />
      {/* The form is valid only if this field is not empty */}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
      {/* The button is disabled until the form is valid */}
    </form>
  );
}
