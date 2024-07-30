import { useForm } from "react-hook-form";
import "./criteriaMode.css";
export default function CriteriaModeAllError() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all", // All errors will be displayed
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
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors?.email?.types?.required && <p>Email is required</p>}
        {errors?.email?.types?.pattern && <p>Invalid email address</p>}
      </div>

      <div>
        <label>Username:</label>
        <input
          type="text"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 5,
              message: "Username must be at least 5 characters",
            },
          })}
        />
        {errors?.username?.types?.required && <p>Username is required</p>}
        {errors?.username?.types?.minLength && (
          <p>Username must be at least 5 characters</p>
        )}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Password must be at least 10 characters",
            },
            pattern: {
              value: /\d+/gi,
              message: "Password must contain at least one number",
            },
          })}
        />
        {/* without enter data for the password input will result both messages to appear */}
        {errors?.password?.types?.required && <p>password required</p>}
        {errors?.password?.types?.minLength && <p>password minLength 10</p>}
        {errors?.password?.types?.pattern && <p>password number only</p>}
      </div>

      <input type="submit" />
    </form>
  );
}
