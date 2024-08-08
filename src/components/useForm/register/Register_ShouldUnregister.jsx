import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Register_ShouldUnregister() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showInput, setShowInput] = useState(true);

  const onSubmit = data => {
    console.log(data);
  };

  const watchedTestValue = watch('test'); // Watching the value of 'test' input

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {showInput && (
        <input
          {...register('test', {
            shouldUnregister: true,
            required: 'This field is required'
          })}
        />
      )}
      <button type="button" onClick={() => setShowInput(prev => !prev)}>
        Toggle Input
      </button>
      {errors.test && <p>{errors.test.message}</p>}
      <p>Input value: {watchedTestValue}</p>
      <input type="submit" />
    </form>
  );
}


