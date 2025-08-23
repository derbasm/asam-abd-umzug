#!/bin/bash

echo "🚀 Asam Abd Umzug - Development Setup"
echo "===================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "📦 Starting PostgreSQL database..."
docker compose up postgres -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

echo "🔧 Pushing database schema..."
yarn db:push

echo "👤 Creating admin user (if not exists)..."
node create-admin.js

echo "🏥 Checking application health..."
curl -s http://localhost:3000/api/health > /dev/null || echo "⚠️  App not running - start with 'yarn dev'"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Run 'yarn dev' to start the development server"
echo "   2. Visit http://localhost:3000"
echo "   3. Admin login: http://localhost:3000/admin/login"
echo ""
echo "🔑 Admin credentials:"
echo "   Username: ABO_FADI"
echo "   Password: Ma9495232ma+"
echo ""
echo "🐛 Troubleshooting:"
echo "   - Health check: http://localhost:3000/api/health"
echo "   - Database: docker compose logs postgres"
echo "   - Stop all: docker compose down"
