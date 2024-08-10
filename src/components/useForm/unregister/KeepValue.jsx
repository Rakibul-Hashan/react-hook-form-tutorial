import { useForm } from "react-hook-form";

const KeepValue = () => {
  const { register, unregister, getValues, handleSubmit } = useForm({
    defaultValues: {
      firstName: "John",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <input {...register("lastName")} placeholder="Last Name" />
      <button
        type="button"
        onClick={() => {
          unregister("firstName", { keepValue: true });
          console.log(getValues("firstName"));
        }}
      >
        Unregister First Name
      </button>

      <input type="submit" />
    </form>
  );
};

export default KeepValue;
