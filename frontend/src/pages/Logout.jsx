import React from "react";
import { useNavigate } from "react-router-dom"; // useHistory yerine useNavigate kullanalım

function Logout() {
  const navigate = useNavigate(); // useNavigate kullanarak yönlendirme işlemi yapacağız

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Artık navigate fonksiyonu ile yönlendirme yapıyoruz
  };

  return (
    <div>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
}

export default Logout;
