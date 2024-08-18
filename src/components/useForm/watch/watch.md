---
![Banner Image](https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630)

### Overview of `watch`

The `watch` function in `react-hook-form` allows you to monitor changes to form fields. It can be used to track individual fields, multiple fields, or all fields in a form. It’s useful when you need to respond to changes in specific fields or the entire form.

### Parameters

1. **`names` (optional)**: Specifies which fields to watch.
    - **`string`**: Watch a single input field by name.
    - **`string[]`**: Watch multiple input fields by their names.
    - **`(data, options) => void`**: Provide a callback function to be invoked with the form data and field information.
    - **`undefined`**: Watch all fields if no arguments are provided.
2. **`defaultValue` (optional)**: Provides a default value for fields that are not yet registered. If not provided, `watch` will return `undefined` for unregistered fields.

### Return Values

1. **`watch('inputName')`**: Returns the value of the input field named `inputName`. If the field is not registered, it returns `undefined`.
2. **`watch(['inputName1', 'inputName2'])`**: Returns an array of values for the specified fields.
3. **`watch()`**: Returns an object containing the values of all fields.
4. **`watch((data, { name, type }) => { ... })`**: Returns an object with an `unsubscribe` method. The callback is triggered whenever any watched field changes.

### **Rules**

1. **Default Value Handling**: When `defaultValue` is not set, `watch` will return `undefined` on the first render. To avoid this, you can provide `defaultValues` in `useForm` or set an inline default value.
2. **Re-rendering**: `watch` triggers a re-render of the root component or form. For better performance, consider using `useWatch` if performance becomes an issue.
3. **Value Comparison**: `watch` is optimized for rendering rather than `useEffect` dependencies. For value comparison, you might need a custom hook.

### Examples

### 1. Watching Specific Fields

Here’s an example of how to watch specific fields in a form:

```jsx
import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, watch, handleSubmit } = useForm();

  // Watch specific field
  const watchShowAge = watch("showAge", false); // default value is false
  const watchFields = watch(["showAge", "number"]); // watch multiple fields

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="checkbox" {...register("showAge")} />
      {watchShowAge && (
        <input type="number" {...register("age", { min: 50 })} />
      )}
      <input type="number" {...register("number")} />
      <input type="submit" />
    </form>
  );
}

```

In this example:

- `watch("showAge")` monitors the `showAge` field.
- `watch(["showAge", "number"])` monitors both `showAge` and `number` fields.
- The form conditionally shows an age input based on whether `showAge` is checked.

### 2. Watching All Fields

If you want to watch all fields, just call `watch()` without arguments:

```jsx
import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, watch, handleSubmit } = useForm();
  const watchAllFields = watch(); // Watches all fields

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("firstName")} />
      <input type="text" {...register("lastName")} />
      <input type="submit" />
      <pre>{JSON.stringify(watchAllFields, null, 2)}</pre> {/* Display all watched fields */}
    </form>
  );
}

```

In this example:

- `watch()` will return an object containing all form values, which can be displayed or used as needed.

### 3. Callback Version

If you need to perform actions whenever any field changes, use the callback version:

```jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, watch, handleSubmit } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log("Field changed:", value, name, type);
    });

    return () => subscription.unsubscribe(); // Clean up the subscription
  }, [watch]);

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name")} />
      <input type="email" {...register("email")} />
      <input type="submit" />
    </form>
  );
}

```

In this example:

- The `watch` function is used with a callback that logs field changes. The `unsubscribe` method is returned to clean up the subscription when the component unmounts.

### **4. Watch in a Field Array**

```jsx
jsxCopy code
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

function App() {
  const { register, control, handleSubmit, watch } = useForm();
  const { fields, remove, append } = useFieldArray({
    name: "test",
    control,
  });

  const onSubmit = (data) => console.log(data);

  console.log(watch("test")); // Watch field array

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input defaultValue={field.firstName} {...register(`test.${index}.firstName`)} />
          <input defaultValue={field.lastName} {...register(`test.${index}.lastName`)} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ firstName: "John", lastName: "Doe" })}
      >
        Append
      </button>
      <input type="submit" />
    </form>
  );
}

```

### Key Points

- **Default Values**: If no default value is set and the field is not yet registered, `watch` will return `undefined`.
- **Performance**: Watching all fields can impact performance. Use callbacks or the `useWatch` hook if needed.
- **Reactivity**: `watch` triggers a re-render in the root of your app or form whenever watched fields change.

This detailed breakdown should help you understand how to use `watch` effectively in `react-hook-form`. If you have any more questions or need further clarification, feel free to ask!

---

### All Use Cases of Watch API:

The `watch` API in `react-hook-form` is a versatile tool that can be used in various scenarios to enhance form behavior and interactivity. Below are some common usages of the `watch` API:

### 1. **Conditional Rendering**

- **Usage**: Display or hide form fields based on the value of other fields.
- **Example**: Show an additional input field for age only when a checkbox labeled "Show Age" is checked.
- **Code**:
  ```jsx
  const showAge = watch("showAge", false);
  {
    showAge && <input type="number" {...register("age")} />;
  }
  ```
- **Benefit**: Allows dynamic changes to the form layout based on user input.

### 2. **Real-Time Validation Feedback**

