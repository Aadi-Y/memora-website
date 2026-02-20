require("dotenv").config();
const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes.js");
const notesRoutes = require("./routes/notesRoutes.js");



const port = 5000 || process.env.PORT;
const app = express();

mongoose.connect(config.connectionString);



app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.json("It is working");
});

app.use("/", authRoutes);
app.use("/", notesRoutes);

app.listen(port, () => {
    console.log("The app is running in the port of : ", port);
});