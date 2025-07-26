#!/bin/bash

# Production Deployment Script for Asam Abd Moving Company Website

set -e

echo "🚀 Starting production deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo -e "${YELLOW}Please copy .env.example to .env and configure your environment variables.${NC}"
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
required_vars=("DATABASE_URL" "NEXTAUTH_SECRET" "JWT_SECRET")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "${RED}❌ Error: $var is not set in .env file${NC}"
        exit 1
    fi
done

echo -e "${GREEN}✅ Environment variables validated${NC}"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker compose down

# Remove old images (optional - uncomment if you want to force rebuild)
# echo "🗑️  Removing old images..."
# docker image prune -f

# Build and start containers
echo "🏗️  Building and starting containers..."
docker compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if docker compose ps | grep -q "healthy"; then
        echo -e "${GREEN}✅ Services are healthy!${NC}"
        break
    fi
    
    attempt=$((attempt + 1))
    echo "Attempt $attempt/$max_attempts - waiting for services..."
    sleep 10
done

if [ $attempt -eq $max_attempts ]; then
    echo -e "${RED}❌ Services failed to become healthy within expected time${NC}"
    echo "📋 Container status:"
    docker compose ps
    echo "📋 Container logs:"
    docker compose logs
    exit 1
fi

# Run database migrations
echo "🗃️  Running database migrations..."
docker compose exec app npx prisma migrate deploy

# Show deployment status
echo "📋 Deployment Status:"
docker compose ps

# Show application URLs
APP_PORT=${APP_PORT:-5000}
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Application is running at: http://localhost:$APP_PORT${NC}"
echo -e "${GREEN}🔧 Admin panel: http://localhost:$APP_PORT/admin${NC}"
echo -e "${GREEN}🏥 Health check: http://localhost:$APP_PORT/api/health${NC}"

# Show useful commands
echo ""
echo "📚 Useful commands:"
echo "  View logs: docker compose logs -f"
echo "  Stop services: docker compose down"
echo "  Database console: docker compose exec postgres psql -U \$POSTGRES_USER -d \$POSTGRES_DB"
echo "  App shell: docker compose exec app sh"

# Optional: Open browser (uncomment if desired)
# if command -v xdg-open > /dev/null; then
#     xdg-open "http://localhost:$APP_PORT"
# elif command -v open > /dev/null; then
#     open "http://localhost:$APP_PORT"
# fi
