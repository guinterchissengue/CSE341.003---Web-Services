# Explore Mozambique API

A professional academic REST API designed for discovering, categorizing, and managing tourist, cultural, historical, and natural attractions across Mozambique.

## Public Deployment & Documentation
* **Swagger UI:** https://YOUR-RENDER-URL.onrender.com/api-docs
* **Base API:** https://YOUR-RENDER-URL.onrender.com

---

## Technologies Used
* **Runtime:** Node.js (v18+)
* **Framework:** Express.js
* **Database:** MongoDB Atlas with Mongoose ODM
* **Validation:** Joi (strict server-side validation)
* **API Documentation:** Swagger UI & OpenAPI 3.0.0 (`Swagger.json`)
* **Environment Variables:** dotenv

---

## Collections & Schemas

### 1. Places (`/places`)
* `name` (String, required, min 3 chars)
* `description` (String, required, min 10 chars)
* `city` (String, required)
* `province` (String, required)
* `type` (String, enum: beach, national-park, historical, cultural, island, waterfall, reserve, museum, monument, other)
* `averageCost` (Number, min 0)
* `rating` (Number, 0 to 5)
* `latitude` / `longitude` (Geo-coordinates)
* `openingHours` (String)
* `featured` (Boolean)

### 2. Reviews (`/reviews`)
* `placeId` (ObjectId, ref: Place, must exist)
* `visitorName` (String, required, min 2 chars)
* `rating` (Number, required, 1 to 5)
* `comment` (String, required, min 5 chars)
* `visitDate` (Date, default now)

---

## Endpoints

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/places` | List all places | 200 OK |
| **GET** | `/places/:id` | Get place by ID | 200 / 400 / 404 |
| **POST** | `/places` | Create new place | 201 Created / 400 |
| **PUT** | `/places/:id` | Update place | 200 OK / 400 / 404 |
| **DELETE**| `/places/:id` | Delete place | 200 OK / 400 / 404 |
| **GET** | `/reviews` | List all reviews | 200 OK |
| **GET** | `/reviews/:id`| Get review by ID | 200 / 400 / 404 |
| **POST** | `/reviews` | Create review | 201 Created / 400 / 404 |
| **PUT** | `/reviews/:id`| Update review | 200 OK / 400 / 404 |
| **DELETE**| `/reviews/:id`| Delete review | 200 OK / 400 / 404 |

---

## Local Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd explore-mozambique