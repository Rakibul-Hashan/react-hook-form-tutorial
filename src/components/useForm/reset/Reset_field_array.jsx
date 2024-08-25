import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export default function Reset_field_array() {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      loadState: "unloaded",
      names: [{ firstName: "Bill", lastName: "Luo" }],
    },
  });
  const { fields, remove } = useFieldArray({
    control,
    name: "names",
  });

  useEffect(() => {
    reset({ names: [
        {
          firstName: "Bob",
          lastName: "Actually",
        },
        {
          firstName: "Jane",
          lastName: "Actually",
        },
      ],});
  }, [reset]);

  const onSubmit = (data) => console.log("data", data);

  return (
    <>
      <h2>reset - Field Array example</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <input {...register(`names.${index}.firstName`)} />

              <Controller
                render={({ field }) => <input {...field} />}
                name={`names.${index}.lastName`}
                control={control}
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

        <input type="submit" />
      </form>
    </>
  );
}
