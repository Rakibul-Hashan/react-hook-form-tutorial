import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Unregister_Options() {
  const {
    register,
    unregister,
    handleSubmit,
    formState: { isDirty, dirtyFields, errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
    },
    mode: "onChange",
  });

  const [showFirstName, setShowFirstName] = useState(true);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  const unregisterAll = () => {
    unregister("firstName", {
      keepDirty: true,
      keepTouched: true,
      keepIsValid: true,
      keepError: true,
      keepValue: true,
      keepDefaultValue: true,
    });

    setShowFirstName(false); // Unmount the input to prevent re-registration
    console.log("After Unregister:");
    console.log("isDirty:", isDirty);
    console.log("dirtyFields:", dirtyFields);
    // console.log("touchedFields:", formState.touchedFields);
    // console.log("isValid:", formState.isValid);
    // console.log("errors:", formState.errors);
    // console.log("Values:", getValues());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {showFirstName && (
        <>
          <input
            {...register("firstName", {
              required: "First name is required",
            })}
            placeholder="First Name"
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </>
      )}
      <input
        {...register("lastName", {
          required: "Last name is required",
        })}
        placeholder="Last Name"
      />
      {/* {formState.errors.lastName && <p>{formState.errors.lastName.message}</p>} */}

      <button
        type="button"
        onClick={() => {
          unregister("firstName", {
            keepDirty: true,
          });
          setShowFirstName(false);
        }}
      >
        Unregister First Name with All Options
      </button>
      <button type="button" onClick={() => reset()}>
        Reset Form
      </button>
      <input type="submit" value="Submit" />
    </form>
  );
}
