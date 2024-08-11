import React from "react";
import { useForm } from "react-hook-form";

export default function DirtyFields() {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }, // We are extracting dirtyFields from formState
  } = useForm({ defaultValues: { firstName: "", lastName: "" } });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <input {...register("lastName")} placeholder="Last Name" />

      <button type="submit">Submit</button>

      <pre>{JSON.stringify(dirtyFields, null, 2)}</pre>
      {/* This will show which fields have been modified */}
    </form>
  );
}
