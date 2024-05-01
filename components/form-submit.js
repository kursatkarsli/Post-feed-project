"use client";
import { useFormStatus } from "react-dom";

export function FormSubmit() {
  const { pending, data, action, method } = useFormStatus();

  if (pending) {
    return <p>Submitting...</p>;
  } else {
    return (
      <>
        {" "}
        <button type="reset">Reset</button>
        <button>Create Post</button>
      </>
    );
  }
}
