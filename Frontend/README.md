# Uber Frontend - Beginner Developer Guide

This guide is for frontend developers who are new to this project.
It explains what is already built, how routing and wrappers work, where auth happens, and how to safely add new pages/features.

---

## Quick Start Cheat Sheet

Use this section when you want the shortest path to run and work on frontend.

### 1) Run app

```bash
cd Frontend
npm install
```

Create `.env` in `Frontend/`:

```env
VITE_BASE_URL=http://localhost:7000/api/v1
```

```bash
npm run dev
```

### 2) Main files you will touch first

- `src/App.jsx` -> all routes
- `src/pages/` -> page-level screens
- `src/context/UserContext.jsx` -> user state
- `src/context/CaptainContext.jsx` -> captain state

### 3) Route protection rule

- User protected route -> wrap with `UserProtectedWraper`
- Captain protected route -> wrap with `CaptainProtectedWrapper`

Example:

```jsx
<Route
	path="/example"
	element={
		<UserProtectedWraper>
			<ExamplePage />
		</UserProtectedWraper>
	}
/>
```

### 4) Auth flow in one glance

1. Login/signup page calls API.
2. Save token in `localStorage` as `token`.
3. Navigate to protected page (`/home` or `/captain-home`).
4. Wrapper calls profile API with `Authorization: Bearer <token>`.
5. If token invalid: clear token and redirect to login page.

### 5) Current important routes

- Public: `/`, `/login`, `/signup`, `/captain-login`, `/captain-signup`, `/riding`
- User protected: `/home`, `/logout`
- Captain protected: `/captain-home`, `/captain-logout`

### 6) Most common daily workflow

1. Create/edit page in `src/pages/`.
2. Add/adjust route in `src/App.jsx`.
3. If protected, wrap with correct wrapper.
4. Wire API call using `${import.meta.env.VITE_BASE_URL}`.
5. Test with valid token and without token.

### 7) 30-second debugging checklist

- `.env` has correct `VITE_BASE_URL`
- Backend is running
- Token exists in localStorage key `token`
- Authorization header is sent in profile/logout calls
- Correct wrapper is used for protected route

---

## 1. What This Frontend Does

This app supports 2 roles:

1. User
2. Captain

Both roles have separate login/signup flows, separate protected pages, and separate logout behavior.

Main frontend responsibilities:

- Render screens with React Router.
- Store JWT token in `localStorage` after login/signup.
- Load profile on protected routes using wrappers.
- Redirect to login pages if token is missing/invalid.
- Drive ride-booking UI flow on the user home page.

---

## 2. Tech Stack

- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- GSAP (animation on Home page panels)
- Remix Icons

---

## 3. Important Frontend Files

```text
Frontend/
	src/
		main.jsx                       # app entry, providers + router mount
		App.jsx                        # all route definitions
		context/
			UserContext.jsx              # user global state
			CaptainContext.jsx           # captain global state
		pages/
			Start.jsx
			UserLogin.jsx
			UserSignup.jsx
			UserProtectedWraper.jsx
			UserLogout.jsx
			Home.jsx
			Riding.jsx
			CaptainLogin.jsx
			CaptainSignUp.jsx
			CaptainProtectedWrapper.jsx
			CaptainLogout.jsx
			CaptainHome.jsx
		components/
			LocationSearchPanel.jsx
			VehiclePanel.jsx
			ConfirmedRide.jsx
			LookingForDriver.jsx
			WaitingForDriver.jsx
```

---

## 4. Setup and Run (Frontend Only)

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install

```bash
cd Frontend
npm install
```

### Environment variable

Create a `.env` file in `Frontend/`:

```env
VITE_BASE_URL=http://localhost:7000/api/v1
```

### Start dev server

