# SpeerNotes

SpeerNotes is a secure note-taking API that supports user authentication, CRUD operations, note sharing, and full-text search capabilities. Built with scalability and security in mind, this API is designed to facilitate seamless note management.

## 🚀 Tech Stack
- **Framework:** Node.js with Express.js
- **Database:** PostgreSQL with Sequelize ORM
- **Authentication:** JSON Web Tokens (JWT)
- **Search:** PostgreSQL Full-Text Search
- **Testing:** Jest & Supertest
- **API Documentation:** Postman
- **Deployment:** Render

## 📦 Why These Choices?
### **Framework: Express.js**
- Lightweight and flexible for building RESTful APIs.
- Large community support and middleware ecosystem.

### **Database: PostgreSQL + Sequelize**
- **PostgreSQL** provides robust data integrity and full-text search capabilities.
- **Sequelize ORM** simplifies database interactions with an intuitive syntax and built-in migrations.

### **Authentication: JWT**
- Secure user authentication with stateless token-based authorization.

### **Testing: Jest & Supertest**
- Ensures API reliability with unit and integration tests.
- Simulates real-world API calls in a controlled environment.

### **Deployment: Render**
- Provides an easy-to-use platform with PostgreSQL support and automatic deployment capabilities.

---

## 🛠 Setup & Installation

### **1️⃣ Prerequisites**
- Install **Node.js** (v16+ recommended)
- Install **PostgreSQL** (v14+ recommended)
- Install **Postman** (optional, for API testing)

### **2️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/speerNotes.git
cd speerNotes
```

### **3️⃣ Install Dependencies**
```bash
npm install
```

### **4️⃣ Configure Environment Variables**
1. Create a `.env` file in the root directory.
2. Add the following variables:
```env
DB_HOST=localhost
DB_NAME=database_development
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_secret_key
PORT=5001
```

### **5️⃣ Run Database Migrations & Seeders**
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### **6️⃣ Start the Server**
```bash
npm run dev
```
Your API should now be running at `http://localhost:5001`.

---

## ✅ Running Tests
To execute unit and integration tests:
```bash
npm test
```

---

## 📖 API Documentation
### **Postman Collection**
1. Import the provided Postman collection (`docs/speerNotes.postman_collection.json`)
2. Set up environment variables in Postman.
3. Test the endpoints interactively.


---

## 🚀 Deployment to Render
### **Steps to Deploy:**
1. Push the latest code to GitHub.
2. Connect your Render account and create a **Web Service**.
3. Add **PostgreSQL Database** in Render.
4. Configure environment variables in Render settings.
5. Deploy and verify API functionality.

---

## 📌 Features Overview
- **User Authentication:** Secure login & signup with JWT.
- **CRUD Operations:** Create, read, update, delete notes.
- **Note Sharing:** Share notes with other users.
- **Search Functionality:** Full-text search on notes.
- **Postman Tests:** Fully documented API requests.

---

