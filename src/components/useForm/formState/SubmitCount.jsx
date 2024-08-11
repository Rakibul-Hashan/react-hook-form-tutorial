import React from "react";
import { useForm } from "react-hook-form";

export default function SubmitCount() {
  const {
    register,
    handleSubmit,
    formState: { submitCount }, // We are extracting submitCount from formState
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("feedback")} placeholder="Your feedback" />

      <button type="submit">Submit</button>

      <p>You have submitted the form {submitCount} times.</p>
      {/* Show how many times the form has been submitted */}
    </form>
  );
}