- **Usage**: Provide instant feedback or validation messages as the user types, without waiting for form submission.
- **Example**: Show a warning message if the user's input does not meet certain criteria, like a password strength indicator.
- **Code**:
  ```jsx
  const password = watch("password");
  {
    password && password.length < 8 && <p>Password is too short</p>;
  }
  ```
- **Benefit**: Improves user experience by guiding them through the form process.

### 3. **Synchronizing Form Values**

- **Usage**: Keep certain fields in sync or update related fields automatically when one field changes.
- **Example**: Automatically update a "Confirm Password" field if the main "Password" field changes.
- **Code**:
  ```jsx
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  {
    password !== confirmPassword && <p>Passwords do not match</p>;
  }
  ```
- **Benefit**: Ensures consistency across related fields in the form.

### 4. **Dynamic Form Updates**

- **Usage**: Adjust other form fields or options based on the current state of the form.
- **Example**: Disable or enable a submit button based on whether all required fields are filled out.
- **Code**:
  ```jsx
  const allFields = watch();
  const isFormValid = allFields.name && allFields.email; // Example check
  <input type="submit" disabled={!isFormValid} />;
  ```
- **Benefit**: Provides a more interactive and responsive form experience.

### 5. **Tracking Form Changes**

- **Usage**: Monitor all changes in a form and react to them, such as by logging changes for analytics or debugging.
- **Example**: Log every form change to the console for debugging purposes.
- **Code**:
  ```jsx
  React.useEffect(() => {
    const subscription = watch((value, { name }) => console.log(name, value));
    return () => subscription.unsubscribe();
  }, [watch]);
  ```
- **Benefit**: Helps in understanding user behavior and debugging complex forms.

### 6. **Field Array Management**

- **Usage**: Handle complex forms with dynamically added or removed fields, such as a list of items.
- **Example**: Monitor the values in a dynamic field array and update the UI accordingly.
- **Code**:
  ```jsx
  const fieldArray = watch("test"); // Example field array
  console.log(fieldArray);
  ```
- **Benefit**: Makes it easier to manage forms with a dynamic number of inputs.

### 7. **Setting Default Values**

- **Usage**: Pre-fill or set default values for fields based on existing data or user preferences.
- **Example**: Load default values from an API response and watch for any changes.
- **Code**:
  ```jsx
  const formValues = watch();
  // Load values into the form
  useEffect(() => {
    reset(apiData); // Example API data
  }, [apiData]);
  ```
- **Benefit**: Enhances form usability by allowing forms to adapt to existing data.

### 8. **Dynamic Form Field Validation**

- **Usage**: Apply dynamic validation rules based on the values of other fields.
- **Example**: Adjust the validation rules for a field based on another field's value (e.g., different rules for different user roles).
- **Code**:
  ```jsx
  const userRole = watch("role");
  const validationRules = userRole === "admin" ? { required: true } : {};
  <input {...register("username", validationRules)} />;
  ```
- **Benefit**: Allows flexible and context-aware form validation.

### 9. **Integrating with External APIs**

- **Usage**: Trigger actions or fetch data from external APIs when certain form values change.
- **Example**: Fetch city names when a user selects a country from a dropdown.
- **Code**:
  ```jsx
  const country = watch("country");
  React.useEffect(() => {
    if (country) {
      fetchCities(country).then(setCities); // Example API call
    }
  }, [country]);
  ```
- **Benefit**: Enhances the form by integrating external data based on user input.

---

### The Ultimate Example of Watch API:

### Comprehensive Example with `watch` API

```jsx
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

function App() {
  const { register, watch, handleSubmit, control, setValue } = useForm({
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
        Username (required for Admins):
        <input
          {...register(
            "username",
            userRole === "admin" ? { required: true } : {}
          )}
          placeholder="Enter your username"
        />
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
        Form Valid: {allFields.username || !userRole === "admin" ? "Yes" : "No"}
      </p>

      {/* Submit Button */}
      <input type="submit" disabled={!passwordsMatch} />
    </form>
  );
}

export default App;
```

### Explanation of the Example

1. **Conditional Rendering**:
   - The `showAge` checkbox controls whether the age input field is displayed.
2. **Real-Time Validation Feedback**:
   - The form checks if the password and confirm password fields match. If they don't, a warning message is displayed.
3. **Synchronizing Form Values**:
   - The form checks if the password and confirm password fields match and synchronizes them.
4. **Dynamic Form Updates**:
   - The form enables or disables the submit button based on whether the passwords match.
   - It dynamically updates the validation rules for the username field based on the selected user role.
5. **Field Array Management**:
   - A dynamic field array is used to handle a list of names, allowing users to add or remove entries.
6. **Setting Default Values**:
   - Default values are provided for various form fields using the `defaultValues` option in `useForm`.
7. **Dynamic Validation**:
   - The validation rule for the username field changes depending on the selected user role.
8. **Integrating with External API**:
   - The form fetches and displays a list of cities based on the selected country, simulating an API call.

### Conclusion

This example covers a wide range of `watch` API usages, demonstrating how you can create a complex and interactive form with dynamic behavior, real-time validation, and external data integration. Each part of the form reacts to user input, showcasing the power and flexibility of `react-hook-form` and the `watch` API.
