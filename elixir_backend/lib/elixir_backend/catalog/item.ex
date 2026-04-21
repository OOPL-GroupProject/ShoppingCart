defmodule ElixirBackend.Catalog.Item do
  use Ecto.Schema

  import Ecto.Changeset

  @primary_key {:id, :id, source: "Id", autogenerate: true}
  @item_types 0..7

  @derive {Jason.Encoder, only: [:id, :name, :type, :price, :quantity, :description]}

  schema "Item" do
    field :name, :string, source: "Name"
    field :type, :integer, source: "Type"
    field :price, :decimal, source: "Price"
    field :quantity, :integer, source: "Quantity"
    field :description, :string, source: "Description"
  end

  def changeset(item, attrs) do
    item
    |> cast(attrs, [:name, :type, :price, :quantity, :description])
    |> validate_required([:name, :type, :price, :quantity])
    |> update_change(:name, &trim_or_nil/1)
    |> update_change(:description, &trim_or_nil/1)
    |> validate_length(:name, max: 200)
    |> validate_length(:description, max: 2000)
    |> validate_number(:type, greater_than_or_equal_to: 0, less_than_or_equal_to: 7)
    |> validate_number(:price, greater_than: 0)
    |> validate_number(:quantity, greater_than_or_equal_to: 0)
    |> validate_item_type()
    |> normalize_optional_description()
  end

  defp validate_item_type(changeset) do
    validate_change(changeset, :type, fn :type, value ->
      if value in @item_types do
        []
      else
        [type: "is invalid"]
      end
    end)
  end

  defp normalize_optional_description(changeset) do
    case get_change(changeset, :description) do
      "" -> put_change(changeset, :description, nil)
      _ -> changeset
    end
  end

  defp trim_or_nil(value) when is_binary(value), do: String.trim(value)
  defp trim_or_nil(value), do: value
end
