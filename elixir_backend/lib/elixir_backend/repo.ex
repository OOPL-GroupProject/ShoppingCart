defmodule ElixirBackend.Repo do
  use Ecto.Repo,
    otp_app: :elixir_backend,
    #adapter: Ecto.Adapters.Postgres
    adapter: Ecto.Adapters.Tds
end
