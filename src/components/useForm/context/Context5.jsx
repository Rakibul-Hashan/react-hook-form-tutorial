import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Context5() {
  const [isAdmin, setIsAdmin] = useState(false);

  const { register, handleSubmit } = useForm({
    context: { isAdmin },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h1> Context Example</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="Username" />
        {isAdmin && (
          <input {...register("adminCode")} placeholder="Admin Code" />
        )}
        <button type="button" onClick={() => setIsAdmin(!isAdmin)}>
          Toggle Admin
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
