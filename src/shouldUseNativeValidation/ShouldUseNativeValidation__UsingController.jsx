import { Controller, useForm } from "react-hook-form";

export default function ShouldUseNativeValidation__UsingController() {
  const { control, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
  <>
  <h1>Example using Controller</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        rules={{ required: "Please enter your first name." }}
        render={({ field }) => <input {...field} />}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Please enter your email.",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Entered value does not match email format.",
          },
        }}
        render={({ field }) => <input type="email" {...field} />}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Please enter your password.",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long.",
          },
        }}
        render={({ field }) => <input type="password" {...field} />}
      />
      <input type="submit" />
    </form>
  </>
  );
}
