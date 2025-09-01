# Task Manager App (Helfy Task)

A simple full-stack Task Manager with a **React + Vite** frontend and a **Node.js + Express** backend (in-memory storage). Users can create, view, update, delete, toggle completion, and filter tasks. The UI includes an **endless carousel** that smoothly loops through tasks.

## Tech Stack

- **Frontend:** React, Vite, TypeScript (optional), Fetch API, plain CSS (no frameworks)  
- **Backend:** Node.js, Express.js, CORS, in-memory data array  

## Features

- CRUD for tasks (title, description, priority, createdAt, completed)
- Toggle completion (done/undone)
- Filter by **All / Completed / Pending**
- **Endless carousel** (vanilla React/JS—no carousel libraries)
- Priority badges (low / medium / high)
- Loading & error states
- Responsive, clean UI using **regular CSS only**

## Repository Structure

```
task-manager/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   │   └── tasks.routes.js
│   └── middleware/
│       └── errorHandler.js
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── components/
│       │   ├── TaskList.tsx (or .jsx)
│       │   ├── TaskItem.tsx
│       │   ├── TaskForm.tsx
│       │   ├── TaskFilter.tsx
│       │   ├── Spinner.tsx
│       │   └── ErrorBanner.tsx
│       ├── services/
│       │   └── api.ts
│       ├── styles/
│       │   └── globals.css
│       ├── types/
│       │   └── Task.ts
│       └── App.tsx
├── .gitignore
└── README.md
```

> **Note:** File names are examples—use your project’s actual files.

---

## Getting Started

### 1) Backend Setup (Port 4000)

```bash
cd backend
npm install
# Dev (with nodemon):
npm run dev
# or Prod:
npm start
```

The backend runs at: `http://localhost:4000`

### 2) Frontend Setup (Vite)

```bash
cd frontend
npm install
# Vite dev server (defaults to http://localhost:5173)
npm run dev
```

Create a `.env` in `frontend` (optional) to set the API base:
```
VITE_API_BASE=http://localhost:4000
```

### 3) Run Both (Optional convenience)

- Open two terminals (one in `backend`, one in `frontend`), or
- Add a root script using a runner like `npm-run-all` / `concurrently` (optional).

---

## API Documentation

### Task Model

```ts
type Priority = 'low' | 'medium' | 'high';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string | Date;
  priority: Priority;
}
```

> Stored in memory (no database). IDs are numeric.

### Endpoints

- **GET** `/api/tasks` — Get all tasks  
- **POST** `/api/tasks` — Create a task  
- **PUT** `/api/tasks/:id` — Update a task (full object)  
- **DELETE** `/api/tasks/:id` — Delete a task  
- **PATCH** `/api/tasks/:id/toggle` — Toggle completion

### Request/Response Examples

**Create Task**
```bash
curl -X POST http://localhost:4000/api/tasks  -H "Content-Type: application/json"  -d '{
   "title":"Write README",
   "description":"Document project setup",
   "priority":"high"
 }'
```

**Response (201)**
```json
{
  "id": 1,
  "title": "Write README",
  "description": "Document project setup",
  "completed": false,
  "createdAt": "2025-09-01T17:00:00.000Z",
  "priority": "high"
}
```

**Update Task**
```bash
curl -X PUT http://localhost:4000/api/tasks/1  -H "Content-Type: application/json"  -d '{
   "title":"Write README",
   "description":"Add API docs and setup",
   "priority":"medium",
   "completed":false
 }'
```

**Toggle Completion**
```bash
curl -X PATCH http://localhost:4000/api/tasks/1/toggle
```

**Delete**
```bash
curl -X DELETE http://localhost:4000/api/tasks/1
```

### Validation & Errors

- **POST/PUT** validate required fields:
  - `title` (non-empty string)
  - `priority` ∈ `low|medium|high`
- Returns meaningful HTTP codes: `400` (bad input), `404` (not found), `500` (unexpected)
- CORS enabled, JSON bodies via `express.json()`

---

## Frontend Notes

- **Endless Carousel:** Implemented with vanilla React logic (no external carousel libs). Items loop seamlessly; large lists remain smooth (use memoization and lightweight DOM updates).
- **Filtering:** Local UI filter: `all | completed | pending`.
- **Priority UI:** Visual badges/colors (CSS only).
- **States:** Loading spinners, error banners.
- **Responsive:** Mobile-friendly layout with simple, modern CSS.

---

## Available Scripts (example)

### Backend (`/backend/package.json`)
- `start` — start server
- `dev` — start with nodemon (watch)

### Frontend (`/frontend/package.json`)
- `dev` — start Vite dev server
- `build` — production build
- `preview` — preview prod build

---

## Assumptions & Design Decisions

- **In-memory** persistence only (per assignment). Data resets on server restart.
- **IDs** are simple incrementing integers.
- **createdAt** set by backend on creation.
- **No CSS frameworks**; only plain CSS for styling.
- **No carousel libraries**; endless loop is custom.

---

## Testing the Flow (Quick Checklist)

1. Start backend (`:4000`) and frontend (Vite).
2. Create several tasks (different priorities).
3. Verify carousel loops infinitely and remains smooth.
4. Toggle completion; check filter All/Completed/Pending.
5. Edit and delete tasks; verify UI updates immediately.
6. Check loading and error messages by simulating failures (e.g., stop backend).

=======
# Task Manager App
## Backend Setup
1. cd backend
2. npm install
3. npm start(runs on port 4000)
## Frontend Setup
1. cd frontend
2. npm install
3. npm start(runs on port 3000)
## API Endpoints
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle
>>>>>>> 9470fb91d346fbe08c9d102f5e914e70c528cd91
