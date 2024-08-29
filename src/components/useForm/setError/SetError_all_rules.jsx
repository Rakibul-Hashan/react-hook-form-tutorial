import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SetError_all_rules = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      disabledInput: "",
      serverError: "",
    },
    mode: "all",
    criteriaMode: "all", // To show multiple validation errors
  });

  // Simulate server-side validation
  // Simulate a server request that returns an error
  const mockServerRequest = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a server error
        reject({ statusCode: 400, message: "Server error occurred" });
      }, 1000);
    });
  };
  console.log(isValid);
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Simulate a server request
      await mockServerRequest();
      console.log("Form Data:", data);
    } catch (error) {
      // Handle server-side error
      setError("root.serverError", {
        type: "server",
        message: error.message || "An unexpected server error occurred",
      });
    }
  };

  // Example useEffect to set an error with multiple types
  useEffect(() => {
    setError("lastName", {
      types: {
        required: "This field is required",
        minLength: "Minimum length is 4 characters",
      },
    });
  }, [setError]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input with Validation Rules */}
        <label>Username</label>
        <input
          {...register("username", {
            minLength: {
              value: 4,
              message: "username should be minimum of 4 characters long",
            },
          })}
          placeholder="Enter username"
        />
        {errors.username && <p>{errors.username.message}</p>}

        {/* Input with Manual Error */}
        <label>First Name</label>
        <input {...register("firstName")} placeholder="Enter first name" />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        {/* Input with Disabled State */}
        <label>Disabled Input</label>
        <input
          {...register("disabledInput")}
          placeholder="Disabled Input"
          disabled
        />
        {errors.disabledInput && <p>{errors.disabledInput.message}</p>}

        {/* Input for Non-Registered Error */}
        <label>Non-Registered Input</label>
        <input placeholder="Non-registered Input" />
        {errors["notRegisteredInput"] && (
          <p>{errors["notRegisteredInput"].message}</p>
        )}

        {/* Input with Global Error */}
        <label>Last Name</label>
        <input {...register("lastName")} placeholder="Enter last name" />
        {errors.lastName && errors.lastName.types && (
          <>
            <p>{errors.lastName.types.required}</p>
            <p>{errors.lastName.types.minLength}</p>
          </>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={() => {
            setError(
              "username",
              { type: "custom", message: "Custom error message" },
              { shouldFocus: true }
            );
            setError("firstName", {
              type: "manual",
              message: "Manual error message",
            });
            setError(
              "disabledInput",
              { type: "focus", message: "Focus error message" },
              { shouldFocus: true }
            );
            setError("notRegisteredInput", {
              type: "custom",
              message: "Custom error for non-registered field",
            });
            setError("root.globalError", {
              type: "info",
              message: "Global error message",
            });
          }}
        >
          Trigger Errors
        </button>
        <input type="submit" />
      </form>

      {/* Display Form Validity */}
      <div>
        <p>Form Validity: {isValid ? "Valid" : "Invalid"}</p>
      </div>
    </div>
  );
};

export default SetError_all_rules;
