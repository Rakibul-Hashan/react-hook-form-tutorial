import React from "react";
import { useForm } from "react-hook-form";

export default function SimpleForm() {
  const {
    register,
    handleSubmit,
    formState: { isValidating, isValid, errors, validatingFields },
    setError,
    clearErrors,
  } = useForm({
    mode: "onSubmit", // Ensures validation happens on change
  });

  const onSubmit = (data) => {
    console.log("Form Submitted Successfully", data);
  };

  console.log("Validating:", isValidating);
  console.log("Numbers of fields are being validated:", validatingFields);
  return (
    <>
      <h2>Form Validation States</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Minimum length is 3" },
            })}
            placeholder="Username"
          />
          {/* Display username validation error */}
          <p style={{ color: "red" }}>{errors.username?.message}</p>
        </div>

        <div>
          <label>Email:</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
          />
          {/* Display email validation error */}
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isValidating || !isValid}
          style={{
            background: isValidating || !isValid ? "gray" : "blue",
            color: "white",
            cursor: isValidating || !isValid ? "not-allowed" : "pointer",
          }}
        >
          {isValidating ? "Validating..." : "Submit"}
        </button>

        {/* Displaying form state values */}
        <p>Is Validating: {isValidating ? "Yes" : "No"}</p>
        <p>
          Validating Fields:{" "}
          {validatingFields.length > 0 ? validatingFields.join(", ") : "None"}
        </p>
        <p>Is Form Valid: {isValid ? "Yes" : "No"}</p>
      </form>
    </>
  );
}
