import { useForm } from "react-hook-form";

export default function HandleSubmit__synch() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);
  // console.log(handleSubmit);

  return (
    <>
      <h2>handleSubmit - Sync</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input {...register("firstName")} />
        <input {...register("lastName")} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
