import axios from "axios";
import { useState, useEffect } from "react";

function TaskAdd(props) {

    const [task, setTask] = useState("");

    function handleSubmit() {

        if (task !== '' || task !== undefined) {

            let params = {
                Task: task,
                Completed: false
            }

            console.log(params);

            axios.post('/tasks/add', params).then(() => {
                console.log("New Task was added!");
            });

            props.updateList();

            setTask("");
        }
    }

    return (
        <div className="task-add__wrapper">
            <div className="task-add">
                <label htmlFor="task" className="task-add__label">What to do:</label>
                <input
                    type="task"
                    name="task"
                    id="task"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                />
                <button onClick={handleSubmit} className="task-add__button">Add Task</button>
            </div>

        </div>
    )
}

export default TaskAdd;