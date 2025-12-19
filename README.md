# FullStack MovieSearch App

A dynamic movie discovery engine leveraging the TMDB API to fetch real-time data, featuring server-side rendering with Express.js.


**What this project contains**
- **Backend**: `backEnd/` — Express app that exposes a reviews API and connects to MongoDB.
- **Frontend (static)**: `index.html`, `movie.html`, `script.js`, `movie.js`, `style.css` — client pages that call the public TMDB API and the local reviews backend.

**Quick features**
- Search movies using TheMovieDB API.
- View a movie's reviews on `movie.html`.
- Create, edit and delete reviews via the backend API.

## Prerequisites
- Node.js (v14+ recommended)
- npm
- A MongoDB connection string (Atlas or local MongoDB). Replace the hard-coded URI in `backEnd/index.js` with your own or set an environment variable as described below.

## Setup and run (backend)
1. Open a terminal and change into the backend folder:

	 ```powershell
	 cd backEnd
	 ```

2. Install dependencies:

	 ```powershell
	 npm install
	 ```

3. Start the backend server:

	 - If the project has a start script in `backEnd/package.json`:

		 ```powershell
		 npm start
		 ```

	 - Or run directly with node:

		 ```powershell
		 node index.js
		 ```

By default this project listens on port `8000` (see `backEnd/index.js`).

Important: `backEnd/index.js` currently contains a MongoDB URI string. For production or sharing, replace it with a value from an environment variable instead, e.g. `process.env.MONGODB_URI`.

## Frontend (development)
- The frontend is static files in the repository root. You can open `index.html` directly in a browser for basic testing, or serve the root folder with a static server (e.g., `npx serve .`). The frontend expects the reviews API to be available at `http://localhost:8000/api/v1/reviews/`.

## API endpoints (implemented in backend)
The backend exposes the following review endpoints under `/api/v1/reviews`:

- POST `/api/v1/reviews/new` — Create a new review.
	- JSON payload example: `{ "movieId": 550, "user": "alice", "review": "Great movie!" }`
- GET `/api/v1/reviews/movie/:id` — Get all reviews for a movie id.
- GET `/api/v1/reviews/:id` — Get a single review by its review id.
- PUT `/api/v1/reviews/:id` — Update a review (body should contain `user` and `review`).
- DELETE `/api/v1/reviews/:id` — Delete a review by id.

The backend expects JSON bodies — `express.json()` middleware is already configured in `backEnd/server.js`.

## Examples: Sending a POST to create a review

PowerShell (native - recommended on Windows):

```powershell
Invoke-RestMethod -Method Post -Uri 'http://localhost:8000/api/v1/reviews/new' -ContentType 'application/json' -Body '{"movieId":550,"user":"alice","review":"Great movie!"}'
```

Using the shipped `curl.exe` on Windows (escape double-quotes):

```powershell
curl.exe -X POST "http://localhost:8000/api/v1/reviews/new" -H "Content-Type: application/json" -d "{\"movieId\":550,\"user\":\"alice\",\"review\":\"Great movie!\"}"
```

If you use Git Bash or WSL you can use single-quoted JSON without escaping:

```bash
curl -X POST http://localhost:8000/api/v1/reviews/new -H "Content-Type: application/json" -d '{"movieId":550,"user":"alice","review":"Great movie!"}'
```

Troubleshooting tip: If you see a JSON parse error from `body-parser`, ensure your JSON is valid and that the request body is sent as proper JSON (PowerShell quoting is a common source of invalid JSON). Use `Invoke-RestMethod` on PowerShell to avoid complex escaping.

## Development notes & next steps
- Replace the hard-coded MongoDB URI in `backEnd/index.js` with an environment variable. Example using PowerShell before starting the server:

```powershell
$env:MONGODB_URI = "your_mongo_uri_here"
node index.js
```

- Add basic validation on the backend to return clear 400 errors for malformed requests.
- Add frontend UI for submitting reviews (a small form on `movie.html`) that POSTs to `/api/v1/reviews/new`.

## Repository layout (important files)
- `index.html`, `movie.html`, `script.js`, `movie.js`, `style.css` — Static client files.
- `backEnd/server.js` — Express app configuration (CORS, JSON middleware).
- `backEnd/index.js` — Entry point: connects to MongoDB and starts server.
- `backEnd/api/reviews.route.js` — API routes (wires to `ReviewsController`).
- `backEnd/api/reviews.controller.js` — Controller for handling review API logic.
- `backEnd/dao/reviewsDAO.js` — Data access layer for MongoDB.

If you want, I can:
- Add an example review submission form to `movie.html` and client-side JS to POST reviews.
- Replace the hard-coded Mongo URI with an environment-based configuration.

Enjoy building — open an issue or ask for the next enhancement and I can implement it.

