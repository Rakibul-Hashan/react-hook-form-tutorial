import { useForm } from "react-hook-form";

const Watch = () => {
  const { register, watch } = useForm({
    defaultValues: {
      inputName1: "This name",
    }
  });
  const singleInput = watch("inputName1", "Any name");
  const multiple = watch(["inputName1", "inputName2"]);
  const all = watch();
  console.log(singleInput);
  return (
    <>
      <h1>Watch</h1>
      <form>
        <input {...register("inputName1")} placeholder="Input 1" />
        <input {...register("inputName2")} placeholder="Input 2" />
        <input {...register("inputName3")} placeholder="Input 2" />
        <input {...register("inputName4")} placeholder="Input 2" />
        {/* <p>Input 1 Value: {watchInputs[0]}</p>{" "} */}
        {/* Display value of inputName1 */}
        {/* <p>Input 2 Value: {watchInputs[1]}</p>{" "} */}
        {/* Display value of inputName2 */}
      </form>
    </>
  );
};

export default Watch;
