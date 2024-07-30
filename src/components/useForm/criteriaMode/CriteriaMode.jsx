import { useForm } from "react-hook-form";

import "./criteriaMode.css";

export default function CriteriaMode() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once

    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="password"
        {...register("password", {
          required: true,
          minLength: 10,
          pattern: /\d+/gi,
        })}
      />
      {/* without enter data for the password input will result both messages to appear */}
      {errors?.password?.types?.required && <p>password required</p>}
      {errors?.password?.types?.minLength && <p>password minLength 10</p>}
      {errors?.password?.types?.pattern && <p>password number only</p>}

      <input type="submit" />
    </form>
  );
}
