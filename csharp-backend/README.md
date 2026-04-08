# C# / ASP.NET Core Backend

## Overview
This is the C# / ASP.NET Core backend service for the application. It acts as a strictly typed, object-oriented, API-only backend. It is designed to be consumed by our frontend and serves data using a standard JSON contract. 

This service is built with a focus on enterprise-grade patterns, clean separation of concerns, and maintainability.

---

## Architecture & Technical Design

This application strictly adheres to the **Controller-Service-Repository (CSR)** design pattern, also heavily influenced by N-Tier architecture principles. The codebase is decoupled by technical layers, ensuring that data access, business logic, and HTTP routing are kept strictly separate.

Here is a breakdown of the core layers and how a standard request flows through them:

### 1. Controllers (The API Layer)
* **Role:** The entry point for all HTTP requests. 
* **Responsibility:** Controllers are kept as "thin" as possible. They handle route definition, accept HTTP requests, validate incoming payloads (via DTOs), and return the appropriate HTTP status codes (e.g., `200 OK`, `404 Not Found`).
* **Rule:** Controllers *never* talk directly to the database. They delegate all actual work to the Services layer.

### 2. Services (The Business Logic Layer)
* **Role:** The brain of the application.
* **Responsibility:** This layer contains all the core business rules and use cases. Services process incoming data from the controller, enforce business validation, orchestrate multiple repositories if needed, and map Domain Entities to Data Transfer Objects (DTOs) before sending them back up to the controller.

### 3. Repositories (The Data Access Layer)
* **Role:** The bridge to the database.
* **Responsibility:** Repositories encapsulate the logic required to access data sources. They use **Entity Framework (EF) Core** to perform CRUD (Create, Read, Update, Delete) operations. 
* **Benefit:** By isolating database calls here, the rest of the application doesn't need to know *how* data is stored, making it easier to mock data for unit testing or swap out the database engine in the future.

### 4. Domain & Entities (The Data Model)
* **Role:** The core representation of the data.
* **Responsibility:** These are standard C# classes that map directly to our database tables via Entity Framework Core. They contain the data structure and any domain-specific constraints.

### 5. Data Transfer Objects (DTOs)
* **Role:** The communication contract.
* **Responsibility:** DTOs are flat classes used specifically for passing data between the client (frontend) and the API. 
* **Benefit:** We use DTOs so we do not expose our internal database schemas (Entities) directly to the public web. This prevents over-posting attacks and allows the API response to look different from the underlying database table.

### 🔄 The Request Flow
1. The **Client** sends an HTTP GET request to `/api/products/1`.
2. The **Controller** receives the request and calls `_productService.GetProductByIdAsync(1)`.
3. The **Service** calls `_productRepository.GetByIdAsync(1)`.
4. The **Repository** uses `ApplicationDbContext` (EF Core) to query the database and returns a `Product` Entity.
5. The **Service** applies any necessary business logic, maps the `Product` Entity to a `ProductResponseDTO`, and hands it back to the Controller.
6. The **Controller** returns the DTO wrapped in an `HTTP 200 OK` response.

---

## Directory Structure

```text
/backend-csharp
│
├── /Controllers      # API Endpoints (e.g., ProductsController.cs)
├── /Services         # Business logic and Interfaces (e.g., ProductService.cs, IProductService.cs)
├── /Repositories     # Data access logic (e.g., ProductRepository.cs)
├── /Models           
│   ├── /Entities     # Database schemas mapped via EF Core
│   └── /DTOs         # Request/Response objects for the API
├── /Data             # EF Core setup (ApplicationDbContext.cs, Migrations)
├── Program.cs        # Application entry point & Dependency Injection setup
└── Dockerfile        # Containerization instructions
```

## From the root of the entire repository
docker-compose up --build

## Running Standalone
```text
dotnet restore
dotnet build
dotnet run
```