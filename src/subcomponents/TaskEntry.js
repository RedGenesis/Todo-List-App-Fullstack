import axios from "axios";
import { useState, useEffect } from "react";

function TaskEntry(props) {

    let task = props.Task;

    // function to delete task when button is pressed
    const deleteTask = () => {
        axios.post('tasks/delete', { Task: task}).then(() => {
            console.log("Task was deleted");
        });

        props.updateList();
    }

    // function to toggle task completion
    const toggleTaskCompleted = () => {
        let newStatus = !props.Completed;

        let params = {
            Task: props.Task,
            Completed: newStatus
        }

        console.log(params);
        
        axios.put('tasks/checkbox', params).then(() => {
            console.log("Completed status was updated");
        });

        props.updateList();
    }

    // let Task = props.Task;

    // const [taskData, setTaskData] = useState({});

    // const getTaskInfo = async () => {

    //     let payload = await axios.get('/tasks/info', { params: { Task: Task}});

    //     setTaskData(payload.data.data[0] ? payload.data.data[0] : {});
    // }

    // useEffect(() => {
    //     getTaskInfo();
    // }, []);

    let displayStatus = "";

    if (props.Completed === 0) {
        displayStatus = "In progress";
    } else {
        displayStatus = "Task finished";
    }

    return (
        <div className="task-list__entry" key={ props.Task.toString() }>
            <div className="task-entry__checkbox">
                <input
                    id={props.Task}
                    type="checkbox"
                    defaultChecked={props.Completed}
                    onChange={toggleTaskCompleted}
                />
            </div>
            <div className="task-entry__task">
                <h3>{ props.Task.toString() }</h3>
            </div>
            <div className="task-entry__completed">
                <h3 style={{color: displayStatus === "In progress" ? "red" : "lime"}}>{ displayStatus }</h3>
            </div>
            <div className="task-entry__delete">
                <button className="task-entry__button" onClick={deleteTask}>Delete Task</button>
            </div>
        </div>
    )
}

export default TaskEntry;