# ![handleSubmit](https://i.ibb.co/58yHfNt/notion-image-2.png)
---

# handleSubmit - useForm() method

**What is `handleSubmit`?**

**`handleSubmit`** is a function provided by the **`react-hook-form`** library that helps you handle form submissions in a React application. It's a higher-order function, which means it takes another function as an argument and returns a new function.

**Signature**

The signature of **`handleSubmit`** is:

```jsx
handleSubmit: ((data: Object, e?: Event) => Promise<void>, (errors: Object, e?: Event) => Promise<void>) => Promise<void>
```

- **`handleSubmit`** takes two arguments:
    - The first argument is a function that will be called when the form is submitted successfully. This function is called the "**submit handler**" or "`onSubmit`" function. It takes two arguments: **`data`** (an object containing the form data) and **`e`** (an optional event object).
    - The second argument is a function that will be called when there are errors in the form submission. This function is called the "error handler" or "onError" function. It takes two arguments: **`errors`** (an object containing the error messages) and **`e`** (an optional event object).
- **`handleSubmit`** returns a new function that will be called when the form is submitted.

### **How does `handleSubmit` work?**

When you call **`handleSubmit(onSubmit, onError)`**, it returns a new function that will be called when the form is submitted. This new function will:

1. Validate the form data using the validation rules defined in the form.
2. If the form data is valid, call the **`onSubmit`** function with the form data and the event object (if provided).
3. If the form data is invalid, call the **`onError`** function with the error messages and the event object (if provided).

## **Examples**

**Sync Example**

```jsx
import React from "react";
import { useForm } from "react-hook-form";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function HandleSubmit__async() {
  const { register, handleSubmit, formState: { errors }, formState } = useForm();
  const onSubmit = async data => {
    await sleep(2000);
    if (data.username === "bill") {
      alert(JSON.stringify(data));
    } else {
      alert("There is an error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">User Name</label>
      <input placeholder="Bill" {...register("username")} />

      <input type="submit" />
    </form>
  );
}
```

In this example, we define two functions: **`onSubmit`** and **`onError`**. We then pass these functions to **`handleSubmit`**, which returns a new function that will be called when the form is submitted. When the form is submitted, **`handleSubmit`** will validate the form data and call either **`onSubmit`** or **`onError`** depending on whether the form data is valid or not.

**Async Example**

```jsx
import React from "react";
import { useForm } from "react-hook-form";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function App() {
  const { register, handleSubmit, formState: { errors }, formState } = useForm();
  const onSubmit = async data => {
    await sleep(2000);
    if (data.username === "bill") {
      alert(JSON.stringify(data));
    } else {
      alert("There is an error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">User Name</label>
      <input placeholder="Bill" {...register("username"} />

      <input type="submit" />
    </form>
  );
}
```

In this example, we define an async **`onSubmit`** function that simulates a delay using **`sleep`**. We then pass this function to **`handleSubmit`**, which returns a new function that will be called when the form is submitted. When the form is submitted, **`handleSubmit`** will validate the form data and call **`onSubmit`** if the form data is valid. The **`onSubmit`** function will then simulate a delay and display an alert message.

## **Rules**

---

**Rule 1: You can easily submit forms asynchronously**

When you pass an async function to **`handleSubmit`**, it will wait for the promise to resolve before considering the form submission complete. This allows you to perform asynchronous operations, such as API calls, during form submission.

**Example:**

```jsx
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await fetchAPI(data); // async API call
    console.log("Form submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input type="submit" />
    </form>
  );
}
```

In this example, the **`onSubmit`** function is an async function that makes an API call using **`fetchAPI`**. The **`handleSubmit`** function will wait for the promise to resolve before considering the form submission complete.

**Rule 2: Disabled inputs will appear as undefined values in form values**

When you disable an input field, its value will not be included in the form data when the form is submitted. If you want to prevent users from updating an input field and wish to retain the form value, you can use the **`readOnly`** attribute or disable the entire **`<fieldset />`**.

**Example:**

```jsx
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} value="John Doe" readOnly />
      <input {...register("email")} value="johndoe@example.com" disabled />
      <input type="submit" />
    </form>
  );
}
```

In this example, the **`username`** input field is set to **`readOnly`**, which means the user cannot edit its value, but the value will still be included in the form data when the form is submitted. The **`email`** input field is disabled, which means its value will not be included in the form data when the form is submitted.

**Rule 3: `handleSubmit` will not swallow errors that occurred inside your `onSubmit` callback**

When you pass an async function to **`handleSubmit`**, any errors that occur inside the function will not be caught by **`handleSubmit`**. You should try and catch inside async requests and handle those errors gracefully for your customers.

**Example:**

```jsx
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      await fetchAPI(data); // async API call
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input type="submit" />
    </form>
  );
}
```

In this example, the **`onSubmit`** function is an async function that makes an API call using **`fetchAPI`**. If an error occurs during the API call, the **`catch`** block will catch the error and display an alert message to the user.
