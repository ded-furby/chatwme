// pages/index.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = "2404"; // Updated password
    if (password === correctPassword) {
      router.push("/chat");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#fff",
        fontFamily: 'Arial, sans-serif',
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "5px" }}>Login</h1>
      <p style={{ margin: "5px 0", fontSize: "14px" }}>YOU KNOW THE PASSWORD, babe</p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #333",
            backgroundColor: "#333",
            color: "#fff",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#8B0000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}