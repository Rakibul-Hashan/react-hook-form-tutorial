import React from "react";
import { useForm } from "react-hook-form";

function EmailForm() {
  const {
    register,
    formState: { isDirty },
    setValue,
  } = useForm({
    defaultValues: { email: "user@example.com" },
  });

  return (
    <div>
      <h2>Single Input</h2>
      <form>
        <input type="email" {...register("email")} />
      </form>
      <p>Form is dirty: {isDirty ? "Yes" : "No"}</p>
    </div>
  );
}

export default EmailForm;
