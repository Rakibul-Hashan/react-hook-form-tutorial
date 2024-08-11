import React from "react";
import { useForm } from "react-hook-form";

export default function Errors() {
  const {
    register,
    handleSubmit,
    formState: { errors }, // We are extracting errors from formState
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}
      {/* Show error message if email validation fails */}

      <button type="submit">Submit</button>
    </form>
  );
}
