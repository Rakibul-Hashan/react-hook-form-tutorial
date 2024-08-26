import * as React from "react";
import { useForm } from "react-hook-form";

export default function ResetField___basic() {
  const {
    register,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
    },
  });

//   reset(name, options)
  const handleClick = () => resetField("firstName");

  return (
    <>
      <h2>resetField - Basic</h2>
      <form>
        <input {...register("firstName", { required: true })} />
        {isDirty && <p>{isDirty && "dirty"}</p>}
        {/* Show 'dirty' if the field has been modified */}
        {isValid && <p>{isValid && "valid"}</p>}
        {/* Show 'valid' if the form is valid */}
        <button type="button" onClick={handleClick}>
          Reset
        </button>
      </form>
    </>
  );
}
