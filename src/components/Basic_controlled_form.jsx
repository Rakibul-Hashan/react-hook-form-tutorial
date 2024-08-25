import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Basic_controlled_form() {
  // Step 1: Create state variables to track form input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { handleSubmit, register } = useForm();

  // Step 2: Handle form submission
  const onCustomSubmit = (data) => {
    console.log(data);
    // console.log(`First Name: ${firstName}, Last Name: ${lastName}`);
  };

  const onError = () => {

  };

  return (
    <>
      <h2>Basic Controlled Form</h2>
      <form onSubmit={handleSubmit(onCustomSubmit)}>
        {/* Step 3: Create input fields with value and onChange attributes */}
        <label>
          First Name:
          <input
            type="text"
            // value={firstName}
            // onChange={(e) => setFirstName(e.target.value)}
            {...register("firstName")}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            // value={lastName}
            // onChange={(e) => setLastName(e.target.value)}
            {...register("lastName")}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
