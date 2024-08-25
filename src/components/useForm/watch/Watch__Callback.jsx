import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Watch__Callback() {
  const { register, watch, handleSubmit } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log("Field changed:", value, name, type);
    });
    console.log("👉👉👉", subscription);
    return () => subscription.unsubscribe(); // Clean up the subscription
  }, [watch]);

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h2>Watch with Callback</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <input type="email" {...register("email")} />
        <input type="submit" />
      </form>
    </>
  );
}
