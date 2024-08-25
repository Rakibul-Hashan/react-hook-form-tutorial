import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Reset_submit_w_reset() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { something: "any" } });

  const onSubmit = (data) => {
    // It's recommended to reset in useEffect as execution order matters
    // reset({ ...data })
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      console.log("Submitted Successfully");
      reset({ something: "" });
    }
  }, [formState, reset]);

  return (
    <>
      <h2>reset - Submit with isSubmitSuccessful</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("something", {
            required: true,
            minLength: 5,
          })}
        />
        <input type="submit" />
      </form>
    </>
  );
}
