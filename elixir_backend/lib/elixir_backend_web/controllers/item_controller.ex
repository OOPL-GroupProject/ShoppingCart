defmodule ElixirBackendWeb.ItemController do
  use ElixirBackendWeb, :controller

  alias ElixirBackend.Catalog

  def index(conn, _params) do
    items = Catalog.list_items()
    json(conn, Enum.map(items, &item_to_response/1))
  end

  def show(conn, %{"id" => id}) do
    with {item_id, ""} <- Integer.parse(id),
         item when not is_nil(item) <- Catalog.get_item(item_id) do
      json(conn, item_to_response(item))
    else
      _ -> send_resp(conn, :not_found, "")
    end
  end

  def create(conn, params) do
    case Catalog.create_item(params) do
      {:ok, item} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", ~p"/api/items/#{item.id}")
        |> json(item_to_response(item))

      {:error, changeset} ->
        conn
        |> put_status(:bad_request)
        |> json(%{errors: translate_errors(changeset)})
    end
  end

  def delete(conn, %{"id" => id}) do
    with {item_id, ""} <- Integer.parse(id),
         {:ok, _item} <- Catalog.delete_item(item_id) do
      send_resp(conn, :no_content, "")
    else
      _ -> send_resp(conn, :not_found, "")
    end
  end

  defp item_to_response(item) do
    %{
      id: item.id,
      name: item.name,
      type: item.type,
      price: item.price,
      quantity: item.quantity,
      description: item.description
    }
  end

  defp translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {message, opts} ->
      Regex.replace(~r"%\{(\w+)\}", message, fn _, key ->
        opts
        |> Keyword.get(String.to_existing_atom(key), key)
        |> to_string()
      end)
    end)
  end
end
