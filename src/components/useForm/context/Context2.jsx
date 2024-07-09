import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function Context2() {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const { register, handleSubmit, control, watch } = useForm({
    resolver: (data, context) => {
      const errors = {};
      if (context.isPremiumUser && !data.premiumField) {
        errors.premiumField = {
          type: "required",
          message: "This field is required for premium users.",
        };
      }
      return { values: data, errors };
    },
    context: { isPremiumUser },
  });

  const { fields, append } = useFieldArray({ control, name: "items" });

  const onSubmit = (data) => console.log(data);

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h1>2. Dynamic Field Example</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        <button type="button" onClick={() => setIsPremiumUser(!isPremiumUser)}>
          Toggle Premium User
        </button>

        {isPremiumUser && (
          <div>
            <input {...register("premiumField")} placeholder="Premium Field" />
          </div>
        )}

        <div>
          <button type="button" onClick={() => append({ name: "New Item" })}>
            Add Item
          </button>
          {fields.map((field, index) => (
            <input
              key={field.id}
              {...register(`items[${index}].name`)}
              defaultValue={field.name}
              placeholder={`Item ${index + 1}`}
            />
          ))}
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}
