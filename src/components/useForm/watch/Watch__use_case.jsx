import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

function Watch__use_case() {
  const { register, watch, handleSubmit, control, setValue, formState:{errors} } = useForm({
    defaultValues: {
      showAge: false,
      userRole: "user",
      test: [{ firstName: "John", lastName: "Doe" }],
      country: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "test",
    control,
  });

  const [cities, setCities] = useState([]);

  // Watch various fields
  const showAge = watch("showAge");
  const userRole = watch("userRole");
  const allFields = watch();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const selectedCountry = watch("country");

  // Real-time validation: Password match
  const passwordsMatch = password === confirmPassword;

  // Fetch cities when country changes
  useEffect(() => {
    if (selectedCountry) {
      fetchCities(selectedCountry).then(setCities); // Simulate API call
    }
  }, [selectedCountry]);

  const fetchCities = async (country) => {
    // Simulate an API call that returns city names based on the country
    const cityData = {
      USA: ["New York", "Los Angeles", "Chicago"],
      Canada: ["Toronto", "Vancouver", "Montreal"],
    };
    return cityData[country] || [];
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <h2>Watch — use cases</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Conditional Rendering */}
        <label>
          Show Age:
          <input type="checkbox" {...register("showAge")} />
        </label>
        {showAge && (
          <input
            type="number"
            {...register("age", { min: 18 })}
            placeholder="Enter your age"
          />
        )}

        {/* Dynamic Validation */}
        <label>
          User Role:
          <select {...register("userRole")}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label>
          {userRole === "admin" ? "Admin Username (required):" : "Username:"}
          <input
            {...register(
              "username",
              userRole === "admin" ? { required: true } : {
                required: false
              }
            )}
            placeholder="Enter your username"
          />
           {/* Display error message if the username is required and not provided */}
      {errors.username && <p style={{ color: "red" }}>Username is required for Admins.</p>}
        </label>


        {/* Real-Time Validation Feedback */}
        <label>
          Password:
          <input type="password" {...register("password")} />
        </label>
        <label>
          Confirm Password:
          <input type="password" {...register("confirmPassword")} />
        </label>
        {!passwordsMatch && (
          <p style={{ color: "red" }}>Passwords do not match</p>
        )}

        {/* Field Array Management */}
        <h3>Dynamic Field Array</h3>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              defaultValue={field.firstName}
              {...register(`test.${index}.firstName`)}
              placeholder="First Name"
            />
            <input
              defaultValue={field.lastName}
              {...register(`test.${index}.lastName`)}
              placeholder="Last Name"
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ firstName: "", lastName: "" })}
        >
          Add Name
        </button>

        {/* Integrating with External API */}
        <h3>Select Country and City</h3>
        <label>
          Country:
          <select {...register("country")}>
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
          </select>
        </label>
        {cities.length > 0 && (
          <label>
            City:
            <select {...register("city")}>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* Dynamic Form Updates */}
        <p>
          Form Valid:{" "}
          {allFields.username || !userRole === "admin" ? "Yes" : "No"}
        </p>

        {/* Submit Button */}
        <input type="submit" disabled={!passwordsMatch} />
      </form>
    </>
  );
}

export default Watch__use_case;
