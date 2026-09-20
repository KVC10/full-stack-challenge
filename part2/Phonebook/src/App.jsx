import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import axios from "axios";
import personService from "./services/person.js";
import Message from "./components/Message.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMaessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getall().then((data) => {
      console.log(data);
      setPersons(data);
    });
  }, []);

  const handleSubmit = (e, name) => {
    e.preventDefault();
    const existingName = persons.find(
      (el) => el.name.toLowerCase() === name.toLowerCase(),
    );
    if (existingName) {
      console.log(existingName);

      const areYouSure = window.confirm(
        `${existingName.name} is already added to phonebook, replace the old number with a new one?`,
      );
      if (!areYouSure) {
        return;
      }

      personService
        .modifyNumber(existingName.id, { number: number })
        .then((data) => {
          setPersons(
            persons.map((el) => (el.id === existingName.id ? data : el)),
          );
          setNewName("");
          setNumber("");
          setMaessage(`Updated ${existingName.name}'s number`);
          return;
        })
        .catch((error) => {
          setMaessage(error.response.data.error);
        });
    }

    personService
      .createPerson({ name: newName, number: number })
      .then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNumber("");
        setMaessage(`Added ${newName}`);
        setTimeout(() => {
          setMaessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMaessage(error.response.data.error);
      });
  };

  const handleDelete = (id) => {
    const areYouSure = window.confirm(
      "Are you sure you want to delete this person?",
    );
    if (!areYouSure) {
      return;
    }
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter((el) => el.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        handleSubmit={handleSubmit}
        setNumber={setNumber}
        number={number}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
