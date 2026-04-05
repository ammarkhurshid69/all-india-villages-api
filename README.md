# 🇮🇳 All India Villages API

> A production-ready RESTful API serving hierarchical Indian address & location data — built as part of the Bluestock Fintech Internship Capstone Project.

---

## 📌 Project Overview

This project provides a fast, searchable API for **5,70,385+ Indian villages and areas** across all states, along with a clean frontend explorer UI. It demonstrates end-to-end full-stack development — from raw data cleaning to API design to frontend deployment.

---

## 🚀 Live Demo

Open `index.html` in your browser after starting the server locally.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Data | CSV (570K+ records), custom data pipeline |
| Frontend | Vanilla HTML, CSS, JavaScript |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

```
insternship/
├── server.js          # Express API server
├── index.html         # Frontend UI
├── cleaned_data.csv   # Cleaned India location dataset (570K+ rows)
├── README.md          # This file
└── package.json       # Node dependencies
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v16+
- npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/all-india-villages-api.git
cd all-india-villages-api

# 2. Install dependencies
npm install

# 3. Start the server
node server.js

# 4. Open index.html in your browser
# (Use Live Server or just double-click the file)
```

Server runs at: `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/villages` | Get villages (default 100, max 500) |
| GET | `/villages?limit=200` | Get villages with custom limit |
| GET | `/villages/all` | Get ALL villages ⚠️ heavy |
| GET | `/villages/search?name=rampur` | Search by village name |
| GET | `/villages/page?page=1&limit=50` | Paginated results |
| GET | `/villages/states` | List all unique states |
| GET | `/villages/by-state?state=BIHAR` | Filter by state |
| GET | `/villages/stats` | Stats — total count, top states |

### Example Response — `/villages/page?page=1&limit=2`

```json
{
  "page": 1,
  "totalVillages": 570385,
  "totalPages": 11408,
  "data": [
    { "name": "Rampur", "state": "UTTAR PRADESH" },
    { "name": "Alwar", "state": "RAJASTHAN" }
  ]
}
```

---

## 🖥️ Frontend Features

- 🔍 Live village search
- 🏷️ Filter by state
- 📄 Paginated results (50/100/200 per page)
- ⊞ Grid & List view toggle
- 📊 Real-time stats (total villages, states)
- 📱 Responsive design

---

## 🗂️ Dataset Info

- **Source:** Census of India — All India Village-level data
- **Total Records:** 5,70,385
- **Columns:** `Area Name`, `state`
- **Format:** CSV (cleaned)

---

## 👨‍💻 Developer

**Ammar**
Bluestock Fintech Internship — Capstone Project
April–May 2025

---

## 📄 License

This project is for educational and internship purposes only.
