import { useFormContext } from "react-hook-form";
import TwoNested from "./TwoNested";

const NestedInput = () => {
  const { register } = useFormContext();
  return (
    <>
      <label>Nested Input</label>
      <input {...register("nestedInput")} />
      <hr />
      <TwoNested />
    </>
  );
};

export default NestedInput;
