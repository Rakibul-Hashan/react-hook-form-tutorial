import { useState } from "react";
import { useForm } from "react-hook-form";

const KeepIsValid = () => {
  const [show, setShow] = useState(true);
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // This ensures that isValid updates in real-time
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const unregisterField = () => {
    unregister("firstName", { keepIsValid: true });
    // setShow(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {show && (
          <>
            <label>First Name</label>
            <input
              {...register("firstName", {
                required: "First Name is required",
                minLength: {
                  value: 3,
                  message: "First Name must be at least 3 characters long",
                },
              })}
              placeholder="First Name"
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </>
        )}
      </div>

      <div>
        <label>Last Name</label>
        <input
          {...register("lastName", {
            required: "Last Name is required",
            minLength: {
              value: 3,
              message: "Last Name must be at least 3 characters long",
            },
          })}
          placeholder="Last Name"
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      <button type="button" onClick={unregisterField}>
        Unregister First Name
      </button>

      <p>Form is valid: {isValid ? "Yes" : "No"}</p>
      <input type="submit" />
    </form>
  );
};

export default KeepIsValid;
