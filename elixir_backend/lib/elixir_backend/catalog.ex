defmodule ElixirBackend.Catalog do
  import Ecto.Query, warn: false

  alias ElixirBackend.Catalog.Item
  alias ElixirBackend.Repo

  def list_items do
    Item
    |> order_by(asc: :id)
    |> Repo.all()
  end

  def get_item(id) when is_integer(id) do
    Repo.get(Item, id)
  end

  def create_item(attrs) when is_map(attrs) do
    %Item{}
    |> Item.changeset(attrs)
    |> Repo.insert()
  end

  def delete_item(id) when is_integer(id) do
    case Repo.get(Item, id) do
      nil ->
        {:error, :not_found}

      item ->
        Repo.delete(item)
    end
  end
end
