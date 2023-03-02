const express = require("express");
const cookieParser = require("cookie-parser");
//const cors = require("cors");
const morgan = require("morgan");

const app = express();
const models = require("./models")

const routes = require("./routes");
const db = require("./config/db");


app.use(express.json());
//app.use(cors());
app.use(cookieParser());
app.use(morgan("tiny"));



app.get("/api", (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});

/* app.get("/api", (req, res) => {
  res.send("Hello Worldddd !!!!")
}) */

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


/* app.post("/api/newusers", (req, res) => {
  
  console.log(" CHEEE DUMMY  ENDPOINTT ");    // con postman mando un POST a http://localhost:3001/api/clients y en terminal del back sale: CHEEE DUMMY  ENDPOINTT 

  res.send(" CHE VOS POSTEASTE ALGOOO !!!")   // este aviso CHE VOS POSTEASTE ALGOOO !!!" lo muestra Postman en su Rx
}) */

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

app.use("/api", routes);

const PORT = 3001;

db.sync({ force: false }).then(() => {
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
});