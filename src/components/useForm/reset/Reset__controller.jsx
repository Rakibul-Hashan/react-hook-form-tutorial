import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function Reset__controller() {
  const { handleSubmit, reset, control } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h2>reset - controller example</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => <input {...field} placeholder="First Name" />}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} placeholder="Last Name" />}
        />

        <input type="submit" />
        <input type="button" value="Reset" onClick={reset} />
        <input
          type="button"
          value="Reset with Values"
          onClick={() => {
            reset({
              firstName: "bill",
              lastName: "luo",
            });
          }}
        />
      </form>
    </>
  );
}
