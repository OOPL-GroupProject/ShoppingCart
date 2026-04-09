defmodule ElixirBackend.Catalog.Item do
  use Ecto.Schema

  @primary_key false

  @derive {Jason.Encoder, only: [:Name, :Type, :Price, :Quantity, :Description]}

  schema "Item" do
    field :Name, :string
    field :Type, :integer
    field :Price, :decimal
    field :Quantity, :integer
    field :Description, :string
  end
end