const express = require("express");
const peopleController = require("../controllers/people");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const people = await peopleController.getAllPeople();
    res.status(200).send(people);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:personId", async (req, res, next) => {
  try {
    const person = await peopleController.getPersonById(req.params.personId);
    res.status(200).send(person);
  } catch (err) {
    console.log(err);
    res.status(404).send({ errMsg: err.message });
  }
});

router.post("/createPerson", async (req, res, next) => {
  try {
    const { name, surname, job } = req.body;
    await peopleController.createPerson(name, surname, job);
    res.status(201).send("Successfully created person");
  } catch (err) {
    console.log(err);
    res.status(400).send("Bad person data");
  }
});

module.exports = router;
