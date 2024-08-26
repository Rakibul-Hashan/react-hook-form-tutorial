import * as React from "react";
import { useForm } from "react-hook-form";

export default function ResetField__w_options() {
  const {
    register,
    resetField,
    formState: { isDirty, isValid, errors, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
    },
  });

  return (
    <>
      <h2>resetField with options</h2>
      <form>
        <input {...register("firstName", { required: true, minLength: 5 })} />
        <p>isDirty: {isDirty && "dirty"}</p>
        {/* Show 'dirty' if the field has been modified */}
        <p>touchedFields: {touchedFields.firstName && "touched field"}</p>
        {/* Show if the field has been touched */}
        <p>dirtyFields:{dirtyFields.firstName && "dirty field"}</p>
        {/* Show if the field is dirty */}
        <p>isValid: {isValid && "valid"}</p>
        {/* Show 'valid' if the form is valid */}
        <p>error: {errors.firstName && "error"}</p>
        {/* Show 'error' if there's an error */}
        <hr />
        <button
          type="button"
          onClick={() => resetField("firstName", { keepError: true })}
        >
          Reset keep error
        </button>
        <button
          type="button"
          onClick={() => resetField("firstName", { keepTouched: true })}
        >
          Reset keep touched fields
        </button>
        <button
          type="button"
          onClick={() => resetField("firstName", { keepDirty: true })}
        >
          Reset keep dirty fields
        </button>
        <button
          type="button"
          onClick={() =>
            resetField("firstName", {
              keepValue: true,
              keepDirty: true,
              defaultValue: "New",
            })
          }
        >
          Update defaultValue
        </button>
      </form>
    </>
  );
}
