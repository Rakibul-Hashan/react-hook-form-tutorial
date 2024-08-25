import React from "react";
import { useForm } from "react-hook-form";

function HandleSubmit__disabled() {
  // Step 1: Initialize the useForm hook
  const { register, handleSubmit } = useForm();

  // Step 2: Handle form submission
  const onSubmit = (data) => {
    console.log(data);
    // alert(`Username: ${data.username}, Email: ${data.email}`);
  };

  return (
    <>
      <h2>Disabled Fieldset</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 3: Create a disabled fieldset */}
        <fieldset disabled >
          <legend>Account Details</legend>

          {/* Step 4: Add a readonly input field within the disabled fieldset */}
          <label>
            Username:
            <input
              type="text"
              {...register("username")}
              //   defaultValue="JohnDoe"
              // readOnly
              disabled
            />
          </label>
          <br />

          <label>
            Email:
            <input
              type="email"
              {...register("email")}
              //   defaultValue="johndoe@example.com"
            />
          </label>
        </fieldset>

        {/* Submit button outside the disabled fieldset */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default HandleSubmit__disabled;
