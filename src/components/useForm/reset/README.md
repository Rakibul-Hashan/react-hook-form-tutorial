![Banner Image](https://i.ibb.co/58yHfNt/reste-useform-method.pnghttps://i.ibb.co/0XNL7F2/reset-use-Form-method.png)

# **reset() - useForm method**
---

## **What is the `reset` function?**

The **`reset`** function is a part of the React Hook Form library, which allows you to reset the entire form state, fields reference, and subscriptions. It's a powerful function that helps you manage your form's state and behavior.

### Syntax

```jsx
// Vanilla JS Snippet
function reset(values, options) {
    // Function body goes here
    // No return statement is needed, which means the function returns `undefined` by default.
}

// TypeScript Snippet
reset(values?: T | ResetAction<T>, options?: Record<string, boolean>) => void
```

- `values?`: An optional object where you can pass new values for the form fields. If you don't pass anything, the form will reset to its initial state (the state it had when the form was first rendered).
- `options?`: An optional object to control which parts of the form state you want to retain or reset.

**Summary**

1. Resetting a form to its initial state 🔄
2. Updating the entire form with a new value 💻
3. Keeping default values while updating the form 📝
4. Using options to customize the reset behavior 🤔
5. Resetting a form inside an **`onSubmit`** function ⚠️
6. Partially resetting a form 🤝
7. Differences between the **`reset`** API and the **`setValue`** API 🤔

### **Key Takeaways**

1. The **`reset`** API can be used to reset a form to its initial state, update the entire form with a new value, or keep default values while updating the form 📝.
2. The **`reset`** API provides options to customize the reset behavior, such as keeping default values, errors, or values 🤔.
3. Resetting a form inside an **`onSubmit`** function can be problematic due to the asynchronous nature of the function ⚠️.
4. It's recommended to reset the form after it has been successfully submitted, using the **`isSubmitSuccessful`** property 👍.
5. The **`reset`** API can be used to partially reset a form by combining it with the **`getValues`** API 🤝.
6. The main difference between the **`reset`** API and the **`setValue`** API is that **`reset`** is used for bulk updates and wipes away form state, while **`setValue`** is used for single value updates and doesn't manipulate form state 🤔.

⚠️ Warning: Resetting a form inside an **`onSubmit`** function can be problematic due to the asynchronous nature of the function.

🚫 Don't: Use the **`reset`** API inside an **`onSubmit`** function without considering the asynchronous nature of the function.

👍 Do: Reset the form after it has been successfully submitted, using the **`isSubmitSuccessful`** property.

---

## `reset` Options or props

### 1. **`values` (Optional Object)**

- **What it does**: This is an object you can pass to the `reset` function to set specific values in your form when you reset it. It's like saying, "When I reset the form, I want these fields to have these specific values."
- **Example**:
    
    ```jsx
    reset({
      firstName: "John",
      lastName: "Doe"
    });
    ```
    
    - **Explanation**: When you reset the form with this `values` object, the `firstName` field will be set to "John" and the `lastName` field will be set to "Doe."
- **⚠️ Warning**: It's recommended to provide the **entire** `defaultValues` when you use this option. If you don’t, only the fields you specify will be updated, and others might stay unchanged.

### 2. **`keepErrors` (boolean)**

- **What it does**: If you set `keepErrors` to `true`, any validation errors that are currently in the form will remain after the reset.
- **Example**:
    
    ```jsx
    reset({
      firstName: "John"
    }, {
      keepErrors: true
    });
    ```
    
    - **Explanation**: If your form had errors (like missing required fields), those errors will stay even after resetting with the new value "John" for `firstName`.
- **⚠️ Important**: 🛑 Even though the errors remain, this does not guarantee they will stay if the user interacts with the form again. Any new user actions might trigger new validations or clear the errors.

### 3. **`keepDirty` (boolean)**

- **What it does**: If you set `keepDirty` to `true`, the form's "dirty" state will remain. "Dirty" means the user has made changes to the form fields.
- **Example**:
    
    ```jsx
    reset(
      {
        firstName: "John",
      },
      {
        keepDirty: true,
      }
    );
    ```
    
    - **Explanation**: If the user had changed the `firstName` field from "John" to something else, and you reset it, the form will remember that it was modified ("dirty") even though it’s reset to "John."
- **⚠️ Important**: 🛑 This option only keeps track of which fields were modified, not the actual values the user typed in.

### 4. **`keepDirtyValues` (boolean)**

- **What it does**: This option is a bit more complex. It keeps the values of the fields that were modified by the user and resets only the fields that weren’t changed.
- **Example**:
    
    ```jsx
    reset(
      {
        firstName: "John",
        lastName: "Doe",
      },
      {
        keepDirtyValues: true,
      }
    );
    ```
    
    - **Explanation**: If the user changed `firstName` but left `lastName` untouched, `keepDirtyValues` will reset only `lastName` to "Doe" and keep whatever the user typed into `firstName`.
- **⚠️ Important**: 🛑 You need to subscribe to `formState.dirtyFields` for this to work properly, which means your form should keep track of which fields were modified by the user.

### 5. **`keepValues` (boolean)**

- **What it does**: If you set `keepValues` to `true`, the form's input values will stay the same even after resetting the form.
- **Example**:
    
    ```jsx
    reset(undefined, {
      keepValues: true,
    });
    ```
    
    - **Explanation**: This will reset the form state (like clearing errors or submitting state), but the actual input values will remain the same.

### 6. **`keepDefaultValues` (boolean)**

- **What it does**: This option keeps the initial default values that were set when you first created the form with `useForm`.
- **Example**:
    
    ```jsx
    reset(undefined, {
      keepDefaultValues: true,
    });
    ```
    
    - **Explanation**: If you reset the form and use this option, it will keep using the original default values for comparison and validation.
- **🛠 How it works**: After the reset, the form checks if any new values provided during reset are different from the original `defaultValues`. If they are, the form will update its state to reflect these changes.

### 7. **`keepIsSubmitted` (boolean)**

- **What it does**: This option keeps the `isSubmitted` state unchanged. The `isSubmitted` state is `true` after the form has been successfully submitted.
- **Example**:
    
    ```jsx
    reset(undefined, {
      keepIsSubmitted: true,
    });
    ```
    
    - **Explanation**: If you reset the form after it’s been submitted, this option ensures that the form still "remembers" it was submitted.

### 8. **`keepTouched` (boolean)**

- **What it does**: This keeps the `isTouched` state unchanged. The `isTouched` state tracks whether a user has interacted with a field.
- **Example**:
    
    ```jsx
    reset(undefined, {
      keepTouched: true
    });
    
    ```
    
    - **Explanation**: Even after resetting the form, this option ensures that the form still "remembers" which fields the user interacted with.

### 9. **`keepIsValid` (boolean)**

- **What it does**: This keeps the `isValid` state temporarily the same until the user interacts with the form again.
- **Example**:
    
    ```jsx
    reset(undefined, {
      keepIsValid: true
    });
    
    ```
    
    - **Explanation**: After resetting the form, this option keeps the validation state (whether the form is valid or not) unchanged until the user makes further changes.

### 10. **`keepSubmitCount` (boolean)**

- **What it does**: This option keeps the `submitCount` unchanged. The `submitCount` tracks how many times the form has been submitted.
- **Example**:
    
    ```jsx
    reset(undefined, {
      keepSubmitCount: true
    });
    
    ```
    
    - **Explanation**: After resetting the form, the number of times the form was submitted will remain the same.
    

### Ultimate Example:

```jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      email: "john.doe@example.com",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleReset = () => {
    reset(
      {
        firstName: "Jane",
        age: 25,
      },
      {
        keepErrors: true, // 🛑 Keep the validation errors if any
        keepDirty: true, // 🔧 Keep the dirty state (fields the user has touched)
        keepDirtyValues: true, // 🔄 Keep the dirty fields' values, reset the rest
        keepValues: true, // 🗂 Keep the current form values unchanged
        keepDefaultValues: true, // ⚙️ Keep the defaultValues the same
        keepIsSubmitted: true, // ✅ Keep the isSubmitted state unchanged
        keepTouched: true, // 👆 Keep the isTouched state unchanged
        keepIsValid: true, // 🟢 Keep the isValid state unchanged
        keepSubmitCount: true, // 🔢 Keep the submitCount state unchanged
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <input {...register("firstName")} />
      </div>
      <div>
        <label>Last Name</label>
        <input {...register("lastName")} />
      </div>
      <div>
        <label>Age</label>
        <input type="number" {...register("age")} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
      </div>

      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>
        Reset with Options
      </button>
    </form>
  );
}
```

---

### Summary Table 📝

| Option | Type | What It Does |
| --- | --- | --- |
| **`values`** | Object | Resets form with specific values you provide. |
| **`keepErrors`** | Boolean | Keeps validation errors even after reset. ⚠️ |
| **`keepDirty`** | Boolean | Keeps track of modified fields after reset (but not the actual values). ⚠️ |
| **`keepDirtyValues`** | Boolean | Keeps values of modified fields, resets only unmodified fields. ⚠️ |
| **`keepValues`** | Boolean | Keeps the form input values unchanged. |
| **`keepDefaultValues`** | Boolean | Keeps the initial `defaultValues` for future validation and comparison. |
| **`keepIsSubmitted`** | Boolean | Keeps the `isSubmitted` state unchanged. |
| **`keepTouched`** | Boolean | Keeps track of which fields were interacted with. |
| **`keepIsValid`** | Boolean | Keeps the form's validity state temporarily unchanged. ⚠️ |
| **`keepSubmitCount`** | Boolean | Keeps the count of how many times the form was submitted. |

These options give you great flexibility to control how your form behaves when you reset it. You can choose to keep certain states (like errors or dirty fields) while resetting others. Practice using these options to get a feel for how they can help you manage your forms! 💪

---

## Examples:

**Uncontrolled:**

```jsx
import React, { useCallback } from "react"
import { useForm } from "react-hook-form"

export default function App() {
  const { register, handleSubmit, reset } = useForm()
  const resetAsyncForm = useCallback(async () => {
    const result = await fetch("./api/formValues.json") // result: { firstName: 'test', lastName: 'test2' }
    reset(result) // asynchronously reset your form values
  }, [reset])

  useEffect(() => {
    resetAsyncForm()
  }, [resetAsyncForm])

  return (
    <form onSubmit={handleSubmit((data) => {})}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />

      <input
        type="button"
        onClick={() => {
          reset(
            {
              firstName: "bill",
            },
            {
              keepErrors: true,
              keepDirty: true,
            }
          )
        }}
      />

      <button
        onClick={() => {
          reset((formValues) => ({
            ...formValues,
            lastName: "test",
          }))
        }}
      >
        Reset partial
      </button>
    </form>
  )
}
```

**Controller:**

```jsx
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function Reset__controller() {
  const { handleSubmit, reset, control } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h2>reset - controller example</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => <input {...field} placeholder="First Name" />}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} placeholder="Last Name" />}
        />

        <input type="submit" />
        <input type="button" value="Reset" onClick={reset} />
        <input
          type="button"
          value="Reset with Values"
          onClick={() => {
            reset({
              firstName: "bill",
              lastName: "luo",
            });
          }}
        />
      </form>
    </>
  );
}
```

In this particular example 

When the user interacts with the form, the following happens:

1. **Submit**: When the user clicks the "Submit" button, the form data is logged to the console. For example, if the user enters "John" in the "First Name" field and "Doe" in the "Last Name" field, the console output would be:

```jsx
{ firstName: "John", lastName: "Doe" }
```

1. **Reset**: When the user clicks the "Reset" button, the form is reset to its initial state. This means that both input fields are cleared, and any entered data is lost.
2. **Reset with Values**: When the user clicks the "Reset with Values" button, the form is reset to a specific set of values. In this case, the "First Name" field is set to "bill" and the "Last Name" field is set to "luo". The form is updated to reflect these new values.

That's the basic output and behavior of this React component!

**Field Array**

```jsx
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

export default function Reset_field_array() {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      loadState: "unloaded",
      names: [{ firstName: "Bill", lastName: "Luo" }],
    },
  });
  const { fields, remove } = useFieldArray({
    control,
    name: "names",
  });

  useEffect(() => {
    reset({
      names: [
        {
          firstName: "Bob",
          lastName: "Actually",
        },
        {
          firstName: "Jane",
          lastName: "Actually",
        },
      ],
    });
  }, [reset]);

  const onSubmit = (data) => console.log("data", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input {...register(`names.${index}.firstName`)} />

            <Controller
              render={({ field }) => <input {...field} />}
              name={`names.${index}.lastName`}
              control={control}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <input type="submit" />
    </form>
  );
}

```

In this code, the **`reset`** function is not being used in response to a button click or any other user interaction. It's being used in a **`useEffect`** hook to reset the form state when the component mounts.

The **`useEffect`** hook is used to run some code when the component mounts or updates. In this case, it's being used to reset the form state to a new value when the component mounts. The **`reset`** function is called with a new object that updates the **`names`** field array with new values.

**Submit with Reset**

```jsx
import { useForm, useFieldArray, Controller } from "react-hook-form"
function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { something: "anything" } })

  const onSubmit = (data) => {
    // It's recommended to reset in useEffect as execution order matters
    // reset({ ...data })
  }

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ something: "" })
    }
  }, [formState, submittedData, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("something")} />
      <input type="submit" />
    </form>
  )
}
```
