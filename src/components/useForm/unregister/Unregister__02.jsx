import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Unregister__02() {
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "Jane",
      checkbox: true,
    },
  });

  const onSubmit = (data) => console.log(data);

  const checkbox = watch("checkbox");

  useEffect(() => {
    if (!checkbox) {
      console.log("Unregistering firstName");
      unregister("firstName", {
        // keepValue: false,
        keepDefaultValue: true,
      });
    }
  }, [unregister, checkbox]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {checkbox && (
          <input
            {...register("firstName", { required: true })}
            placeholder="First Name"
          />
        )}
        {errors.firstName && (
          <p style={{ color: "red" }}>First name is required</p>
        )}
        <label>
          <input type="checkbox" {...register("checkbox")} />
          Checkbox
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
