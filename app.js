const express = require("express");
const teamsRouter = require("./routes/teams");

const app = express();
const PORT = 5000;

// Middleware para parsear a JSON
app.use(express.json());

// Usa las rutas definidas previamente
app.use("", teamsRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
