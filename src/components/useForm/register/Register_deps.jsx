import React from "react";
import { useForm } from "react-hook-form";

function Register_deps() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);

  const inputAValue = watch("inputA"); // Watching the value of inputA
  const inputBValue = watch("inputB"); // Watching the value of inputB

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="inputA">Input A:</label>
      <input
        id="inputA"
        {...register("inputA", {
          required: "Input A is required",
          valueAsNumber: true, // Ensures the value is treated as a number
        })}
      />
      {errors.inputA && <p>{errors.inputA.message}</p>}

      <label htmlFor="inputB">Input B:</label>
      <input
        id="inputB"
        {...register("inputB", {
          required: "Input B is required",
          valueAsNumber: true, // Ensures the value is treated as a number
        })}
      />
      {errors.inputB && <p>{errors.inputB.message}</p>}

      <label htmlFor="inputC">Input C:</label>
      <input
        id="inputC"
        {...register("inputC", {
          validate: (value) => {
            const inputA = parseFloat(inputAValue);
            const inputB = parseFloat(inputBValue);
            const inputC = parseFloat(value);
            return (
              (!isNaN(inputA) &&
                !isNaN(inputB) &&
                inputC === inputA + inputB) ||
              "Input C must be the sum of Input A and Input B"
            );
          },
          valueAsNumber: true, // Ensures the value is treated as a number
        })}
      />
      {errors.inputC && <p>{errors.inputC.message}</p>}

      <input type="submit" />
    </form>
  );
}

export default Register_deps;
