import { useForm } from "react-hook-form";

export default function HandleSubmit__rule3() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      await fetchAPI(data); // async API call
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input type="submit" />
    </form>
  );
}
