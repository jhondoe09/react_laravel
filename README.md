# Laravel React CRUD Application

This repository contains a simple CRUD (Create, Read, Update, Delete) application built with Laravel for the backend and React for the frontend. The application is containerized using Docker.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Docker Setup](#docker-setup)
- [Running Tests](#running-tests)

## Installation

To set up the project locally, follow these steps:

### Backend (Laravel)

1. Clone the repository:
    ```bash
    git clone https://github.com/jhondoe09/react_laravel
    cd your-repo-name
    ```

2. Navigate to the backend directory:
    ```bash
    cd laravel_react_crud
    ```

3. Install PHP dependencies:
    ```bash
    composer install
    ```

4. Copy the `.env.example` file to `.env` and update the environment variables:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. Set up the database:
    - Update the `.env` file with your database credentials.
    - Run the migrations:
        ```bash
        php artisan migrate
        ```

### Frontend (React)

1. Navigate to the frontend directory:
    ```bash
    cd ../react_laravel_crud
    ```

2. Install Node.js dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and update the environment variables as needed:
    ```bash
    cp .env.example .env
    ```

## Docker Setup

The application is containerized using Docker. To set up and run the containers, follow these steps:

1. Navigate to the root directory of the project:
    ```bash
    cd ..
    ```

2. Build and start the Docker containers:
    ```bash
    docker-compose up --build
    ```

3. Access the application:
    - Laravel backend: `http://localhost:8000`
    - React frontend: `http://localhost:3000`

## Running Tests

### Backend (Laravel)

1. Navigate to the backend directory:
    ```bash
    cd laravel_react_crud
    ```

2. Run the tests:
    ```bash
    php artisan test
    ```
