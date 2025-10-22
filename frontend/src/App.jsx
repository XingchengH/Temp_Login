import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <div className="container">
      <div className="mt-4 p-2 border shadow d-flex justify-content-center">
        <div
          className="p-2 m-4 shadow"
          style={{ width: "400px", backgroundColor: "#f8f9fa" }}
        >
          <RegisterForm />
        </div>
        <div
          className="p-2 m-4 shadow"
          style={{ width: "400px", backgroundColor: "#f8f9fa" }}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default App;
