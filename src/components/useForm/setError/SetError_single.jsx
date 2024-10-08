
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SetError_single = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    setError("lastName", {
      types: {
        required: "This is required",
        minLength: "This is minLength",
      },
    });
  }, [setError]);

  return (
    <>
      <h2>Sigle field error</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Last Name</label>
        <input {...register("lastName")} />
        {errors.lastName && errors.lastName.types && (
          <p>{errors.lastName.types.required}</p>
        )}
        {errors.lastName && errors.lastName.types && (
          <p>{errors.lastName.types.minLength}</p>
        )}
        <input type="submit" />
      </form>
    </>
  );
};

export default SetError_single;
