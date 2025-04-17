# Fatura SaaS Projesi

Bu proje, kullanıcıların faturalarını oluşturup yönetebilecekleri bir **SaaS** (Software as a Service) platformu için geliştirilmiştir. Platform, bir kullanıcının fatura bilgilerini girip düzenleyebilmesini sağlar ve aynı zamanda müşteri yönetimi ile faturaların ödeme durumlarını takip edebilir.

Proje, **Node.js**, **Express**, **MongoDB** ve **JWT** (JSON Web Token) kullanılarak geliştirilmiştir. Frontend kısmı ise **React** ve **Vite** ile yazılmıştır.

---

## Özellikler

- **Kullanıcı Kaydı & Giriş**: Kullanıcılar sisteme kayıt olabilir ve giriş yapabilirler.
- **Fatura Yönetimi**: Kullanıcılar faturalarını oluşturabilir, düzenleyebilir ve silebilirler.
- **Müşteri Yönetimi**: Müşteriler oluşturulabilir ve düzenlenebilir.
- **Kullanıcı Kimlik Doğrulaması**: JWT tabanlı kimlik doğrulama ile güvenli oturum açma işlemi yapılır.
- **Ödeme Durumu Takibi**: Faturalar üzerinden ödeme durumu kontrol edilebilir.

---

## Teknolojiler

- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Frontend**: React, Vite, Axios
- **Veritabanı**: MongoDB (isteğe bağlı olarak PostgreSQL de kullanılabilir)
- **Bağımlılıklar**:
    - **Axios**: HTTP isteklerini yapmak için kullanılır.
    - **jsonwebtoken (JWT)**: Kimlik doğrulama ve yetkilendirme için kullanılır.

---

## Başlangıç

### Gerekli Kurulum

1. **Repository'yi klonlayın**:
   ```bash
   git clone https://github.com/kullaniciadi/fatura-saas.git
   cd fatura-saas
