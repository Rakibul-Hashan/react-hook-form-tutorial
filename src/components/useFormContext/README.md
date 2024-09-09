# useFormContext - React Hook Form API

![FormProvider-useFormContext-ReactHookForm](/src/components/useFormContext/FormProvider-useFormContext-ReactHookForm.jpg)

---

## 📝 **What is FormProvider?**

**FormProvider** is a component from **React Hook Form** that allows you to use the form context and all its methods (`useForm` methods) across your component tree. It acts like a wrapper to make form methods and data available to **any child component**.

💡 This is especially useful when you want to pass form methods (`register`, `handleSubmit`, etc.) deep into the component tree without manually passing them as props each time.

### 🎯 **Key Points about FormProvider:**

- **⚠️ Do NOT** nest multiple FormProviders. Stick to just one provider to avoid confusion and issues.
- **Context Provider**: It uses React's Context API to make form methods available globally within the component tree.

---

## 🛠 **Props Sneak Peek Table:**

Here's a quick look at the props and what you can expect with **FormProvider**:

| **Name**   | **Type** | **Description**                               | **Initial Value**      | **Value You Provide**                         |
| ---------- | -------- | --------------------------------------------- | ---------------------- | --------------------------------------------- |
| `...props` | `Object` | FormProvider requires **all useForm methods** | **No props initially** | You pass `useForm` methods (e.g., `register`) |

### 📌 **RULE**: Avoid using nested FormProviders. Use **one** `FormProvider` for the entire form to keep things simple!

---

## 🧑‍💻 **Simple Example:**

Below is a very simple example to demonstrate how **FormProvider** works.

```jsx
import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

export default function App() {
  const methods = useForm(); // Step 1: Get all form methods

  const onSubmit = (data) => console.log(data); // Handle form submission

  return (
    <FormProvider {...methods}>
      {" "}
      {/* Step 2: Wrap your form in FormProvider */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {" "}
        {/* Step 3: Use methods */}
        <NestedInput /> {/* Nested component using form methods */}
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

// Nested input that uses useFormContext
function NestedInput() {
  const { register } = useFormContext(); // Step 4: Retrieve hook methods inside child component

  return <input {...register("test")} />; // Step 5: Use "register" method
}
```

### 🔎 **What's happening here?**

- The **`App` component** defines the form and provides all form methods using `useForm()`.
- **`FormProvider`** wraps the form, passing down all form methods (e.g., `register`, `handleSubmit`).
- Inside the child component **`NestedInput`**, we use `useFormContext()` to access `register` and other form methods. This means you don't need to manually pass `register` as a prop to **`NestedInput`**.

---

## ⚙️ **Full Example with Labels and Nested Input**

Here's a more detailed example with labeled inputs and a nested component.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import Test from "./Test"; // Nested input component

import "./styles.css"; // Include some basic styles

function App() {
  const methods = useForm(); // Get all methods from useForm
  const { register, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      {" "}
      {/* Pass all useForm methods here */}
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <label>Test</label>
        <input {...register("test", { required: true })} /> {/* Register an input */}
        <label>Nested Input</label>
        <Test /> {/* Nested input component */}
        <input type="submit" /> {/* Submit button */}
      </form>
    </FormProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

### 🔥 **Breaking it down:**

1. **FormProvider**: Wraps the form to make all methods from `useForm` accessible inside any nested component.
2. **register**: Registers form fields, making it easy to track the values and validation.
3. **handleSubmit**: Handles form submission and prints the data in the console.
4. **Nested Input**: The `Test` component is another component that can access `useForm` methods through **`useFormContext()`**.

---

## 🚨 **Warnings and Considerations:**

- **⚠️ Avoid nesting FormProviders**: If you wrap `FormProvider` multiple times in your component tree, you could cause context conflicts, which may result in unexpected behavior.
- **X Emoji for Errors**: If a user tries to submit the form without filling a required field like `test`, you’ll get a validation error.

---

## 📊 **Sneak Peek of FormProvider Rules:**

| **Rule**                                 | **Example**                                                  | **Result**                                                    |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| **No nested FormProviders** ⚠️           | Two `FormProvider` components wrapping the same form tree    | **Error or unexpected behavior**                              |
| **Passing useForm methods via Context**  | `FormProvider {...methods}`                                  | Methods like `register`, `handleSubmit` available in children |
| **useFormContext for nested components** | `const { register } = useFormContext()` in a child component | Form methods accessible without passing them as props         |

---

## 🔧 **Practical Tips:**

- **Tip 1**: Always use **one** `FormProvider` for the whole form.
- **Tip 2**: Use `useFormContext()` in nested components to access form methods like `register` and `handleSubmit`.
- **Tip 3**: Keep form logic in one place and spread it across components using the context to avoid prop drilling.

---

## 🎉 **Conclusion:**

With **FormProvider**, you can efficiently handle complex forms in React Hook Form by making all form methods accessible throughout your component tree, even in deeply nested components. Remember not to nest FormProviders, and make use of **useFormContext** for child components!
