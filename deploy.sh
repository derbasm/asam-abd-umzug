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
required_vars=("DATABASE_URL" "NEXTAUTH_SECRET" "JWT_SECRET" "ADMIN_EMAIL" "ADMIN_PASSWORD")
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

# Optional: Remove unused images to save space (but preserve database volumes)
echo "🧹 Cleaning up unused Docker images..."
docker image prune -f

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
# Set the correct DATABASE_URL for Docker network
DOCKER_DATABASE_URL="postgresql://${POSTGRES_USER:-umzug_user}:${POSTGRES_PASSWORD:-umzug_password}@postgres:5432/${POSTGRES_DB:-umzug_db}"

# Try running migrations directly in the app container
if ! docker compose exec -T app sh -c "DATABASE_URL='$DOCKER_DATABASE_URL' npx prisma db push"; then
    echo -e "${YELLOW}⚠️  Direct migration failed, trying alternative approach...${NC}"
    # Alternative: Run migration in a temporary container with correct network and database URL
    docker run --rm --network asam-abd-umzug_app-network \
        -e DATABASE_URL="$DOCKER_DATABASE_URL" \
        -v $(pwd)/prisma:/app/prisma \
        node:18-alpine sh -c "
            cd /app && 
            npm install prisma @prisma/client && 
            npx prisma db push
        "
fi

# Create admin user automatically (if not exists)
echo "👤 Creating admin user..."
if DATABASE_URL="postgresql://${POSTGRES_USER:-umzug_user}:${POSTGRES_PASSWORD:-umzug_password}@localhost:5433/${POSTGRES_DB:-umzug_db}" \
   ADMIN_EMAIL="${ADMIN_EMAIL}" \
   ADMIN_PASSWORD="${ADMIN_PASSWORD}" \
   node create-admin.js; then
    echo -e "${GREEN}✅ Admin user setup completed${NC}"
else
    echo -e "${YELLOW}⚠️  Admin user creation failed, but deployment continues${NC}"
fi

# Show deployment status
echo "📋 Deployment Status:"
docker compose ps

# Show application URLs
APP_PORT=${APP_PORT:-5000}
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Application is running at: http://localhost:$APP_PORT${NC}"
echo -e "${GREEN}🔧 Admin panel: http://localhost:$APP_PORT/admin${NC}"
echo -e "${GREEN}🏥 Health check: http://localhost:$APP_PORT/api/health${NC}"

# Show admin login information
echo ""
echo "👤 Admin Login Information:"
echo "  Username: ${ADMIN_EMAIL}"
echo "  Password: [configured in .env]"
echo "  Login URL: http://localhost:$APP_PORT/admin/login"

# Show useful commands
echo ""
echo "📚 Useful commands:"
echo "  View logs: docker compose logs -f"
echo "  Stop services: docker compose down"
echo "  Restart deployment: ./deploy.sh"
echo "  Database console: docker compose exec postgres psql -U \$POSTGRES_USER -d \$POSTGRES_DB"
echo "  App shell: docker compose exec app sh"

echo ""
echo -e "${GREEN}✅ Note: Database data is persistent - your admin user and other data will survive deployments!${NC}"

# Optional: Open browser (uncomment if desired)
# if command -v xdg-open > /dev/null; then
#     xdg-open "http://localhost:$APP_PORT"
# elif command -v open > /dev/null; then
#     open "http://localhost:$APP_PORT"
# fi
