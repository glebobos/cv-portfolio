#!/bin/bash

# CV Portfolio Development Setup Script

set -e

export MY_UID="$(id -u)" MY_GID="$(id -g)"

echo "🚀 Setting up CV Portfolio development environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker with Compose plugin."
    exit 1
fi

# Function to display usage
usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev     Start development server"
    echo "  build   Build production version"
    echo "  prod    Run production version"
    echo "  clean   Clean up Docker images and containers"
    echo "  logs    Show application logs"
    echo "  shell   Enter development container shell"
    echo ""
}

# Function to start development environment
start_dev() {
    echo "🔧 Starting development environment..."
    docker compose up dev
}

# Function to build production version
build_prod() {
    echo "🏗️  Building production version..."
    docker compose run --rm build
    echo "✅ Build completed! Files are in ./dist"
}

# Function to run production version
run_prod() {
    echo "🚀 Starting production server..."
    docker compose up prod
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up..."
    docker compose down --rmi all --volumes --remove-orphans
    docker system prune -f
    echo "✅ Cleanup completed!"
}

# Function to show logs
show_logs() {
    docker compose logs -f
}

# Function to enter shell
enter_shell() {
    docker compose run --rm dev sh
}

# Main script logic
case "$1" in
    "dev")
        start_dev
        ;;
    "build")
        build_prod
        ;;
    "prod")
        run_prod
        ;;
    "clean")
        cleanup
        ;;
    "logs")
        show_logs
        ;;
    "shell")
        enter_shell
        ;;
    "")
        echo "🎯 CV Portfolio - Docker Development Environment"
        echo ""
        usage
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo ""
        usage
        exit 1
        ;;
esac
