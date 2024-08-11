import React from "react";
import { useForm } from "react-hook-form";

function AddressForm() {
  const {
    register,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      address: {
        street: "123 Main St",
        city: "Springfield",
        zip: "12345",
      },
    },
  });

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Street"
          {...register("address.street")}
        />
        <input type="text" placeholder="City" {...register("address.city")} />
        <input
          type="text"
          placeholder="Zip Code"
          {...register("address.zip")}
        />
      </form>
      <p>Form is dirty: {isDirty ? "Yes" : "No"}</p>
    </>
  );
}

export default AddressForm;
