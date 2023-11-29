const express = require("express");
const db = require("./dbContent/database");

const peopleRoutes = require("./routes/peopleRoutes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/people", peopleRoutes);

app.get("/", (req, res) => {
  res.send("Hello World, strona root");
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});

db.sync()
  .then(function () {
    console.log("DataBase works fine!");
  })
  .catch(function (err) {
    console.log(err);
  });
