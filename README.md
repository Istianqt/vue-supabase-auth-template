# vue-supabase-auth-template
A modern authentication template built with Vue 3, Vite, Tailwind CSS, and Supabase. Includes Login, Signup, Protected Dashboard, and Responsive UI.


# 🚀 Vue Supabase Authentication Template

A modern authentication template built with **Vue 3**, **Vite**, **Tailwind CSS**, and **Supabase**. This project includes Login, Signup, Protected Dashboard, and a responsive UI.

---

## ✨ Features

- 🔐 User Login
- 📝 User Registration
- 👤 Protected Dashboard
- 🔒 Supabase Authentication
- 📱 Fully Responsive UI
- 🎨 Modern Glassmorphism Design
- ⚡ Built with Vue 3 + Vite
- 🎯 Easy to Customize

---

## 🛠 Tech Stack

- Vue 3
- Vite
- Tailwind CSS
- Supabase
- Vue Router

---

## 📦 Installation

1. Clone this repository.

   ```bash
   git clone https://github.com/Istianqt/vue-supabase-auth-template.git
   ```

2. Navigate to the project folder.

   ```bash
   cd vue-supabase-auth-template
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

---

## 🚀 Setup Guide

### 1. Create a Supabase Project

- Go to https://supabase.com
- Sign in to your account.
- Click **New Project**.
- Wait for the project to finish initializing.

---

### 2. Get Your API Credentials

Navigate to:

```text
Project Settings
└── API
```

Copy the following:

- Project URL
- Anon Public Key

---

### 3. Create the Environment File

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

### 4. Create the Database

Open:

```text
Supabase
└── SQL Editor
```

Run the SQL script included in this repository to create the **profiles** table.

---

### 5. Enable Row Level Security (RLS)

Enable **RLS** for the `profiles` table.

Run the SQL policies included in the project:

- INSERT Policy
- SELECT Policy
- UPDATE Policy

---

### 6. Configure Authentication

Navigate to:

```text
Authentication
└── Providers
    └── Email
```

For development:

- Disable **Confirm Email** *(Optional)*

For production:

- Enable **Confirm Email**

---

### 7. Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

### 8. Build the Project

```bash
npm run build
```

---

### 9. Deploy

You can deploy this project to:

- ▲ Vercel
- 🌐 Netlify
- 🔥 Firebase Hosting

Don't forget to add the same environment variables to your hosting platform.

---

## 📁 Project Structure

```text
src/
├── assets/
├── components/
│   ├── Login.vue
│   ├── Signup.vue
│   └── Dashboard.vue
├── lib/
│   └── supabase.js
├── router/
│   └── index.js
├── views/
│
├── App.vue
└── main.js
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
