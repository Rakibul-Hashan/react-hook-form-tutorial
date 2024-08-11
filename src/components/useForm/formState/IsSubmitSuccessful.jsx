import React from "react";
import { useForm } from "react-hook-form";

export default function IsSubmitSuccessful() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful }, // We are extracting isSubmitSuccessful from formState
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />

      <button type="submit">Submit</button>

      {isSubmitSuccessful && <p>Form submitted successfully!</p>}
      {/* Show success message after successful submission */}
    </form>
  );
}
