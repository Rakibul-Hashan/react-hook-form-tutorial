import { useState } from "react";
import { useForm } from "react-hook-form";

//  Enhanced Validation
export default function Context3() {
  const [isVerified, setIsVerified] = useState(false);

  const { register, handleSubmit } = useForm({
    resolver: (data, context) => {
      const errors = {};
      if (context.isVerified && !data.verifiedField) {
        errors.verifiedField = {
          type: "required",
          message: "This field is required for verified users.",
        };
      }
      return { values: data, errors };
    },
    context: { isVerified },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h1>Similar Example</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        {isVerified && (
          <input {...register("verifiedField")} placeholder="Verified Field" />
        )}
        <button type="button" onClick={() => setIsVerified(!isVerified)}>
          Toggle Verified
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
