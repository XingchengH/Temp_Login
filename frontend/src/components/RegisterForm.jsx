import { useRef } from "react";

export default function RegisterForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);
        alert("Registration successful: " + data.message);
      } else {
        const errorData = await response.json();
        console.log("Error Data:", errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }

    // Clear form fields after submission
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <form className="d-flex flex-column p-3" onSubmit={handleFormSubmit}>
      <label className="form-label">
        Name <input type="text" className="form-control" ref={nameRef} />
      </label>
      <label className="form-label">
        Email <input type="email" className="form-control" ref={emailRef} />
      </label>
      <label className="form-label">
        Password{" "}
        <input type="password" className="form-control" ref={passwordRef} />
      </label>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
}
