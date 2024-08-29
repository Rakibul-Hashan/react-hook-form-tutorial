import React from "react";
import { useForm } from "react-hook-form";

// Mock server request function
const mockServerRequest = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username === "admin" && data.password === "1234") {
        resolve({ status: 200, message: "Login successful" });
      } else {
        reject({
          status: 400,
          errors: {
            username:
              data.username !== "admin" ? "Username is incorrect" : null,
            password: data.password !== "1234" ? "Password is incorrect" : null,
          },
        });
      }
    }, 2000);
  });
};

const SetError_server_error = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await mockServerRequest(data);
      console.log(response);
    } catch (err) {
      if (err.status === 400) {
        if (err.errors.username) {
          setError("username", {
            type: "server",
            message: err.errors.username,
          });
        }
        if (err.errors.password) {
          setError("password", {
            type: "server",
            message: err.errors.password,
          });
        }
      }
    }
  };

  console.log(isValid);
  return (
    <>
      <h2>setError - Server Error</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input disabled {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SetError_server_error;
