import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Hata mesajını tutmak için state

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Önceden varsa hatayı sıfırlıyoruz
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Eğer başarılı olursa token'ı localStorage'a kaydediyoruz
      localStorage.setItem("token", response.data.token);

      alert("Giriş başarılı!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // Hata mesajını state'e set et
      } else {
        console.error("Giriş hatası:", error);
        alert("Bir hata oluştu.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Giriş Yap</h2>
      <input
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Giriş Yap</button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Hata mesajını burada göster */}
    </form>
  );
}

export default Login;
