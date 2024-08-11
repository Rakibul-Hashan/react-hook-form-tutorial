import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./isDirty.css";

function HobbiesForm() {
  const {
    register,
    control,
    formState: { isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      hobbies: [{ value: "Reading" }, { value: "Swimming" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((field, index) => (
          <li key={field.id}>
            <input
              type="text"
              {...register(`hobbies.${index}.value`)}
              defaultValue={field.value} // Ensure defaultValue is properly set
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => append({ value: "" })}>
        Add Hobby
      </button>
      <p>Form is dirty: {isDirty ? "Yes" : "No"}</p>
    </form>
  );
}

export default HobbiesForm;
