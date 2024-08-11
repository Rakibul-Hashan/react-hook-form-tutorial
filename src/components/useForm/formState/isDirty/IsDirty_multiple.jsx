import React from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    formState: { isDirty },
    setValue,
  } = useForm({
    defaultValues: { username: "user123", password: "" },
  });

  return (
    <>
      <h2>Multiple Inputs</h2>
      <form>
        <input type="text" placeholder="Username" {...register("username")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p>Form is dirty: {isDirty ? "Yes" : "No"}</p>
      </form>
    </>
  );
}

export default LoginForm;
