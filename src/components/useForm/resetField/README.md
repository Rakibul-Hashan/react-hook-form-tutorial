![resetField - useForm method | React Hook Form ](https://i.ibb.co/k1Dfk4r/reset-Field.png)

# **UNDERSTANDING `resetField` FUNCTION IN REACT HOOK FORM**

---

**What is `resetField`?**

**`resetField`** is a function provided by **`react-hook-form`** that allows you to reset an individual field state in your form. This means you can reset a specific field to its initial state, or to a new state, while keeping other fields unchanged.

### 🛠️ Function Definition:

```jsx
/**
 * Resets the state of an individual form field.
 *
 * @param {string} name - The name of the registered field to reset.
 * @param {Object} [options] - Optional settings for the reset operation.
 * @param {boolean} [options.keepError] - If true, retains the field's error state.
 * @param {boolean} [options.keepDirty] - If true, retains the field's dirty state.
 * @param {boolean} [options.keepTouched] - If true, retains the field's touched state.
 * @param {*} [options.defaultValue] - If provided, updates the field to this value and sets it as the new default.
 */
function resetField(name, options) {
  // Implementation goes here
}
```

**Explanation:**

- **`name`**: The name of the field you want to reset (type: `string`).
- **`options`**: An optional object to customize the reset behavior:
  - **`keepError`**: If set to `true`, the field's error state is retained.
  - **`keepDirty`**: If set to `true`, the field's dirty state is retained.
  - **`keepTouched`**: If set to `true`, the field's touched state is retained.
  - **`defaultValue`**: If provided, the field will be set to this value and this value will become the new default.

Alright, let's dive into the `resetField` function in React Hook Form with a beginner-friendly explanation, tons of examples, and some helpful emojis to make it super clear. 🚀

### ⚙️ What Happens When You Use `resetField`?

When you invoke this function, a few important things happen:

1. **`isValid`** form state will be reevaluated.
2. **`isDirty`** form state will be reevaluated.

### 📝 The `options` Object:

Here's a quick summary of what options you can use with `resetField`:

| Option         | Type    | Description                                                                                                                                  |
| -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `keepError`    | boolean | 🛑 When set to `true`, the field's error will be retained even after reset.                                                                  |
| `keepDirty`    | boolean | 💼 When set to `true`, the field's dirty state (whether it has been modified) will be retained.                                              |
| `keepTouched`  | boolean | 👆 When set to `true`, the field's touched state (whether it has been interacted with) will be retained.                                     |
| `defaultValue` | unknown | 🎯 When provided, the field will be reset to this value, and this value will become the new default. Only works with non-`undefined` values. |

| Option             | Initial Value | Example Provided Value | Description                                                                                                     |
| ------------------ | ------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| **`keepError`**    | `false`       | `true`                 | Retains the field's error state after resetting. If set to `true`, the field's error will not be cleared.       |
| **`keepDirty`**    | `false`       | `true`                 | Retains the field's dirty state after resetting. If set to `true`, the field remains marked as "dirty."         |
| **`keepTouched`**  | `false`       | `true`                 | Retains the field's touched state after resetting. If set to `true`, the field remains marked as "touched."     |
| **`defaultValue`** | Not provided  | `"John"`               | Updates the field with the provided value and sets this as the new default. Supports only non-undefined values. |

### ⚠️ Important Rule:

The `name` you provide to `resetField` **must** match a field name you've registered in your form. If you try to reset a non-existent field, it won't work. Here's what that looks like:

```jsx
register("test");
// while using resetField
resetField("test"); // ✅ Success! The field "test" was found and reset.
resetField("non-existent-name"); // ❌ Error! The field name does not exist.
```

### 📋 Example 1: Basic Reset

Let's start with a simple example. We have a form with a single input field named `"firstName"`. We'll use `resetField` to reset this field when a button is clicked.

```jsx
import * as React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
    },
  });

  const handleClick = () => resetField("firstName");

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <p>{isDirty && "dirty"}</p> {/* Show 'dirty' if the field has been modified */}
      <p>{isValid && "valid"}</p> {/* Show 'valid' if the form is valid */}
      <button type="button" onClick={handleClick}>
        Reset
      </button>
    </form>
  );
}
```

### 🛠️ Example 2: Reset with Options

In this example, we'll reset the `"firstName"` field but use different options to see how they affect the form state.

```jsx
import * as React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    resetField,
    formState: { isDirty, isValid, errors, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
    },
  });

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <p>isDirty: {isDirty && "dirty"}</p> {/* Show 'dirty' if the field has been modified */}
      <p>touchedFields: {touchedFields.firstName && "touched field"}</p>{" "}
      {/* Show if the field has been touched */}
      <p>dirtyFields:{dirtyFields.firstName && "dirty field"}</p> {/* Show if the field is dirty */}
      <p>isValid: {isValid && "valid"}</p>{" "}
      {/* Show 'valid' if the form is valid */}
      <p>error: {errors.firstName && "error"}</p> {/* Show 'error' if there's an error */}
      <hr />
      <button
        type="button"
        onClick={() => resetField("firstName", { keepError: true })}
      >
        Reset keep error
      </button>
      <button
        type="button"
        onClick={() => resetField("firstName", { keepTouched: true })}
      >
        Reset keep touched fields
      </button>
      <button
        type="button"
        onClick={() => resetField("firstName", { keepDirty: true })}
      >
        Reset keep dirty fields
      </button>
      <button
        type="button"
        onClick={() => resetField("firstName", { defaultValue: "New" })}
      >
        Update defaultValue
      </button>
    </form>
  );
}
```

### 🔍 What’s Happening in Example 2?

- **Reset with `keepError: true`**: The error state of the field is kept intact even after the field is reset.
- **Reset with `keepTouched: true`**: The field retains its touched state.
- **Reset with `keepDirty: true`**: The field retains its dirty state.
- **Reset with `defaultValue: "New"`**: The field is reset to the new value `"New"` and this becomes the new default value.

### 📝 Quick Reference Table

Here's a table summarizing the options and what they do:

| Option         | Effect                                                  | Example Usage                                      |
| -------------- | ------------------------------------------------------- | -------------------------------------------------- |
| `keepError`    | Retains the error state after resetting                 | `resetField("firstName", { keepError: true })`     |
| `keepDirty`    | Retains the dirty state after resetting                 | `resetField("firstName", { keepDirty: true })`     |
| `keepTouched`  | Retains the touched state after resetting               | `resetField("firstName", { keepTouched: true })`   |
| `defaultValue` | Resets the field to a new value and updates the default | `resetField("firstName", { defaultValue: "New" })` |

---

### `reset` vs `resetField`

| Feature/Aspect                   | `reset`                                                                                       | `resetField`                                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Purpose**                      | Resets the entire form state, including all fields.                                           | Resets the state of a specific individual field.                                                             |
| **Scope**                        | Affects all registered fields in the form.                                                    | Affects only the specified field.                                                                            |
| **Use Case**                     | Use when you need to reset the entire form (e.g., on form submission or to clear all inputs). | Use when you need to reset a single field without affecting others (e.g., on a specific field error).        |
| **Options**                      | Can specify `keepErrors`, `keepDirty`, `keepValues`, etc., for the entire form.               | Can specify options like `keepError`, `keepDirty`, `keepTouched`, and `defaultValue` for the targeted field. |
| **Reset All Fields**             | Yes, resets all fields to their initial state or new default values provided.                 | No, only resets the specified field.                                                                         |
| **Field Registration Required?** | No need to specify a field; affects all registered fields.                                    | Yes, you must specify the name of the registered field to reset.                                             |
| **Example**                      | `reset({ firstName: "John" })` resets the entire form, setting `firstName` to "John".         | `resetField("firstName", { defaultValue: "John" })` resets only the `firstName` field.                       |
| **Form State Reevaluation**      | Reevaluates the form state for all fields after reset.                                        | Reevaluates form state related to the specific field being reset.                                            |
| **Error Handling**               | Can choose to retain or clear errors for all fields.                                          | Can choose to retain or clear the error for the specific field.                                              |
| **Dirty State Handling**         | Can choose to retain or clear the dirty state for all fields.                                 | Can choose to retain or clear the dirty state for the specific field.                                        |
| **Touched State Handling**       | Can choose to retain or clear the touched state for all fields.                               | Can choose to retain or clear the touched state for the specific field.                                      |

- **Use `reset`** when you want to reset the entire form.
- **Use `resetField`** when you need to target and reset only one specific field without affecting others.
