import { FormProvider, useForm } from "react-hook-form"; // Import FormProvider
import NestedInput from "./NestedInput";
import { Fragment } from "react";

export default function UseFormContext_full_example() {
  const methods = useForm(); // Get all methods from useForm
  const { register, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      {/* Pass all useForm methods here */}
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <label>Top Level Input</label>
        <input {...register("test")} />
        {/* Register an input */}
        <NestedInput /> {/* Nested input component */}
        <input type="submit" /> {/* Submit button */}
      </form>
    </FormProvider>
  );
}
