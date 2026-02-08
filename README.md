# Employee Management System

A modern **Employee Management System** built using **Next.js (App Router)** and **TypeScript**, designed to perform full **CRUD operations** with support for **dynamic/custom employee fields**.  
The UI is clean, responsive, and resume-ready.

---

## 🚀 Tech Stack

- **Next.js 14+ (App Router)**
- **React (Client Components)**
- **TypeScript**
- **Tailwind CSS**
- **Context API** (global state management)
- **LocalStorage** (data persistence)
- **Lucide Icons**

---

## 📂 Project Structure
```
employee-management-system/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── favicon.ico
│   │   └── employees/
│   │       ├── page.tsx
│   │       ├── new/page.tsx
│   │       └── [id]/edit/page.tsx
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── EmployeeForm.tsx
│   │   └── DynamicFields.tsx
│   │
│   ├── context/
│   │   └── EmployeeContext.tsx
│   │
│   └── types/
│       └── employee.ts
│
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── next-env.d.ts
```

---

## ✨ Key Features

### 🏠 Home Page
- Professional hero section
- Quick actions:
  - **View Employees**
  - **Add Employee**
- Feature highlights with icons

### 👥 Employee Management
- View all employees in a clean card layout
- Edit and delete employee records
- Smooth scrolling and highlight on search

### ➕ Add / Edit Employee
- Required fields:
  - Name
  - Email
  - Role
- Dynamic custom fields:
  - Add unlimited custom attributes (e.g. Phone, Team, Floor, Skills)
  - Supports comma-separated values
  - Fields auto-commit on Save / Update
- Works for both **Add** and **Edit** flows

### 🔍 Search
- Search employee by name
- Auto-scrolls to the matching card
- Temporary “not found” message with auto-dismiss

### 💾 Data Persistence
- All employee data stored in **LocalStorage**
- Data remains after page refresh

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
git clone <your-repo-url>
cd employee-management-system

###2️⃣ Install dependencies
npm install

###3️⃣ Run the development server
npm run dev

###4️⃣ Open in browser
http://localhost:3000

🧠 Assumptions Made

No backend or database is required

Data persistence is handled via LocalStorage

Authentication is not included

Email format validation is handled at input level
