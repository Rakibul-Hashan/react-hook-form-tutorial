import React from "react";
import { useForm } from "react-hook-form";

export default function Reset__options() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful, isValid, isDirty },
  } = useForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      email: "john.doe@example.com",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleReset = () => {
    reset(
      {
        firstName: "Jane",
        age: 25,
      },
      {
        keepErrors: true, // 🛑 Keep the validation errors if any
        keepDirty: true, // 🔧 Keep the dirty state (fields the user has touched)
        keepDirtyValues: false, // 🔄 Keep the dirty fields' values, reset the rest
        keepValues: false, // 🗂 Keep the current form values unchanged
        keepDefaultValues: true, // ⚙️ Keep the defaultValues the same
        keepIsSubmitted: true, // ✅ Keep the isSubmitted state unchanged
        keepTouched: true, // 👆 Keep the isTouched state unchanged
        keepIsValid: true, // 🟢 Keep the isValid state unchanged
        keepSubmitCount: true, // 🔢 Keep the submitCount state unchanged
      }
    );
  };
  console.log("isValid", isValid, "isDirty", isDirty);

  return (
    <>
      <h2>reset - Options</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input {...register("firstName")} />
        </div>
        <div>
          <label>Last Name</label>
          <input {...register("lastName")} />
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            {...register("age", {
              min: 35,
            })}
          />
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset with Options
        </button>
      </form>
    </>
  );
}
