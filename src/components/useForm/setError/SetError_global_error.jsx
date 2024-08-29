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
