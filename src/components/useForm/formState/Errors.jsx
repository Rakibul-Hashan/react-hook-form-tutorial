import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Errors() {
  const [set, setSet]= useState()
  const {
    register,
    handleSubmit,

    formState: { errors }, // We are extracting errors from formState
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <>
      <h2>Errors</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: "Email is required",
          })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register("name", {
            required: "name is required",
            minLength: {
              value: 3,
              message: "name must be at least 3 characters",
            },
          })}
          placeholder="name"
        />
        {errors.name && <p>{errors.name.message}</p>}
        {/* Show error message if email validation fails */}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
