# URL Shortener

A full-stack URL shortening service with user authentication, ownership-based access control and click analytics.

**Live demo:** https://grand-narwhal-78cd0d.netlify.app
**API base URL:** https://urlshortner2-crl8.onrender.com


## Features

- Create, read, update, and delete short URLs (matches the base roadmap.sh spec)
- Redirect via short code, with automatic click/access count tracking
- User registration and login with JWT-based authentication
- Password hashing with bcrypt
- Guests can create short URLs without an account; logged-in users get ownership over theirs
- Ownership enforcement — only the creator of a URL can update, delete, or view its stats
- A dashboard listing all URLs created by the logged-in user, with live click counts
- Input validation (URL format, email format)
- Dockerized backend, deployed to Render; static frontend deployed to Netlify


## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Docker
**Frontend:** HTML, CSS, vanilla JavaScript (fetch API, localStorage)
**Database:** MongoDB Atlas
**Deployment:** Render (backend, via Docker), Netlify (frontend)

---

## API Endpoints

| Method | Endpoint              | Auth               | Description                          |
|--------|------------------------|---------------------|---------------------------------------|
| POST   | `/auth/register`       | —                   | Register a new user                   |
| POST   | `/auth/login`          | —                   | Log in, returns a JWT                 |
| POST   | `/shorten`              | Optional            | Create a short URL (guest or user)    |
| GET    | `/shorten`              | Required            | Get all URLs owned by the logged-in user |
| GET    | `/shorten/:shortCode`   | —                   | Get details of a short URL            |
| PUT    | `/shorten/:shortCode`   | Required (owner)    | Update a short URL's destination      |
| DELETE | `/shorten/:shortCode`   | Required (owner)    | Delete a short URL                    |
| GET    | `/shorten/:shortCode/stats` | Required (owner) | Get access count and metadata     |
| GET    | `/:shortCode`           | —                   | Redirect to the original URL          |

**Auth header format:** `Authorization: Bearer <token>`

---

## Design Notes

- **Ownership model:** short URLs created by a logged-in user are tied to their account (`userId`). URLs created by guests have no owner. Only the owning user can update, delete, or view stats for their own URLs — attempts by other users return `403 Forbidden`.
- **Passwords** are never stored in plain text — hashed with bcrypt (10 salt rounds) via a Mongoose pre-save hook.
- **JWTs** are signed with a server-side secret and expire after 7 days by default.
- **Duplicate URL handling:** if a logged-in user submits a URL they've already shortened, the existing short code is returned rather than creating a duplicate. Guests always get a fresh short code, since there's no reliable way to identify a returning anonymous visitor.



