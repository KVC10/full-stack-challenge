const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

app.use(express.json());
// 1. Middleware pour capturer le body de la réponse
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    res.responseBody = body; // On stocke la réponse dans l'objet res
    return originalSend.apply(this, arguments);
  };
  next();
});

// 2. Création d'un token Morgan personnalisé
morgan.token("res-body", (req, res) => {
  return res.responseBody ? res.responseBody : "Empty/No Response";
});

// 3. Utilisation du format 'dev' enrichi avec le nouveau token
app.use(morgan(":method :url :status :response-time ms - :res-body"));

app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "https://full-stack-challenge-fbpo.onrender.com"],
      // Ajoutez d'autres directives si nécessaire
    },
  }),
);
app.use(express.static(path.join(__dirname, "part2", "dist")));
const phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  console.log(req);
  res.json(phonebook);
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`,
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = phonebook.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personIndex = phonebook.findIndex((person) => person.id === id);
  if (personIndex !== -1) {
    phonebook.splice(personIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name,
    number,
  };

  phonebook.push(newPerson);
  res.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);

console.log(`Server running on  PORT: ${PORT}`);
