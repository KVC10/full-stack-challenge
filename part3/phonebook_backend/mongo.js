/* const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
const name = process.argv[3];
const password = process.argv[2];
const number = process.argv[4];

const url = `mongodb+srv://ronyj868_db_user:NcQqrDOeTxyZwBuL@cluster0.barzlx4.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const persons = new mongoose.Schema({
  name: String,
  number: String,
  password: String,
});

const Persons = mongoose.model("Persons", persons);

const note = new Persons({
  name: name,
  number: number,
  password: password,
});

note.save().then((result) => {
  console.log(`added ${result.name} number ${result.number} to phonebook`);
  mongoose.connection.close();
});
 */
