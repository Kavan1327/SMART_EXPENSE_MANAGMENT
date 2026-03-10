💳 Smart Expense Management System

A production-style microservices expense tracking platform built with Spring Boot, React, PostgreSQL, Kafka, and Redis.

The system allows users to:

Track daily expenses

Set budgets and receive alerts

Upload receipts

Generate reports

View analytics dashboards

Designed using modern backend architecture patterns used in fintech systems.

High Level Architecture

                 React Frontend
                        |
                        |
                 API Gateway
                        |
        ---------------------------------
        |               |               |
    Auth Service    Expense Service   Notification Service
        |               |
     PostgreSQL      PostgreSQL
                        |
                       Redis
                        |
                       Kafka


Technology Stack

Backend

| Technology      | Purpose                |
| --------------- | ---------------------- |
| Java 17         | Core backend language  |
| Spring Boot     | Microservice framework |
| Spring Security | Authentication         |
| JWT             | Secure API access      |
| Spring Data JPA | ORM                    |
| PostgreSQL      | Database               |

Microservices Infrastructure

| Tool                 | Purpose          |
| -------------------- | ---------------- |
| Spring Cloud Gateway | API Gateway      |
| Kafka                | Event streaming  |
| Redis                | Caching          |
| Docker               | Containerization |

Frontend

| Tool         | Purpose            |
| ------------ | ------------------ |
| React + Vite | Frontend framework |
| Material UI  | UI components      |
| Chart.js     | Data visualization |
| Axios        | API communication  |

System Design

This project follows Domain Driven Design principles.

| Service              | Responsibility             |
| -------------------- | -------------------------- |
| Auth Service         | User authentication & JWT  |
| Expense Service      | Expense tracking & budgets |
| Notification Service | Budget alerts & events     |
| API Gateway          | Routing & security         |


Running the Project

1️⃣ Clone Repository

git clone https://github.com/yourusername/smart-expense-management.git

2️⃣ Run Backend Services

cd auth-service
mvn spring-boot:run
cd expense-service
mvn spring-boot:run
cd api-gateway
mvn spring-boot:run

3️⃣ Run Frontend

cd frontend
npm install
npm run dev

🐳 Run with Docker

docker-compose up --build

🔐 Security

JWT authentication
API Gateway request filtering
Role based authorization

👨‍💻 Author

Kavan Kumar

⭐ If you like this project

Give it a ⭐ on GitHub!


