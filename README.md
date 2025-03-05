# Certification Management System - Frontend

This is the frontend of the **Certification Management System**, built using **React.js** with **Material UI**.

## Features

- View, Add, Edit, and Delete certifications.
- Upload and manage associated documents.
- Sort and search certifications by name.
- Track remaining days until certificate expiration.

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/username/certification-frontend.git
cd certification-frontend
```

### 2. Install Dependencies
```sh
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @fontsource/roboto
npm install @mui/icons-material
npm install axios --save
npm install react-router-dom
```

### 3. Start the Development Server
```sh
npm start
```
> **Note:** Always check the `package.json` file for the required dependencies.

## Built With

- **React.js** - Frontend Library
- **Material UI** - UI Components
- **React Router** - Client-side Routing
- **Axios** - API Requests

## Project Structure
```
certification-frontend/
│── src/
│   ├── components/   # Reusable UI Components
│   ├── pages/        # Application Pages
│   ├── services/     # API Calls and Services
│   ├── utils/        # Helper Functions
│   ├── App.js        # Main App Component
│   ├── index.js      # Entry Point
│
│── public/           # Static Assets
│── package.json      # Dependencies and Scripts
│── README.md         # Documentation
```

## Contributing
If you would like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.


Happy Coding! 🚀
