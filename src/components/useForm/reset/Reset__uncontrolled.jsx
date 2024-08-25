import React from "react";
import { useForm } from "react-hook-form";

export default function Reset__uncontrolled() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
 

  //   const resetAsyncForm = useCallback(async () => {
  //     // Fetching user data from JSONPlaceholder API
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/users/1"
  //     );
  //     const data = await response.json();
  //     // console.log(data);
  //     // Resetting form with fetched data
  //     reset({
  //       firstName: data.name.split(" ")[0], // Assuming first name is the first part of 'name'
  //       lastName: data.name.split(" ")[1], // Assuming last name is the second part of 'name'
  //     });
  //   }, [reset]);

  //   useEffect(() => {
  //     resetAsyncForm();
  //   }, [resetAsyncForm]);
  console.log(isDirty);
  return (
    <>
      <h2>Uncontrolled example</h2>
      <form
        onSubmit={handleSubmit((data) => console.log("Submitted data:", data))}
      >
        <div>
          <label>First Name</label>
          <input {...register("firstName")} placeholder="First Name" />
        </div>
        <div>
          <label>Last Name</label>
          <input {...register("lastName")} placeholder="Last Name" />
        </div>

        <input
          type="button"
          value="Reset with Specific Values"
          onClick={() => {
            reset(
              {
                firstName: "bill",
              },
              {
                keepErrors: false, // 🛑 Keeps validation errors if any
                keepDirty: false, // 🔧 Keeps the dirty state
              }
            );
          }}
        />

        <button
          type="button"
          onClick={() => {
            reset((formValues) => ({
              ...formValues,
              lastName: "Smith", // Partial reset: Change only the last name
            }));
          }}
        >
          Reset Partial
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
