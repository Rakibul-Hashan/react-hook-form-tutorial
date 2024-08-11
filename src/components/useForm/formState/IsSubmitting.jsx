import React from "react";
import { useForm } from "react-hook-form";

export default function IsSubmitting() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, submitCount, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay

    console.log(data);
  };

  const getButtonStyle = () => {
    if (isSubmitting) {
      return {
        background: "orange",
        color: "white",
        cursor: "not-allowed",
      };
    }
    if (isSubmitSuccessful) {
      return {
        background: "blue",
        color: "white",
        cursor: isSubmitted ? "not-allowed" : "pointer",
      };
    }
    if (isSubmitted) {
      return {
        background: "green",
        color: "white",
        cursor: "not-allowed",
      };
    }
    return {
      background: "",
      color: "black",
      cursor: "pointer",
    };
  };

  return (
    <>
      <h2> isSubmitting, isSubmitted, submitCount, isSubmitSuccessful</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="Username" />

        <button type="submit" disabled={isSubmitting} style={getButtonStyle()}>
          {isSubmitting
            ? "Submitting..."
            : isSubmitSuccessful
            ? "Success!"
            : "Submit"}
        </button>
        {/* Displaying the submit count */}
        <p>Submit Count: {submitCount}</p>
        {/* Displaying form state values */}
        <p>Is Submitting: {isSubmitting ? "Yes" : "No"}</p>
        <p>Is Submitted: {isSubmitted ? "Yes" : "No"}</p>
        <p>Is Submit Successful: {isSubmitSuccessful ? "Yes" : "No"}</p>
      </form>
    </>
  );
}
