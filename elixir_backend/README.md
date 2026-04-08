# Elixir / Phoenix Backend

## Overview
This is the Elixir / Phoenix backend service for the application. It acts as a highly concurrent, functional, API-only backend. It is designed to serve the exact same JSON contract to our frontend as the C# backend, allowing for a 1:1 comparison.

Built on the Erlang VM (BEAM), this service leverages functional programming principles and Phoenix's domain-driven design patterns to achieve massive scalability and fault tolerance.

---

## Architecture & Technical Design

Unlike traditional layered architectures (like C#'s Controller-Service-Repository), Phoenix applications are structured around **Contexts**. This means the codebase is decoupled by **business domain** rather than technical layers. 

Here is a breakdown of the core concepts and how a standard request flows through them:

### 1. The Web Layer (`shopping_cart_web`)
* **Role:** The presentation and API routing layer.
* **Responsibility:** This layer contains the `Router`, `Controllers`, and `JSON Views`. It handles incoming HTTP requests, extracts parameters, calls the underlying business domain (Contexts), and formats the responses into JSON. 
* **Rule:** The Web layer is strictly an interface. It *never* interacts with the database directly and contains absolutely no core business logic.

### 2. Contexts (`shopping_cart`)
* **Role:** The API to your business logic.
* **Responsibility:** Contexts are dedicated Elixir modules that group related functionality together (e.g., a `Catalog` context for products, or an `Orders` context). A Context acts as a boundary; the web controller calls functions on the Context module, which then orchestrates the underlying schemas and database queries.
* **Benefit:** It hides internal complexities. The web layer doesn't need to know *how* a product is fetched or updated; it just asks the `Catalog` context for it.

### 3. Schemas (Ecto)
* **Role:** The data structure definitions.
* **Responsibility:** Ecto Schemas map Elixir structs to database tables. They also define relationships (has_many, belongs_to) and handle data validation and casting via **Changesets**. 

### 4. The Repo (Data Access)
* **Role:** The database wrapper.
* **Responsibility:** The `Repo` module handles all direct communication with the PostgreSQL database. Contexts use the `Repo` to execute queries, insert data, and manage transactions.

### 🔄 The Request Flow
1. The **Client** sends an HTTP GET request to `/api/products/1`.
2. The **Router** matches the path and directs it to the `ProductController`.
3. The **Controller** delegates the work by calling the domain context: `ShoppingCart.Catalog.get_product!(1)`.
4. The **Context** (`Catalog`) builds an Ecto query and passes it to `ShoppingCart.Repo.get!(Product, 1)`.
5. The **Repo** executes the query against the database and returns a populated `Product` schema struct.
6. The Context passes the struct back to the Controller.
7. The **Controller** hands the struct to a JSON View/Component, which serializes it into the standard JSON response and returns an `HTTP 200 OK`.

---

## Directory Structure

A standard Phoenix application splits the core logic from the web interface inside the `lib` directory:

```text
/backend-elixir
│
├── /lib
│   ├── /shopping_cart             # The Core Business Domain
│   │   ├── /catalog               # Context: Product logic (e.g., catalog.ex)
│   │   │   └── product.ex         # Ecto Schema for a Product
│   │   ├── application.ex         # BEAM supervision tree setup
│   │   └── repo.ex                # Database connection configuration
│   │
│   └── /shopping_cart_web         # The Web Interface / API Layer
│       ├── /controllers           # API Controllers (e.g., product_controller.ex)
│       ├── /controllers/fallback  # Error handling (e.g., fallback_controller.ex)
│       ├── endpoint.ex            # Request pipeline entry point
│       └── router.ex              # HTTP route definitions
│
├── /priv/repo/migrations          # Database migrations
├── mix.exs                        # Project dependencies and setup
└── Dockerfile                     # Containerization instructions
```

## From the root of the entire repository
docker-compose up --build

## Running Standalone
```text
# Install dependencies
mix deps.get

# Create, migrate, and seed the database
mix ecto.setup

# Start the Phoenix server
mix phx.server
```