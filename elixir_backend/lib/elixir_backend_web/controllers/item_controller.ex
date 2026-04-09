defmodule ElixirBackendWeb.ItemController do
  use ElixirBackendWeb, :controller
  alias ElixirBackend.Repo
  alias ElixirBackend.Catalog.Item
  
  def index(conn, _params) do
    items = Repo.all(Item)
    json(conn, %{data: items})
  end
end