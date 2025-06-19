# 🩺 Smart Health Record System

A full-stack medical record system for doctors and patients with Aadhar-based authentication and simulated fingerprint verification.

---

## 🚀 Features

- 🔐 **Aadhar-Based Login/Signup**
- 🧬 **Fingerprint (Biometric) Auth Simulation**
- 🩺 **Patient Dashboard**: Upload health records (PDF/Image)
- 👨‍⚕️ **Doctor Dashboard**: View all records + annotate
- ⚙️ JWT token-based session management
- 🎨 Beautiful, responsive UI using Tailwind CSS
- 📁 File upload with `multer`, stored locally
- 🌐 Frontend (React) + Backend (Node.js/Express) + MongoDB (Compass or Atlas)

---

## 🖥️ Tech Stack

| Layer       | Technology                        |
|-------------|------------------------------------|
| Frontend    | React, Tailwind CSS, React Router |
| Backend     | Node.js, Express.js, MongoDB      |
| Auth        | JWT, bcryptjs, Aadhar simulation  |
| Uploads     | multer, local storage             |

---

## 📦 Folder Structure

🛡️ Security Notes
Aadhar number is hashed before saving

Password is securely hashed with bcrypt

JWT token is stored and sent with API requests

📌 Future Improvements
✅ Role-based Protected Routes

☁️ Deploy Backend (Render) + Frontend (Vercel)

📊 View record history & filters

📷 Real fingerprint scanner (hardware-integration)

🤝 Contributing
PRs and suggestions welcome!
Made by Vinaya

