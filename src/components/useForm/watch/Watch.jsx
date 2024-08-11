import { useForm } from "react-hook-form";

const Watch = () => {
  const { register, watch } = useForm();

  const watchInputs = watch(["inputName1", "inputName2"]); // Watching multiple inputs

  return (
    <form>
      <input {...register("inputName1")} placeholder="Input 1" />
      <input {...register("inputName2")} placeholder="Input 2" />
      <p>Input 1 Value: {watchInputs[0]}</p> {/* Display value of inputName1 */}
      <p>Input 2 Value: {watchInputs[1]}</p> {/* Display value of inputName2 */}
    </form>
  );
};

export default Watch;
