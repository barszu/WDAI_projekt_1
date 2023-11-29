const Person = require("../dbContent/models/person");

exports.getAllPeople = async () => {
  try {
    const people = await Person.findAll();
    return people;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching people (getAllPeople)");
  }
};

exports.getPersonById = async (personId) => {
  try {
    const person = await Person.findByPk(personId);
    if (person === null) {
      throw new Error("Person with given id was not found (getPersonById)");
    }
    return person;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching person by ID (getPersonById)");
  }
};

exports.createPerson = async (name, surname, job) => {
  try {
    await Person.create({ name: name, surname: surname, job: job });
  } catch (err) {
    console.log(err);
    throw new Error("Error creating person (createPerson)");
  }
};
