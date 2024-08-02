import React from "react";
import { useForm } from "react-hook-form";
import "./ShouldUseNativeValidation.css"; // Assume this file contains the CSS

export default function ShouldUseNativeValidationBasic() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    shouldUseNativeValidation: true,
  });
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <h1>Basic Example</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name:</label>
          <input
            {...register("firstName", {
              required: "Please enter your first name. 🙂",
            })} // custom message
          />

          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <input type="submit" />
      </form>
    </>
  );
}
