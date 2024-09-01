![setError - useForm method | React Hook Form ](https://i.ibb.co/QXCMZ1R/set-Error-use-Form-method.png)
z
# **UNDERSTANDING `setError` METHOD IN REACT HOOK FORM**

---

**What is `setError`?**

**`setError`** is a function provided by **`react-hook-form`** that allows you to manually set one or more errors on a form field or fields. This function is useful when you want to display error messages to the user after async validation, such as when an API returns validation errors.

### 🛠️ **Function Signature**

```jsx
setError: (name: string, error: FieldError, { shouldFocus?: boolean }) => void
```

- **name**: The name of the input field where the error should be shown.
- **error**: An object that defines the type of error and an optional error message.
- **config**: An optional object where you can specify if the input should focus when the error is set.

### **Parameters Explained**

1. **`name` (string)**: The name of the input field where the error should be applied.

   📝 _Initial Value_: This should be the name you've given to your input field when using `register`.

2. **`error` (FieldError)**: This object contains the error type and an optional error message.
   - **`type`** (string): The type of error (e.g., "required", "manual", "custom").📝 _Initial Value_: `"required"`🛠️ _Value You Can Provide_: `"manual"`, `"custom"`, or any string that describes the error.
   - **`message`** (string, optional): A custom message to display when the error occurs.📝 _Initial Value_: `""`🛠️ _Value You Can Provide_: `"This field is required"`, `"Please check this field"`, etc.
   - **`types`** (MultipleFieldErrors, optional): Used for setting multiple errors for the same field.📝 _Initial Value_: `undefined`🛠️ _Value You Can Provide_: `{ required: "This is required", minLength: "This is too short" }`.
3. **`config` (object, optional)**: Configuration object with the following optional property:
   - **`shouldFocus`** (boolean): Whether to focus the input field when setting the error.📝 _Initial Value_: `false`🛠️ _Value You Can Provide_: `true` or `false`.

### 🔍 **Props in Detail**

| Prop Name | Type                                                             | Description                                                                                                           |
| --------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `name`    | `string`                                                         | The name of the input field. This is the same name used in the `register` function.                                   |
| `error`   | `{ type: string, message?: string, types: MultipleFieldErrors }` | The error object where you define the type of error and an optional error message.                                    |
| `config`  | `{ shouldFocus?: boolean }`                                      | An optional configuration object. If `shouldFocus` is true, the input will automatically focus when the error is set. |

---

## Rules:

### **1️⃣ Rule 1: Validation Rules Take Precedence**

**Why Does This Happen?**

In RHF, when you register an input field with specific validation rules (like `minLength`, `required`, etc.), the form's validation logic is built around these rules. The validation process is designed to automatically check if the input meets these requirements every time the form is submitted or when the field value changes.

- **Validation First**: The priority of the validation system in RHF is to ensure that any registered rules are evaluated before considering other error-handling logic.
- **Automatic Clearing**: When an input field passes all the registered validation rules, RHF assumes the input is valid, and any existing error messages related to that input are cleared automatically. This includes errors set manually with `setError`.

### 🧑‍🏫 **In-Depth Example:**

```jsx
register("registerInput", { minLength: 4 });
setError("registerInput", {
  type: "custom",
  message: "This is a custom error",
});
```

- **Validation Logic**:
  - If the input value is `"John"` (4 characters), it passes the `minLength` rule.
  - RHF checks this rule automatically and determines the input is valid.
- **Custom Error Handling**:
  - You've manually set an error using `setError`.
  - However, since the input value meets the `minLength` requirement, RHF sees no reason to keep the error around, so it removes the custom error.

### 🔍 **Why is This Important?**

- **Consistency**: This behavior ensures that the form always reflects the most accurate validation state. It prevents confusion by automatically removing errors when the user corrects their input.
- **Efficiency**: By prioritizing validation rules, RHF reduces the risk of conflicting error messages, leading to a smoother user experience.

### **2️⃣ Rule 2: Errors for Non-Registered Fields Persist Until Cleared**

**Why Does This Happen?**

When you set an error for a field that hasn't been registered with RHF, the form doesn't have any associated validation rules or context to handle that error automatically. Therefore, RHF doesn’t know when or how to clear this error, so it persists until you explicitly clear it using `clearErrors`.

- **Manual Control**: Non-registered fields are outside RHF's built-in validation system, so you need to manage them manually.
- **Persistence by Design**: Since RHF doesn't have any validation rules to check against for non-registered fields, it leaves the error in place, assuming you’ll remove it when appropriate.

**In-Depth Example:**

```jsx
setError("notRegisteredInput", {
  type: "custom",
  message: "This input has an error",
});
```

- **No Validation Logic**:
  - Since `notRegisteredInput` isn't registered, RHF doesn't track its value or apply any validation rules.
  - RHF can't automatically clear this error because it has no context for when the input might be valid.
- **Manual Clearing**:
  - You must manually call `clearErrors("notRegisteredInput")` to remove this error.

### 🔍 **Why is This Important?**

- **Flexibility**: This feature gives you the flexibility to handle errors for fields that aren’t part of the standard RHF validation flow. You have complete control over when these errors are shown and removed.
- **Use Cases**: This is useful for dynamic or conditionally rendered fields where the input might not always be part of the form, but you still need to show or hide errors based on certain conditions.

### **3️⃣ Rule 3: Global Errors Can Be Set Using the `root` Key**

### **Why Does This Happen?**

Global errors are meant to provide feedback for issues that aren't tied to a specific form field, such as server-side validation errors or general form submission issues. By using the `root` key, you can set errors that represent these broader problems.

- **Global Scope**: Errors set with the `root` key apply to the entire form or to non-field-specific issues, making them global.
- **Non-Persistent**: These errors aren't tied to the individual input fields and thus won't persist across form submissions. They are cleared after each submission to ensure that the form's error state is always up-to-date.

### 🧑‍🏫 **In-Depth Example:**

```jsx
setError("root.serverError", {
  type: "400",
  message: "There was an issue with the server",
});
```

**Full Example:**

```jsx
import React from "react";
import { useForm } from "react-hook-form";

const SetError_global_error = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // Mock server response based on the port number
  const mockServerResponse = (port) => {
    if (port === "8080") {
      return { status: 200, message: "Success" };
    } else if (port === "4000") {
      return { status: 403, message: "Forbidden: Access Denied" };
    } else {
      return { status: 400, message: "Bad Request: Invalid Port" };
    }
  };

  const onSubmit = async (data) => {
    // Simulate server response based on the port input
    const serverResponse = mockServerResponse(data.port);

    // Handle different server error cases
    if (serverResponse.status === 400) {
      setError("root.serverError", {
        type: "400",
        message: serverResponse.message,
      });
    } else if (serverResponse.status === 403) {
      setError("root.serverError", {
        type: "403",
        message: serverResponse.message,
      });
    } else if (serverResponse.status === 200) {
      alert("Login successful!");
    }
  };

  return (
    <>
      <h2>setError - Global Error</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label>Port</label>
        <input
          {...register("port", { required: "Port is required" })}
          placeholder="Enter port number"
        />
        {errors.port && <p>{errors.port.message}</p>}

        <button type="submit">Submit</button>

        {/* Display global server error */}
        {errors.root?.serverError && (
          <p>🚨 {errors.root.serverError.message}</p>
        )}
      </form>
    </>
  );
};

export default SetError_global_error;
```

- **Global Error Logic**:
  - This error is tied to a server-side issue, not a specific input.
  - RHF shows this error when the form is submitted, but it won't persist once the form is submitted again or the user interacts with the form.
- **Why Not Persistent?**:
  - Since global errors like server issues may not apply to subsequent submissions, RHF clears them to avoid misleading the user.

### 🔍 **Why is This Important?**

- **Server-Side Feedback**: It allows you to provide clear feedback when there are issues that affect the entire form, such as server validation errors.
- **User Experience**: By not persisting these errors, RHF ensures that the form state reflects the most current validation status, preventing old errors from confusing the user.

> _More details are discussed at the bottom of this documentation ⬇️_

### ⚠️ **Rule 4: `shouldFocus` Doesn't Work on Disabled Inputs**

### **Why Does This Happen?**

The `shouldFocus` option in `setError` is intended to automatically focus on an input field when an error occurs. However, a disabled input field is, by definition, not interactive, meaning the browser won't allow it to receive focus.

- **Browser Behavior**: This isn't specific to RHF but is a general behavior in HTML forms. Disabled inputs are skipped in the tab order and can't be focused on, even manually.
- **Intentional Design**: The purpose of disabling an input is to prevent user interaction, so it wouldn’t make sense for RHF to try to focus on a field the user can't interact with.

🧑‍🏫 **In-Depth Example:**

```jsx
setError(
  "disabledInput",
  { type: "focus", message: "This input has an error" },
  { shouldFocus: true }
);
```

- **Disabled Input**:
  - If `disabledInput` is disabled, calling `setError` with `shouldFocus: true` will not focus on it.
  - The browser prevents any attempt to focus on a disabled field.
- **Alternative**:
  - If you want to bring attention to an error but the input is disabled, you may need to re-enable the input first or show the error in a different way.

🔍 **Why is This Important?**

- **Understanding Browser Behavior**: Knowing this rule helps prevent confusion when working with disabled inputs. You understand that certain limitations are due to browser behavior, not issues with RHF.
- **User Experience**: Properly managing focus helps users quickly find and fix errors in your forms, but it’s important to ensure that this functionality aligns with the behavior of the inputs.

### 🔄 **Rule 5: `isValid` State is Forced to `false`**

### **Why Does This Happen?**

The `isValid` state in RHF is a form-level state that reflects whether the form is currently valid based on all registered fields' validation rules. When you manually set an error using `setError`, RHF automatically sets `isValid` to `false` because an error implies that the form is no longer in a valid state.

- **Validation First**: Despite setting an error, RHF continues to evaluate the form's validity based on the registered validation rules.
- **Rule Over Error**: Even if you manually set an error, if the form's inputs pass all registered validations, the `isValid` state will reflect that and remain `true`.

### 🧑‍🏫 **In-Depth Example:**

```jsx
setError("inputField", {
  type: "manual",
  message: "This field is manually marked as invalid",
});
```

- **Error Logic**:
  - You've manually set an error on `inputField`, which makes `isValid` set to `false` initially.
- **Validation Override**:
  - If `inputField` passes all registered validation rules on the next submission or input change, `isValid` will be updated to `true`.

🔍 **Why is This Important?**

- **Accurate Form State**: This ensures that `isValid` always reflects the true state of the form based on the validation rules, rather than being permanently influenced by manual errors.
- **Dynamic Error Handling**: You can set errors to guide users, but once they correct their inputs, the form's valid state is restored, providing a dynamic and responsive user experience.

### **6️⃣ Rule 6: Avoid `type` and `types` Keywords**

### **Why Does This Happen?**

In RHF, the `type` and `types` properties are reserved keywords used internally for specific purposes, such as defining the type of an input field or the type of error.

- **Conflict Risk**: If you use `type` or `types` in a way that conflicts with RHF's internal usage, it can lead to unexpected behavior or errors in your form.
- **Type Checking**: These keywords are also important for type checking in TypeScript, and misusing them can lead to type errors or issues during form validation.

🧑‍🏫In-Depth Example:

```jsx
setError("inputField", {
  type: "manual",
  message: "This field has a manual error",
  types: { manual: "This is a detailed error" },
});
```

- **Potential Confusion**:
  - Using `types` in this context could lead to confusion between what is an error type and what is part of the error message.
- **Best Practices**:
  - Avoid using `type` and `types` unless you're using them exactly as intended by RHF for defining error types or input types.

**Why is This Important?**

- **Code Clarity**: By reserving `type` and `types` for their intended purposes, you keep your code clear and avoid conflicts.
- **Error-Free Code**: This practice reduces the risk of introducing bugs or errors into your form handling logic, ensuring smoother development and maintenance.

---

### Detailed Explanation about Global `root` key example:

Let's enhance the example by simulating a scenario where the server checks the port number. If the port is correct, the server will accept the request; otherwise, it will return different errors like `400 Bad Request` or `403 Forbidden`. We'll simulate this by using a mock function to represent the server response.

### **Enhanced Example: Simulating Server Responses Based on Port Number**

```jsx
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // Mock server response based on the port number
  const mockServerResponse = (port) => {
    if (port === "8080") {
      return { status: 200, message: "Success" };
    } else if (port === "4000") {
      return { status: 403, message: "Forbidden: Access Denied" };
    } else {
      return { status: 400, message: "Bad Request: Invalid Port" };
    }
  };

  const onSubmit = async (data) => {
    // Simulate server response based on the port input
    const serverResponse = mockServerResponse(data.port);

    // Handle different server error cases
    if (serverResponse.status === 400) {
      setError("root.serverError", {
        type: "400",
        message: serverResponse.message,
      });
    } else if (serverResponse.status === 403) {
      setError("root.serverError", {
        type: "403",
        message: serverResponse.message,
      });
    } else if (serverResponse.status === 200) {
      alert("Login successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Username</label>
      <input {...register("username", { required: "Username is required" })} />
      {errors.username && <p>{errors.username.message}</p>}

      <label>Password</label>
      <input
        type="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <label>Port</label>
      <input
        {...register("port", { required: "Port is required" })}
        placeholder="Enter port number"
      />
      {errors.port && <p>{errors.port.message}</p>}

      <button type="submit">Submit</button>

      {/* Display global server error */}
      {errors.root?.serverError && <p>🚨 {errors.root.serverError.message}</p>}
    </form>
  );
};

export default LoginForm;
```

### **🔍 Detailed Breakdown:**

1. **Server-Side Response Simulation**:
   - **`mockServerResponse(port)`**: This function simulates different server responses based on the port number provided by the user. If the port is `"8080"`, the response is successful with a status `200`. Other ports like `"4000"` will trigger errors like `403 Forbidden`, and any other port will trigger a `400 Bad Request`.
2. **Handling Different Server Errors**:
   - **`if (serverResponse.status === 400)`**: Sets a `400 Bad Request` error if the port is invalid.
   - **`if (serverResponse.status === 403)`**: Sets a `403 Forbidden` error if access is denied for the port.
   - **`if (serverResponse.status === 200)`**: This is the successful login case where the server accepts the request.
3. **Displaying Errors**:
   - **`{errors.root?.serverError && (<p>🚨 {errors.root.serverError.message}</p>)}`**: This displays the appropriate error message to the user based on the server's response.

**🛠️ Key Points Recap:**

- **Port-Based Server Response**: The server's behavior changes based on the port number entered, demonstrating different error handling scenarios.
- **Global Server Error Handling**: Errors are displayed using the `"root.serverError"` key, ensuring they are treated as global issues affecting the entire form.
- **Error Messages**: The error messages provide clear feedback to the user based on the simulated server response.

1. **⚠️ Warnings & Tips**

- **Correct Port**: Make sure to use `"8080"` for a successful submission, as other ports will trigger errors.
- **Non-Persistent Errors**: Remember, these global errors will not persist after the form is re-submitted.
- **Error Handling**: Always handle global server errors carefully to provide a clear and concise message to the user.

This example provides a detailed demonstration of how to handle different server-side errors based on user input, specifically focusing on the port number. It showcases how you can use React Hook Form's `setError` method to manage global errors effectively.

---

## FAQ:

- What is the difference between setting error with root key and normally setting it?
  **Key Differences:**
  | **Feature** | **Normal Error Setting** | **Error Setting with `root` Key** |
  | --------------------- | ---------------------------------------------- | ------------------------------------------------------- |
  | **Scope** | Tied to a specific field | Applies to the entire form |
  | **Error Location** | Appears next to the field it’s associated with | Can be displayed anywhere, often at the top of the form |
  | **Clearing Behavior** | Cleared when the field passes validation | Must be cleared manually (e.g., with `clearErrors()`) |
  | **Use Case** | Field-specific validation errors | Global issues like server errors, form-level validation |
  | **Persistence** | Automatically cleared upon field validation | Automatically cleared on each form submission |
