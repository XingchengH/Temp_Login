import { useRef } from "react";
// import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  //   const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  // localhost:3000/login

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();

      // Might want to store the token in localStorage or context for future authenticated requests
      // TODO: 

      console.log("Response Data:", data);

      alert("Login successful: " + data.message);
      //   navigate("/dashboard");
    } catch (error) {
      console.log("Error", error.message); // why message? because error is an object with a message
      alert("Login failed: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="d-flex flex-column gap-3"
    >
      <label className="form-label">
        Email
        <input type="text" className="form-control" ref={emailRef} required />
      </label>
      <label className="form-label">
        Password
        <input
          type="password"
          className="form-control"
          ref={passwordRef}
          required
        />
      </label>
      <div className="d-grid w-100">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  );
}
