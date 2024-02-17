import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router/todo-router.js";
import path from "path";

const app = express();
const port = 5000;

const __dirname = path.resolve();

app.use(cors());

mongoose
  .connect("mongodb+srv://todo:todo@cluster0.xfdqoeb.mongodb.net/todo")
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(express.json());
app.use("/api/", router);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", index.html));
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
