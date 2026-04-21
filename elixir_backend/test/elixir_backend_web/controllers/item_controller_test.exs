defmodule ElixirBackendWeb.ItemControllerTest do
  use ElixirBackendWeb.ConnCase, async: true

  alias ElixirBackend.Catalog.Item
  alias ElixirBackend.Repo

  test "GET /api/items returns item list", %{conn: conn} do
    first = insert_item!(%{name: "Keyboard", type: 0, price: Decimal.new("49.99"), quantity: 4})
    second = insert_item!(%{name: "Notebook", type: 7, price: Decimal.new("12.50"), quantity: 9})

    response = conn |> get(~p"/api/items") |> json_response(200)

    assert response == [
             %{
               "id" => first.id,
               "name" => "Keyboard",
               "type" => 0,
               "price" => "49.99",
               "quantity" => 4,
               "description" => nil
             },
             %{
               "id" => second.id,
               "name" => "Notebook",
               "type" => 7,
               "price" => "12.50",
               "quantity" => 9,
               "description" => nil
             }
           ]
  end

  test "GET /api/items/:id returns 404 when missing", %{conn: conn} do
    conn = get(conn, ~p"/api/items/999999")
    assert response(conn, 404)
  end

  test "POST /api/items creates and returns the item", %{conn: conn} do
    payload = %{
      "name" => "  Running Shoes  ",
      "type" => 5,
      "price" => "89.95",
      "quantity" => 2,
      "description" => "  Cushioned pair  "
    }

    conn = post(conn, ~p"/api/items", payload)

    assert response(conn, 201)
    assert [location] = get_resp_header(conn, "location")

    created_item = json_response(conn, 201)

    assert created_item["name"] == "Running Shoes"
    assert created_item["type"] == 5
    assert created_item["price"] == "89.95"
    assert created_item["quantity"] == 2
    assert created_item["description"] == "Cushioned pair"
    assert location == "/api/items/#{created_item["id"]}"
  end

  test "DELETE /api/items/:id deletes existing item", %{conn: conn} do
    item = insert_item!(%{name: "Desk Lamp", type: 3, price: Decimal.new("24.10"), quantity: 1})

    conn = delete(conn, ~p"/api/items/#{item.id}")

    assert response(conn, 204)
    assert Repo.get(Item, item.id) == nil
  end

  defp insert_item!(attrs) do
    %Item{}
    |> Item.changeset(Map.new(attrs))
    |> Repo.insert!()
  end
end
