import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const fetchDefaultValues = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        firstName: "Jane",
        lastName: "Doe",
      });
    }, 2000); // Simulate a 2-second delay
  });
};

const RestOptionAndReset = () => {
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const getDefaultValues = async () => {
      const data = await fetchDefaultValues();
      setInitialValues(data);
    };
    getDefaultValues();
  }, []);

  const { register, handleSubmit, reset } = useForm({
    values: {
      firstName: "Rakibul",
      lastName: "Hashan",
    },
    defaultValues: async () => await fetchDefaultValues(),
    resetOptions: {
      keepDirtyValues: true, // Default: User-interacted input will be retained
      keepErrors: true, // Default: Input errors will be retained with value update
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    // Using the default reset options from useForm
    reset({ firstName: "John", lastName: "Smith" });

    // Overriding the default reset options
    // reset(
    //   { firstName: "Alice", lastName: "Johnson" },
    //   { keepDirtyValues: false, keepErrors: false } // This call will not retain dirty values or errors
    // );
  };

  // if (!initialValues) {
  //   return <div>Loading...</div>;
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rhf-form">
      <div className="rhf-form-group">
        <label className="rhf-label">First Name</label>
        <input
          {...register("firstName")}
          className="rhf-input"
          placeholder="First Name"
        />
      </div>
      <div className="rhf-form-group">
        <label className="rhf-label">Last Name</label>
        <input
          {...register("lastName")}
          className="rhf-input"
          placeholder="Last Name"
        />
      </div>
      <button type="submit" className="rhf-submit-button">
        Submit
      </button>
    </form>
  );
};

export default RestOptionAndReset;
