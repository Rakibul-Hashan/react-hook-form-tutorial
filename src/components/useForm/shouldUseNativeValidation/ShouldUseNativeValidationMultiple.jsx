import React from "react";
import { useForm } from "react-hook-form";
import "./ShouldUseNativeValidation.css"; // Assume this file contains the CSS

export default function ShouldUseNativeValidationMultiple() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: true,
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <h1>Multiple Fields Example</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name:</label>
          <input
            {...register("firstName", {
              required: "Please enter your first name.",
            })} // custom message
          />

          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter your email.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Entered value does not match email format.",
              },
            })}
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter your password.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            })}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}
