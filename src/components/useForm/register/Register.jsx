import * as React from "react";
import { useForm } from "react-hook-form";
import Register_deps from "./Register_deps";

export default function Register() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      category: "",
      checkbox: [],
      radio: "",
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(console.log)}>
        <input
          {...register("name.firstName", {
            required: true,
            value: "bill",
          })}
          placeholder="First name"
        />

        <input {...register("name.lastName")} placeholder="Last name" />

        <select {...register("category")}>
          <option value="">Select...</option>
          <option value="A">Category A</option>
          <option value="B">Category B</option>
        </select>

        <input {...register("checkbox")} type="checkbox" value="A" />
        <input {...register("checkbox")} type="checkbox" value="B" />
        <input {...register("checkbox")} type="checkbox" value="C" />

        <input {...register("radio")} type="radio" value="A" />
        <input {...register("radio")} type="radio" value="B" />
        <input {...register("radio")} type="radio" value="C" />

        <input type="submit" />
      </form>

      <h1>deps</h1>
      <Register_deps />
    </>
  );
}
