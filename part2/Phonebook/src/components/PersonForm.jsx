import React from "react";

const PersonForm = ({
  newName,
  setNewName,
  handleSubmit,
  number,
  setNumber,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, newName)}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
