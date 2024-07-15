const express = require('express');
const router = express.Router();
const { Client } = require('pg');

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

client.connect();

router.post('/postalcodes', async (req, res) => {
  const { geoJson } = req.body;
  const polygon = `POLYGON((${geoJson.geometry.coordinates[0].map(coord => `${coord[0]} ${coord[1]}`).join(',')}))`;

  const query = `
    SELECT id 
    FROM postal_codes 
    WHERE ST_Within(geom, ST_GeomFromText('${polygon}', 4326));
  `;
  console.log(query);

  try {
    const result = await client.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;