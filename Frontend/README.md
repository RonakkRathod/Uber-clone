# Uber Frontend

This is the frontend app for the Uber clone project.
It is built with React + Vite and uses React Router for page navigation.

---

## 1. Project Structure (Important Files)

```text
Frontend/
	src/
		main.jsx
		App.jsx
		pages/
			Home.jsx
			UserLogin.jsx
			UserSignup.jsx
			CaptainLogin.jsx
			CaptainSignUp.jsx
```

- `src/main.jsx`: app entry point
- `src/App.jsx`: main router/app wrapper
- `src/pages/`: all route-level screens

---

## 2. Typical Development Flow

1. Start backend server first.
2. Start frontend app.
3. Open the app URL from terminal.
4. Work page-by-page from files in `src/pages/`.

---

## 3. Troubleshooting

- Port already in use:
	stop the process using the port, then restart the frontend app.
- Node modules issue:
	reinstall project dependencies.
- API not working:
	confirm backend is running and API URL/config is correct.

---

## 4. Tech Stack

- React
- Vite
- React Router DOM
- Tailwind CSS
- ESLint

---

Maintained for easy manual setup and day-to-day development.
