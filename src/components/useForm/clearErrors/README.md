![clearErrors](/src/components/useForm/clearErrors/clearErrors.jpg)

# Understanding the clearErrors Function in React Hook Form

## What is clearErrors? 🤔

`clearErrors` is a powerful function provided by React Hook Form that allows you to manually clear errors in your form. It's like having a magic eraser for your form errors! ✨

## Quick Overview 👀

Before we dive into the details, let's take a quick look at what `clearErrors` can do:

| Function                            | Description            | Example                                                      |
| ----------------------------------- | ---------------------- | ------------------------------------------------------------ |
| `clearErrors()`                     | Remove all errors      | `clearErrors()`                                              |
| `clearErrors("fieldName")`          | Remove single error    | `clearErrors("yourDetails.firstName")`                       |
| `clearErrors(["field1", "field2"])` | Remove multiple errors | `clearErrors(["yourDetails.lastName", "yourDetails.email"])` |

## Detailed Explanation 📚

### 1. Clearing All Errors 🧹

When you call `clearErrors()` without any arguments, it's like sweeping all the errors under the rug. Poof! They're gone! 🎩✨

```jsx
// This will clear ALL errors in your form
clearErrors();
```

⚠️ Warning: Use this carefully! You might want to keep some errors visible to the user.

### 2. Clearing a Single Error 🎯

If you want to be more precise, you can clear errors for a specific field:

```jsx
// This will clear the error for the 'firstName' field
clearErrors("firstName");

// You can also use dot notation for nested fields
clearErrors("userDetails.email");
```

### 3. Clearing Multiple Errors 🎭

Need to clear errors for multiple fields? No problem! Just pass an array of field names:

```jsx
// This will clear errors for both 'firstName' and 'lastName' fields
clearErrors(["firstName", "lastName"]);

// Works with nested fields too!
clearErrors(["userDetails.email", "userDetails.phone"]);
```

## Important Rules to Remember ⚠️

1. ❌ `clearErrors` does not affect the validation rules you've set up.
2. ❌ It doesn't change the `isValid` state in your form.
3. ✅ It only clears the error messages and error states.

## Real-World Example

Let's look at a practical example of how you might use `clearErrors` in a form:

```
import React from "react";
import { useForm } from "react-hook-form";

const MyAwesomeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: "First name is required" })} />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <input {...register("lastName", { required: "Last name is required" })} />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="button" onClick={() => clearErrors("firstName")}>
        Clear First Name Error
      </button>

      <button type="button" onClick={() => clearErrors(["lastName", "email"])}>
        Clear Last Name and Email Errors
      </button>

      <button type="button" onClick={() => clearErrors()}>
        Clear All Errors
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyAwesomeForm;
```

## When to Use clearErrors? 🕒

1. 🔄 When you want to reset errors after a user has corrected their input.
2. 🔀 When switching between form sections and you want to start with a clean slate.
3. 🔧 During form initialization if you want to ensure no errors are present.

## Conclusion 🎉

The `clearErrors` function is a handy tool in your React Hook Form toolbox. It gives you fine-grained control over error handling in your forms. Remember, with great power comes great responsibility – use it wisely! 🦸‍♂️🦸‍♀️

Happy coding, and may your forms be ever error-free! 🚀✨
