import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
// import Headers from "./Header";

let renderCount = 0;

export default function Context() {
  const [isValid, setIsValid] = useState(true);

  const { register, handleSubmit, control } = useForm({

    resolver: (data, context) => {

      return {
        values: context?.isValid ? data : {},
        errors: context?.isValid
          ? {}
          : {
              firstName: {
                type: "isValid",
                message: "Message here.",
              },
            },
      };
    },
    context: {
      isValid,
      
    },
  });

  const onSubmit = (data) => console.log(data);

  useFieldArray({ control, name: "cityList", keyName: "id" });

  renderCount++;

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      {/* <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      /> */}
      <h1>0. Main Example</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} placeholder="First Name" />
        <button type="button" onClick={() => setIsValid(!isValid)}>
          Toggle Valid : {isValid.toString()}
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
