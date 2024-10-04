const express = require("express");
const fs = require("fs");
const { stat } = require("fs/promises");
const router = express.Router();

// Ruta al JSON
const dataFilePath = "./teams.json";

// Función para leer datos desde el archivo
const readData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Función para escribir datos en el archivo
const writeData = () => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Obtener todos los equipos
router.get("/api/teams", (req, res) => {
  const teams = readData();
  res.json(teams);
});

// Obtener un equipo especifico
router.get("/api/teams/:id", (req, res) => {
  const teams = readData();
  const team = teams.find((i) => i.id == req.params.id);
  if (team) {
    res.json(team);
  } else {
    res.status(404).send("Team not found");
  }
});

// Agregar un equipo nuevo
router.post("/api/teams/create", (req, res) => {
  const newTeam = { ...req.body, id: Date.now() };
  const teams = readData();
  teams.push(newTeam);
  writeData(teams);
  res.status(201).json(newTeam);
});

// Actualizar un equipo existente
router.put("/api/teams/:id", (req, res) => {
  const teams = readData();
  const index = teams.findIndex((i) => i.id == req.params.id);

  if (index !== 1) {
    teams[index] = { ...teams[index], ...req.body };
    writeData(teams);
    res.json(teams[index]);
  } else {
    res.status(404).send("Team not found");
  }
});

// Eliminar un equipo
router.delete("/api/teams/:id", (req, res) => {
  const teams = readData();
  const newTeams = teams.filter((i) => i.id != req.params.id);

  if (teams.length !== newTeams.length) {
    writeData(newTeams);
    res.status(204).send();
  } else {
    res.status(404).send("Team not found");
  }
});

module.exports = router;
