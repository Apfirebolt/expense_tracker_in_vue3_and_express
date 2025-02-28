## Expense Tracker App in MEVN Stack

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Headless UI](https://img.shields.io/badge/Headless%20UI-000000?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

It is an Expense Management application written in MEVN (MongoDB, Express, Vue and Node) stack.

### Features

- **User Authentication**: Secure login and registration system.
- **Expense Management**: Add, edit, and delete expenses.
- **Category Management**: Organize expenses by categories.
- **Reports and Analytics**: Visualize spending patterns with calendar.
- **Responsive Design**: Works on both desktop and mobile devices.

### Technologies Used

- **MongoDB**: Database for storing user and expense data.
- **Express.js**: Backend framework for building the API.
- **Vue.js**: Frontend framework for building the user interface.
- **Node.js**: Runtime environment for executing server-side code.
- **Headless UI**: For dynamic styled components like modal and dropdown.
- **Tailwind CSS**: For styling

### Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/expense_tracker.git
  ```
2. Navigate to the project directory:
  ```bash
  cd expense_tracker
  ```
3. Install dependencies for both frontend and backend:
  ```bash
  npm install
  cd client
  npm install
  cd ..
  ```
4. Set up environment variables by creating a `.env` file in the root directory and adding the following:
  ```
  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  ```

### Usage

1. Start the backend server:
  ```bash
  npm run server
  ```
2. Start the frontend development server:
  ```bash
  cd client
  npm run serve
  ```
3. Open your browser and navigate to `http://localhost:8080`.

### Contributing

1. Fork the repository.
2. Create a new branch:
  ```bash
  git checkout -b feature-name
  ```
3. Make your changes and commit them:
  ```bash
  git commit -m 'Add some feature'
  ```
4. Push to the branch:
  ```bash
  git push origin feature-name
  ```
5. Open a pull request.

### License

This project is licensed under the MIT License.