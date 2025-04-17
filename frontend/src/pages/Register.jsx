import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Hata mesajını tutmak için state

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Önceden varsa hatayı sıfırlıyoruz
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Kayıt başarılı!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // Hata mesajını state'e set et
      } else {
        console.error("Kayıt hatası:", error);
        alert("Bir hata oluştu.");
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Kayıt Ol</h2>
      <input
        type="text"
        placeholder="Ad Soyad"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button type="submit">Kayıt Ol</button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Hata mesajını burada göster */}
    </form>
  );
}

export default Register;
