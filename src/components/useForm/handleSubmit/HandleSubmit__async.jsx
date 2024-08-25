import { useForm } from "react-hook-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function HandleSubmit__async() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sleep(2000);
      if (data.username === "bill") {
        console.log(JSON.stringify(data));
      } else {
        console.log("There is an error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h2>handleSubmit - Async</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">User Name</label>
        <input placeholder="Bill" {...register("username")} />

        <input type="submit" />
      </form>
    </>
  );
}
