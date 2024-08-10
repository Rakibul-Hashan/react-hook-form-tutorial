import { useForm } from "react-hook-form";

export default KeepDirty;

function KeepDirty() {
  const {
    register,
    unregister,
    formState: { isDirty, dirtyFields },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <button
        type="button"
        onClick={() => unregister("firstName")}
      >
        Unregister First Name
      </button>
      <input type="submit" />
      <p>Form is dirty: {isDirty ? "Yes" : "No"}</p>
      <p>Dirty fields: {JSON.stringify(dirtyFields)}</p>
    </form>
  );
}
