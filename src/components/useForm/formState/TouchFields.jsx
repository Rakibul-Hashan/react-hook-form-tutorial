import React from "react";
import { useForm } from "react-hook-form";

export default function TouchFields() {
  const {
    register,
    handleSubmit,
    formState: { touchedFields }, // We are extracting touchedFields from formState
  } = useForm({ defaultValues: { email: "we@bd.com", password: "" } });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      <input {...register("password")} placeholder="Password" type="password" />

      <button type="submit">Submit</button>

      <pre>{JSON.stringify(touchedFields, null, 2)}</pre>
      {/* This will show which fields have been interacted with */}
    </form>
  );
}