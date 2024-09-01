import React from "react";
import { useForm } from "react-hook-form";

const ClearErrors = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({
    mode: "onChange",
  });
  console.log("errors", errors);
  const onSubmit = (data) => console.log(data);
  // clearErrors("name.firstName")
  // clearErrors(["firstName", "lastName"])
  // clearErrors()
  // setError()
  return (
    <>
      <h1>ClearErrors - useForm method</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstName", { required: "First name is required" })}
          placeholder="First name"
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <input
          {...register("lastName", { required: "Last name is required" })}
          placeholder="Last name"
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <button type="button" onClick={() => clearErrors("firstName")}>
          Clear First Name Error
        </button>

        <button
          type="button"
          onClick={() => clearErrors(["lastName", "email"])}
        >
          Clear Last Name and Email Errors
        </button>

        <button type="button" onClick={() => clearErrors()}>
          Clear All Errors
        </button>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ClearErrors;
