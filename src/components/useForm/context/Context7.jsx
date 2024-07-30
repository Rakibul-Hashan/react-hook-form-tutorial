import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Context7() {
  const [sharedState, setSharedState] = useState({ role: "guest" });

  const { register, handleSubmit } = useForm({
    context: sharedState,
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h1>Shared State Management</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        {sharedState.role === "admin" && ( 
          <input {...register("adminNote")} placeholder="Admin Note" />
        )}
        
      
        <button
          type="button"
          onClick={() =>
            setSharedState((prevState) => ({
              ...prevState,
              role: prevState.role === "guest" ? "admin" : "guest",
            }))
          }
        >
          Toggle Role
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
