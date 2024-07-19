const calculatePath = require('./utils/calculatePath');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Middleware for enabling CORS

app.use(express.json()); // Middleware for parsing application/json

app.get('/', (req, res) => {
  res.send('Elevator Test!');
});

// Route to calculate the path of the elevator
app.post('/elevator-path', (req, res) => {

	// Obtains the requests and the state of the elevator
	const { requests, state } = req.body;
	

	const path = calculatePath(requests, state);
	

	res.json({ path });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
