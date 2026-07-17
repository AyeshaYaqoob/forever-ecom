FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files first for better layer caching
COPY ["ForeverEcom.sln", "./"]
COPY ["ForeverEcom.API/ForeverEcom.API.csproj", "ForeverEcom.API/"]
COPY ["ForeverEcom.Application/ForeverEcom.Application.csproj", "ForeverEcom.Application/"]
COPY ["ForeverEcom.Domain/ForeverEcom.Domain.csproj", "ForeverEcom.Domain/"]
COPY ["ForeverEcom.Infrastructure/ForeverEcom.Infrastructure.csproj", "ForeverEcom.Infrastructure/"]
RUN dotnet restore "ForeverEcom.sln"

# Copy remaining source code and build
COPY . .
WORKDIR "/src/ForeverEcom.API"
RUN dotnet build "ForeverEcom.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ForeverEcom.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ForeverEcom.API.dll"]
