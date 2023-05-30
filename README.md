# Application Diagram

![databaseDiagramExam-Overview drawio](https://github.com/Abed01-lab/exam/assets/24194503/bd3f7a5f-5440-4126-921f-5f1f19f1593c)

# Project Setup and Usage Guide

This guide will walk you through the steps to set up and use the project.

## Prerequisites

-   Docker
-   Node.js (v18 or higher)
-   npm or yarn package manager

## Getting Started

1. Clone the project repository:

    ```shell
    git clone <repository_url>
    ```

1. Navigate to the project directory:

    ```shell
    cd <project-directory>
    ```

1. Run the following command to start the required services using Docker Compose:

    ```shell
    docker-compose up -d
    ```

    This will start any necessary containers, such as a database container.

1. Install the project dependencies:

    ```shell
    npm install
    ```

1. Seed the database with initial data:

    ```shell
    npm run seed
    ```

1. Start the application:

    ```shell
    npm start
    ```

## Interacting with the Application

To interact with the application, you can use a software like Postman to send HTTP requests to the server.

## Exam Video
