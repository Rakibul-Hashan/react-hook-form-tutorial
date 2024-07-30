import { useForm } from "react-hook-form";
import "./criteriaMode.css";
export default function CriteriaModeFirstError() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "firstError", // Only the first error will be displayed
    mode: "onChange",
  });

  const onSubmit = (data) => console.log(data);

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Entered value does not match email format",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Password must be at least 10 characters long",
            },
            pattern: {
              value: /\d+/gi,
              message: "Password must contain numbers",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <input type="submit" />
    </form>
  );
}
