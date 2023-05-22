import React, { useState, useEffect } from "react";
import TaskEntry from "../subcomponents/TaskEntry";
import TaskAdd from "../subcomponents/TaskAdd";
import axios from "axios";

function TodoList() {

    const [tasks, setTasks] = useState([]);

    const getTasksList = async() => {

        const { data } = await axios.get('/tasks/list');
        console.log(data);
        setTasks(data.data);
    }

    useEffect(() => {
        getTasksList();
    }, []);

    return (
        <div className="tasks-app">
            <div className="tasks-input">
                <TaskAdd updateList={getTasksList}/>
            </div>
            <div className="tasks-list__container">
                { tasks.map((task) => {
                    return (
                        <>
                            <TaskEntry 
                                Task={task.Task}
                                Completed={task.Completed}
                                updateList={getTasksList}
                            />
                    </>
                    )
                })}
            </div>
        </div>

    )
}

export default TodoList;