const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

app.use(cors());
app.use(express.json());

let villages = [];

// Fix truncated state names from CSV
const STATE_MAP = {
  'PRADESH':  'UTTAR PRADESH',
  'BENGAL':   'WEST BENGAL',
  'NADU':     'TAMIL NADU',
  'HAVELI':   'DADRA AND NAGAR HAVELI',
  'DIU':      'DAMAN AND DIU',
  'ISLANDS':  'ANDAMAN AND NICOBAR ISLANDS',
};

function fixState(s) {
  if (!s) return 'Unknown';
  const up = s.trim().toUpperCase();
  return STATE_MAP[up] || up;
}

function getVillageName(row) {
  return row["Area Name"] || row.name || row.Village_Name || Object.values(row)[0] || "Unknown";
}

fs.createReadStream('cleaned_data.csv')
  .pipe(csv({ separator: ',' }))
  .on('data', (row) => {
    villages.push({
      name: getVillageName(row),
      state: fixState(row.State || row.state || row["State Name"])
    });
  })
  .on('end', () => {
    console.log('CSV loaded successfully');
    console.log('Total villages:', villages.length);
  })
  .on('error', (err) => console.error("CSV Error:", err));

app.get('/villages', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 100, 500);
  res.json(villages.slice(0, limit));
});

app.get('/villages/all', (req, res) => res.json(villages));

app.get('/villages/search', (req, res) => {
  const query = req.query.name?.toLowerCase().trim();
  if (!query) return res.json([]);
  res.json(villages.filter(v => v.name.toLowerCase().includes(query)).slice(0, 100));
});

app.get('/villages/page', (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = parseInt(req.query.limit) || 50;
  const start = (page - 1) * limit;
  res.json({
    page,
    totalVillages: villages.length,
    totalPages: Math.ceil(villages.length / limit),
    data: villages.slice(start, start + limit)
  });
});

app.get('/villages/states', (req, res) => {
  res.json([...new Set(villages.map(v => v.state))].filter(s => s !== 'Unknown').sort());
});

app.get('/villages/by-state', (req, res) => {
  const state = req.query.state?.toLowerCase().trim();
  if (!state) return res.json([]);
  res.json(villages.filter(v => v.state.toLowerCase().includes(state)).slice(0, 500));
});

app.get('/villages/stats', (req, res) => {
  const counts = {};
  villages.forEach(v => { counts[v.state] = (counts[v.state] || 0) + 1; });
  res.json({
    totalVillages: villages.length,
    totalStates: Object.keys(counts).length,
    topStates: Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,10).map(([state,count]) => ({state,count}))
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
