# Elixir / Phoenix Backend

## Overview
This is the Elixir / Phoenix API backend used to compare against the C# / ASP.NET Core backend.

The goal of this service is endpoint and contract parity with C#:
- Same routes
- Same status codes
- Same request and response JSON shape

## API Contract (Parities with C#)

Base route: `/api/items`

- `GET /api/items` -> `200 OK` with an array of items
- `GET /api/items/:id` -> `200 OK` with an item, or `404 Not Found`
- `POST /api/items` -> `201 Created` with created item and `Location` header, or `400 Bad Request` for invalid payload
- `DELETE /api/items/:id` -> `204 No Content`, or `404 Not Found`

Item JSON shape:

```json
{
  "id": 1,
  "name": "Keyboard",
  "type": 0,
  "price": "49.99",
  "quantity": 4,
  "description": "Mechanical"
}
```

## Architecture

The backend follows Phoenix Context boundaries while remaining API-only:

- `ElixirBackend.Catalog` contains item business operations
- `ElixirBackend.Catalog.Item` is the Ecto schema + changeset validation
- `ElixirBackendWeb.ItemController` handles HTTP and delegates to the context
- `ElixirBackend.Repo` handles SQL Server persistence

## Notes

- The schema maps to SQL Server table `Item` with columns `Id`, `Name`, `Type`, `Price`, `Quantity`, and `Description`.
- CORS is enabled for `http://localhost:3000` to match frontend development.

## Run

From repository root:

```text
docker-compose up --build
```

Standalone:

```text
mix deps.get
mix phx.server
```
