const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the Simply Independent Backend!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 