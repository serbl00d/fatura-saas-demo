import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // localStorage'dan token'ı alalım
    const token = localStorage.getItem("token");

    if (token) {
      // Token ile API'den kullanıcı bilgilerini alıyoruz
      axios
        .get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Kullanıcı bilgileri alınamadı", error);
        });
    }
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Hoşgeldiniz, {user.name}!</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
}

export default Dashboard;
