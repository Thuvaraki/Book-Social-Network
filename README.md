# 📚 Book Social Network

Book Social Network is a full-stack web application that enables users to manage their book collections and connect with a community of book enthusiasts. It provides secure authentication, email validation, and a book-sharing and borrowing system.

---

## 🚀 Features

🔐 User Registration & Authentication – Register and log in securely using JWT-based authentication.

📧 Email Validation – Activate accounts through secure email validation codes.

📘 Book Management – Create, update, archive, and share books within the network.

🤝 Borrow & Return Books – Borrow available books and return them upon completion.

✅ Book Return Approval – Admin users can approve or reject book return requests.

🧠 REST API Best Practices – Well-structured endpoints documented with Swagger UI.

🐳 Dockerized Database & Mail Service – PostgreSQL database and MailDev SMTP server run in Docker containers for development.

---

## 🧱 Tech Stack

### **Backend (book-network)**
- Spring Boot **3.5.7**
- Spring Security **6.4.3**
- Spring Data JPA
- JWT Authentication
- PostgreSQL
- OpenAPI & Swagger UI
- Docker

### **Frontend**
- Angular
- Bootstrap
- OpenAPI Generator for Angular

---

## 🛠️ Installation and Setup

### **Clone the repository**
    git clone https://github.com/Thuvaraki/Book-Social-Network.git

Run with Docker Compose          
          
    #  Make sure you have Docker installed on the system
    docker-compose up 

Backend - Run the application 

Frontend

    cd book-network-ui
    npm install   # Install required dependencies
    ng serve

Open  browser at: 👉 http://localhost:4200/login

API Documentation

Once the backend is running, access the API documentation at: http://localhost:8080/swagger-ui.html

Swagger UI shows API and gives the OpenAPI JSON.

OpenAPI Generator reads that JSON and produces Angular services automatically.

Angular app can  call the backend without manually writing HTTP requests.
