# Task Management Application

A full-stack task management web application with user authentication, CRUD operations, and responsive design.

## 🚀 Features

- User authentication (Register/Login)
- CRUD operations for tasks
- Task status (pending, in-progress, completed)
- Task priority (low, medium, high)
- Due date tracking
- Responsive design

## 🛠️ Technologies

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication
- JWT (JSON Web Tokens)
- bcryptjs for password hashing

## 🔧 Installation

1. Clone the repository
2. Run `npm install`
3. Create `.env` file with MONGODB_URI and JWT_SECRET
4. Run `npm run dev`
5. Open `frontend/index.html` in your browser

## 📡 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Task Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## 📁 Project Structure
task-management-app/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── middleware/
│ │ └── auth.js
│ ├── models/
│ │ ├── User.js
│ │ └── Task.js
│ ├── routes/
│ │ ├── auth.js
│ │ └── tasks.js
│ └── server.js
├── frontend/
│ ├── css/
│ │ └── style.css
│ ├── js/
│ │ ├── auth.js
│ │ └── tasks.js
│ └── index.html
├── .env
├── .gitignore
└── package.json

## 👤 Author

- GitHub: [@7gdg45cdcr-maker](https://github.com/7gdg45cdcr-maker)

## 📄 License

MIT