```bash
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

---

## 5. Route Map (Current)

Defined in `src/App.jsx`.

| Route | Page | Access | Notes |
| --- | --- | --- | --- |
| `/` | `Start` | Public | Landing/start page |
| `/login` | `UserLogin` | Public | User login |
| `/signup` | `UserSignup` | Public | User registration |
| `/home` | `Home` | Protected (User wrapper) | Main user booking flow |
| `/logout` | `UserLogout` | Protected (User wrapper) | Logs out user then redirects |
| `/riding` | `Riding` | Public (currently) | Ride details/payment mock UI |
| `/captain-login` | `CaptainLogin` | Public | Captain login |
| `/captain-signup` | `CaptainSignUp` | Public | Captain registration |
| `/captain-home` | `CaptainHome` | Protected (Captain wrapper) | Captain dashboard placeholder |
| `/captain-logout` | `CaptainLogout` | Protected (Captain wrapper) | Logs out captain then redirects |

---

## 6. Auth and Wrapper Flow

### Token storage

After login/signup success:

- token is saved in `localStorage` key: `token`

### User protected wrapper

`UserProtectedWraper.jsx` does:

1. Read token from `localStorage`.
2. If no token -> navigate to `/login`.
3. If token exists -> call `GET {VITE_BASE_URL}/users/profile` with `Authorization: Bearer <token>`.
4. If success -> store profile in `UserContext`.
5. If fail -> remove token and redirect to `/login`.

### Captain protected wrapper

`CaptainProtectedWrapper.jsx` does the same pattern with:

- Profile API: `GET {VITE_BASE_URL}/captain/profile`
- Redirect target: `/captain-login`
- Context: `CaptainContext`

### Why wrappers matter

Wrappers keep route protection centralized, so page components stay focused on UI/business logic.

---

## 7. Page-by-Page Responsibilities

### `Start.jsx`

- Welcome/entry screen
- CTA to user login route

### `UserLogin.jsx`

- Collects email/password
- Calls `POST /users/login`
- On success:
	- save `authToken`
	- set user context
	- navigate to `/home`

### `UserSignup.jsx`

- Collects name, email, password
- Calls `POST /users/register`
- On success:
	- save `token`
	- set user context
	- navigate to `/home`

### `Home.jsx`

- Main user booking UI
- Uses GSAP for animated bottom-sheet style panels
- Controls panel flow with local state:
	- location search
	- vehicle selection
	- ride confirmation
	- searching driver
	- waiting driver

### `Riding.jsx`

- Ride summary and payment mock screen

### `UserLogout.jsx`

- Calls `POST /users/logout` with token
- Clears local token in `finally`
- Redirects to `/login`

### `CaptainLogin.jsx`

- Collects captain email/password
- Calls `POST /captain/login`
- On success:
	- save `authToken`
	- set captain context
	- navigate to `/captain-home`

### `CaptainSignUp.jsx`

- Collects captain identity + vehicle fields
- Calls `POST /captain/register`
- On success:
	- save `captainToken`
	- set captain context
	- navigate to `/captain-home`

### `CaptainHome.jsx`

- Placeholder page (currently minimal)

### `CaptainLogout.jsx`

- Calls `POST /captain/logout` with token
- Clears local token in `finally`
- Redirects to `/captain-login`

---

## 8. Context Providers (Global State)

Mounted in `main.jsx`:

1. `CaptainContextProvider`
2. `UserContext`
3. `BrowserRouter`

### `UserContext`

- Exposes `user` + `setUser`
- Used by login/signup + user protected wrapper

### `CaptainContext`

- Exposes `captain` + `setCaptain`
- Used by captain login/signup + captain protected wrapper

---

## 9. API Usage From Frontend

This frontend expects these endpoints (base: `VITE_BASE_URL`):

### User APIs

- `POST /users/register`
- `POST /users/login`
- `GET /users/profile` (protected)
- `POST /users/logout` (protected)

### Captain APIs

- `POST /captain/register`
- `POST /captain/login`
- `GET /captain/profile` (protected)
- `POST /captain/logout` (protected)

---

## 10. Typical Frontend Development Workflow

1. Pull latest code.
2. Run `npm install` if dependencies changed.
3. Confirm `.env` has valid `VITE_BASE_URL`.
4. Start frontend with `npm run dev`.
5. Build feature page-by-page under `src/pages/`.
6. Register route in `src/App.jsx`.
7. If protected route: wrap with the correct wrapper.
8. If global user/captain data needed: use context.
9. Test both happy path and invalid-token flow.

---

## 11. How To Add a New Protected Page

Example: add `UserProfile.jsx` for authenticated users.

1. Create `src/pages/UserProfile.jsx`.
2. Add route in `src/App.jsx`:

```jsx
<Route
	path="/user-profile"
	element={
		<UserProtectedWraper>
			<UserProfile />
		</UserProtectedWraper>
	}
/>
```

3. In page component, consume `UserDataContext` if profile details are needed.
4. Verify:
	 - without token -> redirects to `/login`
	 - with valid token -> page renders

---

## 12. Common Issues and Fixes

### Blank/failed API calls

- Check `.env` value for `VITE_BASE_URL`.
- Ensure backend is running and reachable.
- Check browser network tab for 401/404/500.

### Instant redirect to login on protected pages

- Token missing or invalid.
- Wrapper profile call failing.
- Check `localStorage.getItem("token")` in browser devtools.

### CORS/cookie confusion

- This frontend sends Bearer token in headers.
- Cookie-based auth may still exist, but current flow relies on localStorage token.

### Module import case issues

- Keep import path case exactly same as file names.
- Avoid mixed casing in filenames/imports.

---

## 13. Suggested Next Frontend Improvements

1. Add centralized axios instance with auth interceptor.
2. Add proper loading and error UI for login/signup forms.
3. Protect `/riding` if business flow requires authentication.
4. Expand `CaptainHome.jsx` with actual captain dashboard flow.
5. Add route constants file to avoid hardcoded path strings.

---

This frontend README is maintained as the single onboarding document for new frontend developers.
