import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    async function loadTasks() {
        const response = await fetch(API_URL + "/tasks");
        const data = await response.json();
        setTasks(data);
    }

    async function addTask() {
        if (title.trim() === "") return;

        await fetch(API_URL + "/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title })
        });

        setTitle("");
        loadTasks();
    }

    async function deleteTask(id) {
        await fetch(API_URL + "/tasks/" + id, { method: "DELETE" });
        loadTasks();
    }

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial" }}>
            <h1>MERN Task Manager</h1>
            <input
                value={title}
                onChange={event => setTitle(event.target.value)}
                placeholder="Enter a task"
            />
            <button onClick={addTask}>Add Task</button>

            {tasks.map(task => (
                <p key={task._id}>
                    {task.title}
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                </p>
            ))}
        </div>
    );
}

export default App;
