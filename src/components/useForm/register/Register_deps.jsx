import React from "react";
import { useForm } from "react-hook-form";

function Register_deps() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const watchedValues = watch(["inputA", "inputB"]); // Watching the values of inputA and inputB

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="inputA">Input A:</label>
      <input
        id="inputA"
        {...register("inputA", { required: "Input A is required" })}
      />
      {errors.inputA && <p>{errors.inputA.message}</p>}

      <label htmlFor="inputB">Input B:</label>
      <input
        id="inputB"
        {...register("inputB", { required: "Input B is required" })}
      />
      {errors.inputB && <p>{errors.inputB.message}</p>}

      <label htmlFor="inputC">Input C:</label>
      <input
        id="inputC"
        {...register("inputC", {
          deps: ["inputA", "inputB"],
          validate: (value) =>
            value === watchedValues.inputA + watchedValues.inputB ||
            "Input C must be the sum of Input A and Input B",
        })}
      />
      {errors.inputC && <p>{errors.inputC.message}</p>}

      <input type="submit" />
    </form>
  );
}

export default Register_deps;
