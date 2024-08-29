import { useForm } from "react-hook-form";

const SetError_multiple = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const onSubmit = (data) => {
    console.log(data);
    clearErrors();
  };
  // setError("username", { type: custom, minLenght}, shouldFocus: true)
  return (
    <>
      <h2>Multiple Fields</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            },
            minLength: {
              value: 4,
              message: "username should be 4 char long",
            },
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <label>First Name</label>
        <input {...register("firstName")} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <button
          type="button"
          onClick={() => {
            const inputs = [
              {
                type: "manual",
                name: "username",
                message: "Double Check This",
              },
              {
                type: "manual",
                name: "firstName",
                message: "Triple Check This",
              },
            ];

            inputs.forEach(({ name, type, message }) =>
              setError(name, { type, message })
            );
          }}
        >
          Trigger Name Errors
        </button>
        <input type="submit" />
      </form>
    </>
  );
};

export default SetError_multiple;
