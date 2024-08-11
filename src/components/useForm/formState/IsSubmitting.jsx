import React from "react";
import { useForm } from "react-hook-form";

export default function IsSubmitting() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }, // We are extracting isSubmitting from formState
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {/* The button text changes and disables during submission */}
    </form>
  );
}
