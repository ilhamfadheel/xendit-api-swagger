# Project Description

## Overview
This project is an Express.js application that integrates with the Xendit API to provide various financial services such as creating disbursements, virtual accounts, and invoices. The application also includes Swagger documentation for easy API exploration and testing.

## Features
- **Invoice Management**: Supports creating, retrieving, and expiring invoices.
- **Swagger Documentation**: Provides interactive API documentation using Swagger UI.

## Technologies Used
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js to handle HTTP requests and routing.
- **Xendit API**: Financial services API for disbursements, virtual accounts, and invoices.
- **Swagger UI**: Tool for generating interactive API documentation.
- **dotenv**: Module to load environment variables from a `.env` file.

## Setup Instructions
1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following content:
   ```dotenv
   XENDIT_API_KEY=your_xendit_api_key
   PORT=3001
   ```

4. **Start the server**:
   ```sh
   npm start
   ```

5. **Access the API documentation**:
   Open your browser and navigate to `http://localhost:3001/api-docs` to view the Swagger UI documentation.