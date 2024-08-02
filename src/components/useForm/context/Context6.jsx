import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Context from "./Context";

export default function Context6() {
  const [externalData, setExternalData] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setExternalData({ minLength: 5 });
    }, 1000);
  }, []);

  const { register, handleSubmit } = useForm({
    resolver: (data, context) => {
      const errors = {};
      if (data.username.length < context.minLength) {
        errors.username = {
          type: "minLength",
          message: `Username must be at least ${context.minLength} characters long.`,
        };
      }
      return { values: data, errors };
    },
    context: externalData,
  });

  const onSubmit = (data) => console.log(data);

  if (!externalData) return <div>Loading...</div>;

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h1>3. Accessing External Data</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="Username" />
        <input type="submit" />
      </form>
    </div>
  );
}
