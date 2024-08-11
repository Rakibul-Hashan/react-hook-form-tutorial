import React from "react";
import { useForm } from "react-hook-form";

// Simulate an API call to fetch default values
const fetchDefaultValues = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: "defaultUser",
        email: "default@example.com",
      });
    }, 2000); // Simulate a 2-second delay
  });
};

export default function FormWithAsyncDefaults() {
  const {
    register,
    handleSubmit,
    formState: { isLoading, isValid, errors },
  } = useForm({
    defaultValues: async () => await fetchDefaultValues(),
    mode: "onChange", // Ensures validation happens on change
  });

  const onSubmit = async (data) => {
    console.log("Form Data Submitted:", data);
  };
console.log(isLoading);
  return (
    <>
      <h2>Form with Async Default Values</h2>
      {isLoading ? (
        <p>Loading form data...</p>
      ) : (
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
            {/* Conditionally render username validation error */}
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username.message}</p>
            )}
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
            {/* Conditionally render email validation error */}
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !isValid}
            style={{
              background: isLoading || !isValid ? "gray" : "blue",
              color: "white",
              cursor: isLoading || !isValid ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>

          {/* Displaying form state values */}
          <p>Is Loading: {isLoading ? "Yes" : "No"}</p>
        </form>
      )}
    </>
  );
}
