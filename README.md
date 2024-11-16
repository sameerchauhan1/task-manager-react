# Task Manager Application with React

This project is a MERN application that performs CRUD (Create, Read, Update, Delete) operations on a Postgres database. It provides a REST API with endpoints accessible via HTTP requests.

## Getting Started

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   https://github.com/sameerchauhan1/task-manager-react.git
   ```
2. **Change into the Project Directory**
   ```shell
   cd task-manager-react
   cd backend
   ```
3. **Install dependencies**
   ```shell
   npm install
   ```
4. **Create a .env into the backend folder and add the following variables**
   ```shell
   DATABASE_URL="postgress database url"
   PORT=5000
   ```
5. **Start the backend**
   ```shell
   npm run dev
   ```
6. **Change into the Project Directory**
   ```shell
   cd frontend
   npm install
   npm run dev
   ```
7. **In the config.ts file, change the API_BASE_URL to your own backend url**
  ```shell
  export const API_BASE_URL="http://localhost:5000/api"
  or
  export const API_BASE_URL = "https://task-manager-react-u5k1.onrender.com/api";
  or
  export const API_BASE_URL = "your own deployed backend url/api";
  ```


## Project functionality

Here’s is the screenshorts of the project:

![Screenshot 2024-11-16 155005](https://github.com/user-attachments/assets/c330be3c-2ec7-4d3f-aa45-c3f2eae643cc)

![Screenshot 2024-11-16 154942](https://github.com/user-attachments/assets/508273bc-adad-479a-923a-ea696c4fd105)

![Screenshot 2024-11-16 155203](https://github.com/user-attachments/assets/21380d11-c072-4f93-af77-dec8ecffb3c2)



