FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /app
COPY . .
RUN dotnet restore
EXPOSE 5000
# Using dotnet watch for auto-reload during your assignment
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5000"]