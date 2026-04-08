FROM elixir:latest
RUN mix local.hex --force && mix local.rebar --force
RUN mix archive.install hex phx_new --force
WORKDIR /app
COPY . .
RUN mix deps.get
EXPOSE 4000
CMD ["mix", "phx.server"]