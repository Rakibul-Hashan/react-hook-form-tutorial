import { useForm, FormProvider, useFormContext } from "react-hook-form";

export default function UseFormContext_test() {
  const methods = useForm(); // Step 1: Get all form methods

  const onSubmit = (data) => console.log(data); // Handle form submission

  return (
    <FormProvider {...methods}>
      {/* Step 2: Wrap your form in FormProvider */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Step 3: Use methods */}
        <NestedInput /> {/* Nested component using form methods */}
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

// Nested input that uses useFormContext
function NestedInput() {
  const { register } = useFormContext(); // Step 4: Retrieve hook methods inside child component

  return <input {...register("test")} />; // Step 5: Use "register" method
}
