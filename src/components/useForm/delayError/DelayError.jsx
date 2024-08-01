import { useForm } from "react-hook-form";
import "./delayError.css";
export default function CriteriaModeFirstError() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    delayError: 2000,
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

      <input type="submit" />
    </form>
  );
}
