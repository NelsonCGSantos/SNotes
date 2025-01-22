# **SpeerNotes**  
A secure, scalable **note-taking API** with **user authentication, CRUD operations, note sharing, and full-text search.**  

##  **Tech Stack**  
- **Framework:** Express.js (Node.js)  
- **Database:** PostgreSQL + Sequelize ORM  
- **Authentication:** JWT (JSON Web Token)  
- **Search:** PostgreSQL Full-Text Search (`GIN` indexing for performance)  
- **Security:** Helmet, CORS, Rate Limiting  
- **Testing:** Jest + Supertest  
- **API Documentation:** Postman  
- **Deployment:** Render  

---

###  **Backend (Express.js + PostgreSQL)**  
- **Express.js** → Lightweight, fast, and scalable REST API framework.  
- **PostgreSQL** → Relational database with **full-text search** and **strong data integrity.**  
- **Sequelize ORM** → Simplifies database operations with migrations, models, and relations.  

###  **Security**  
- **JWT Authentication** → Secure, stateless token-based access.  
- **Helmet.js** → Protects against common web vulnerabilities.  
- **CORS** → Restricts API access to trusted origins.  
- **Rate Limiting** → Prevents excessive API requests to mitigate abuse.  

###  **Search**  
- **PostgreSQL Full-Text Search** → Optimized with **GIN indexing** for fast keyword-based queries.  

### **Testing & Deployment**  
- **Jest + Supertest** → Ensures API reliability with unit & integration tests.  
- **Render** → Simple deployment with PostgreSQL hosting & automatic redeployments.  

---

##  **Setup & Installation**  

### **Prerequisites**  
- Install **Node.js** (v16+ recommended)  
- Install **PostgreSQL** (v14+ recommended)  
- Install **Postman** (optional, for API testing)  

### **Clone the Repository**  
```bash
git clone https://github.com/yourusername/speerNotes.git
cd speerNotes
```

### **Install Dependencies**  
```bash
npm install
```

### **Configure Environment Variables**  
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

### **Run Database Migrations & Seeders**  
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### **Start the Server**  
```bash
npm run dev
```
Your API will be available at:  
 **http://localhost:5001**

---

## **Running Tests**  
To execute **unit and integration tests**, run:  
```bash
npm test
```

---

## **API Documentation (Postman Collection)**  
### **Interactive API Testing**  
1. Import **`docs/speerNotes.postman_collection.json`** into **Postman**.  
2. Configure **environment variables** in Postman.  
3. Start testing API endpoints interactively!  

---

## **Deployment to Render**  
### **Steps to Deploy:**  
1. **Push** the latest code to GitHub.  
2. **Connect** your **Render** account.  
3. **Create** a **Web Service** in Render.  
4. **Add a PostgreSQL Database** under Render services.  
5. **Set up environment variables** in Render settings.  
6. **Deploy & verify** API functionality.  

---

## **Features Overview**  
 **User Authentication** → Secure login & signup with JWT.  
 **CRUD Operations** → Create, Read, Update, Delete notes.  
 **Note Sharing** → Share notes with other users.  
 **Full-Text Search** → Optimized with PostgreSQL **GIN indexing**.  
 **Security Measures** → Helmet, Rate Limiting, CORS.  
 **Postman Collection** → Fully documented API requests.  
 **Test Coverage** → Automated **unit & integration tests** using Jest + Supertest.  

---

