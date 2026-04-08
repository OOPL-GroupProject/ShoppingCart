# Project Overview: Backend Comparison Study

This repository contains the code for a comprehensive backend comparison study, evaluating **C# / ASP.NET Core** against **Elixir / Phoenix**. Both backends serve an identical JSON data structure to a single, backend-agnostic **Next.js** frontend acting as a comparator. 

The entire application suite is containerized and orchestrated via Docker Compose for a seamless, "install-free" developer experience.

---

## 1. Frontend: Next.js (The Comparator)

### Overview
The frontend is built with **Next.js (App Router)** and serves as the primary interface for testing and comparing the two backends. It is strictly backend-agnostic, expecting a consistent JSON contract regardless of which backend is currently active.

### Key Features
* **Backend Agnostic:** Seamlessly switches between the C# and Elixir backends using environment variables.
* **Performance Monitoring:** Responsible for tracking, measuring, and displaying response times (Backend A vs. Backend B).
* **Global State Management:** Handles shared state such as the Shopping Cart and the Active Backend toggle.

### Directory Structure
* `/services`: Centralized API calls utilizing the `NEXT_PUBLIC_API_URL` environment variable.
* `/hooks`: Custom React hooks dedicated to logic for measuring backend performance and response times.
* `/context`: Global state management providers.

### Environment Setup
The frontend uses environment variables to dictate which backend to query. 
* **Elixir Backend:** Port `4000`
* **C# Backend:** Port `5000`

Configure your `.env.local` or Docker environment variables to swap the `NEXT_PUBLIC_API_URL` target.

## From the root of the entire repository
docker-compose up --build

## Running Standalone
```text
# Install dependencies
npm get install

# Start the  server
npm run start:dev
```