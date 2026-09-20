const express = require("express");
const morgan = require("morgan");
const app = express();

const path = require("path");
require("dotenv").config();
const Persons = require("./models/persons");

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

/* if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} */
/* const name = process.argv[3];
const password = process.argv[2];
const number = process.argv[4]; */

/* const note = new Persons({
  name: name,
  number: number,
  password: password,
});

note.save().then((result) => {
  console.log(`added ${result.name} number ${result.number} to phonebook`);
  mongoose.connection.close();
}); */

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
  Persons.find({}).then((result) => {
    res.json(result);
  });
});

app.get("api/persons/info", (req, res) => {
  const date = new Date();
  Persons.find({}).then((result) => {
    res.json(result);
  });
  /* res.send(
    `<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`,
  ); */
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Persons.findById(id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Persons.findByIdAndDelete(id).then((result) => {
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });
  /* const personIndex = phonebook.findIndex((person) => person.id === id);
  if (personIndex !== -1) {
    phonebook.splice(personIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).end();
  } */
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  const newPerson = new Persons({
    name: name,
    number: number,
    password: Math.floor(Math.random() * 1000000).toString(),
  });

  newPerson.save().then((person) => {
    res.json(person);
  });
});

app.put("api/persons/:id", (req, res) => {
  const id = req.params.id;
  const { newNumber } = req.body;

  Persons.findByIdAndUpdate(id, { number: newNumber }, { new: true }).then(
    (updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).end();
      }
    },
  );
});

/* const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
 */
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  }
};

app.use(errorHandler);

app.use(express.static(path.join(__dirname, "../../part2/Phonebook/dist")));
//react router
/* app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../part2/Phonebook/dist/index.html"));
}); */

const PORT = process.env.PORT;
app.listen(PORT);

console.log(`Server running on  PORT: ${PORT}`);
