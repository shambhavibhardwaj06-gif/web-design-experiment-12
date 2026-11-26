require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(error => console.log(error));

const Task = mongoose.model("Task", new mongoose.Schema({
    title: { type: String, required: true }
}));

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
    const task = new Task({ title: req.body.title });
    await task.save();
    res.status(201).json(task);
});

app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Task deleted");
});

app.get("/", (req, res) => {
    res.send("MERN Task API is running");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend running");
});
