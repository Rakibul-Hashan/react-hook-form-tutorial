import React from "react";
import { useForm } from "react-hook-form";

export default function UltimateFormStateExample() {
  const {
    register,
    handleSubmit,
    formState: { isValidating, validatingFields, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange", // Ensures validation happens on change
  });

  // Simulated async validation for the username
  const asyncValidateUsername = async (username) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "takenUsername") {
          reject("Username is already taken");
        } else {
          resolve();
        }
      }, 1500);
    });
  };

  const onSubmit = async (data) => {
    console.log("Form Submitted Successfully", data);
  };

  const handleValidation = async (data) => {
    try {
      // Start validating the username
      await asyncValidateUsername(data.username);
      clearErrors("username"); // Clear error if validation passes
      handleSubmit(onSubmit)(); // Proceed to submit the form
    } catch (error) {
      setError("username", { type: "manual", message: error });
    }
  };

  const getButtonStyle = () => {
    if (isValidating || !isValid) {
      return {
        background: "gray",
        color: "white",
        cursor: "not-allowed",
      };
    }
    return {
      background: "blue",
      color: "white",
      cursor: "pointer",
    };
  };

  return (
    <>
      <h2>isValidating, validatingFields, isValid</h2>
      <form onSubmit={handleSubmit(handleValidation)}>
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
          <p>{validatingFields.includes("username") ? "Validating username..." : ""}</p>
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
        </div>

        <button
          type="submit"
          disabled={isValidating || !isValid}
          style={getButtonStyle()}
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
