import { useForm } from "react-hook-form";

export default function KeepTouchedFields() {
  const {
    register,
    unregister,
    formState: { touchedFields },
  } = useForm();

  return (
    <form>
      <input {...register("firstName")} placeholder="First Name" />
      <button
        type="button"
        onClick={() => unregister("firstName", { keepTouched: false })}
      >
        Unregister First Name
      </button>
      <p>Touched fields: {JSON.stringify(touchedFields)}</p>
    </form>
  );
}
