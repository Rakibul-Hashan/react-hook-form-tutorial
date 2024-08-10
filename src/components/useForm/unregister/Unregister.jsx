import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Unregister() {
  const { register, unregister, getValues, handleSubmit } = useForm({
    defaultValues: {
      firstName: "John",
    },
  });
  const [show, setShow] = useState(true);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {show && <input {...register("firstName")} placeholder="First Name" />}
      <input {...register("lastName")} placeholder="Last Name" />
      <button
        type="button"
        onClick={() => {
          unregister("firstName");
          setShow(false);
          console.log(getValues("firstName"));
        }}
      >
        Unregister First Name
      </button>

      <input type="submit" />
    </form>
  );
}
