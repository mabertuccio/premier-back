const express = require('express');
const cors = require('cors');
const teamsRouter = require('./routes/teams');

const app = express();
const PORT = 5000;

// Middleware para parsear a JSON
app.use(express.json());
app.use(cors());

// Usa las rutas definidas previamente
app.use('', teamsRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
