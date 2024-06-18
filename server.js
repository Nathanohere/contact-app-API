const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });
const contactRouter = require("./Routes/contactRoutes");
const userRouter = require("./Routes/userRoutes");
const errorHandler = require("./Handler/errorHandler");
const app = express();

app.use(express.json());

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);


mongoose.connect(DB).then(() => console.log("DB connection successfully"));

app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/users", userRouter);

app.get("/api/v1/contactst", (req, res) => {
  res.send('Hello Worldy!')
})

app.get("/api/v1", (req, res) => {
  res.send('Hello World!')
})

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
