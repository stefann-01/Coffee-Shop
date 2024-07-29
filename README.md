# Coffee Shop

This repository contains the source code for a comprehensive coffee shop management application. This application is designed to streamline the operations of a coffee shop, including order management, inventory tracking, customer management, and reporting.

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Sample Data](#sample-data)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Features](#features)
- [Project Structure](#project-structure)
  - [Backend Services](#backend-services)
  - [Frontend Application](#frontend-application)
- [Future Enhancements](#future-enhancements)
- [Acknowledgements](#acknowledgements)

## About the Project

The Coffee Shop application aims to provide an efficient way to manage the day-to-day operations of a coffee shop. From taking customer orders to tracking inventory and generating reports, this application covers all essential aspects of coffee shop management.

### Built With

- [React](https://reactjs.org/) - Frontend library
- [Node.js](https://nodejs.org/) - Backend runtime
- [Express](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Bootstrap](https://getbootstrap.com/) - Frontend framework

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/stefann-01/Coffee-Shop.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd Coffee-Shop
   ```

3. **Install dependencies for both frontend and backend:**

   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

4. **Start MongoDB:**

   Follow the instructions to start MongoDB on your machine. Typically, you can start it with:

   ```sh
   mongod
   ```

## Usage

### Running the Application

To start the development server, use the following commands:

1. **Start the backend server:**

   ```sh
   cd server
   npm start
   ```

2. **Start the frontend development server:**

   Open a new terminal and navigate to the client directory:

   ```sh
   cd client
   npm start
   ```

3. **Access the application:**

   Open your browser and navigate to `http://localhost:3000` to use the Coffee Shop application.

### Sample Data

To populate the application with sample data for testing, you can run the provided seed script:

```sh
cd server
npm run seed
```

## Configuration

### Environment Variables

The application can be configured using environment variables. Create a `.env` file in the root of the `server` directory and add the following variables:

```
DATABASE_URL=mongodb://localhost:27017/coffeeshop
PORT=5000
JWT_SECRET=your_jwt_secret
```

## Features

- **Order Management:** 
  - Create, update, and delete customer orders.
  - View order history and status.
  
- **Inventory Management:** 
  - Track inventory levels for ingredients and products.
  - Receive notifications for low stock items.
  
- **Customer Management:** 
  - Store customer information and preferences.
  - Access purchase history and loyalty points.
  
- **Reporting:** 
  - Generate daily, weekly, and monthly sales reports.
  - Analyze inventory usage and waste.

## Project Structure

### Backend Services

The backend services are located in the `rest_servis` directory and include the following:

- **Order Service:** Manages customer orders, including CRUD operations and order status tracking.
- **Inventory Service:** Manages inventory items, tracks stock levels, and generates low stock alerts.
- **Customer Service:** Manages customer information, preferences, and purchase history.
- **Reporting Service:** Generates various reports based on sales and inventory data.

### Frontend Application

The frontend application is located in the `app_servis` directory and includes the following components:

- **Order Management UI:** Interface for creating, updating, and viewing orders.
- **Inventory Management UI:** Interface for tracking and updating inventory items.
- **Customer Management UI:** Interface for managing customer information and viewing purchase history.
- **Reporting UI:** Interface for generating and viewing sales and inventory reports.

## Future Enhancements

The project has several planned enhancements, including:

- **Mobile Application:** Develop a mobile version of the application for on-the-go management.
- **Advanced Analytics:** Add more detailed analytics and data visualization for better decision-making.
- **Loyalty Program Integration:** Implement a customer loyalty program with points and rewards.
- **Multi-language Support:** Add support for multiple languages to cater to a broader audience.

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
