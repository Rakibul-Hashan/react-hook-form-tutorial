import React from "react";
import { useFormContext } from "react-hook-form";

const TwoNested = () => {
  const { register } = useFormContext();
  return (
    <div>
      <label htmlFor="">Deep nested</label>
      <input
        type="text"
        {...register("deepNested", {
          required: true,
        })}
      />
    </div>
  );
};

export default TwoNested;
