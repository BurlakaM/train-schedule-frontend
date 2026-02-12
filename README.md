# Train Schedule Frontend

Frontend part of the **Train Schedule Application**, built with **Next.js (App Router)** and **TypeScript**.

This application allows users to:

- Register and login
- View train schedules
- Create new trains
- Edit their own trains
- Delete their own trains

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Context API (Authentication)
- Axios (API requests)

---

## Installation

```bash
npm install
```

---

## Run the project

### Development mode

```bash
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the root of the frontend project:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

If deployed, replace with your backend URL:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

---

## Project Structure

```
app/
 ├ login/page.tsx
 ├ register/page.tsx
 ├ trains/
 │   ├ page.tsx
 │   ├ [id]/page.tsx
 │   └ edit/[id]/page.tsx
 ├ layout.tsx
 ├ MainLayout.tsx
 └ page.tsx
 
components/
 ├ Header.tsx
 ├ ProtectedRoute.tsx
 ├ TrainForm.tsx
 ├ TrainItem.tsx
 └ TrainList.tsx

context/
 └ AuthContext.tsx

lib/
 └ api.ts
```

---

## Authentication

Authentication is handled via:

- JWT tokens
- AuthContext
- ProtectedRoute component

Token is stored in localStorage and automatically attached to API requests.

Example header:

```
Authorization: Bearer <token>
```

---

## Styling

- Tailwind CSS

---

## Author

Train Schedule Application
