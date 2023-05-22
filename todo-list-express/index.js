const express = require('express');
var bodyParser = require('body-parser');

const port = 3100;

let app = express();

let db = require('./database.js');

// create json parser for application
var jsonParser = bodyParser.json();

app.get('/tasks/info', jsonParser, (request, response) => {

    let Task = request.query.Task;

    let query = `SELECT * FROM Tasks WHERE Task=${Task}`;

    db.query(query, [], (err, data) => {

        if(err) {
            response.status(400).json({"Error":err.message});
        }

        response.json({
            "message": "OK",
            "data": data
        });
    });
})

app.get('/tasks/list', (request, response) => {

    let query = 'SELECT * FROM Tasks';

    let params = [];

    db.query(query, params, (err, data) => {

        if(err) {
            response.status(400).json({"error":err.message});
            return;
        }

        response.json({
            "message": "OK",
            "data": data
        });
    });
});

// add task
app.post('/tasks/add', jsonParser, (request, response) => {

    let newTask = {
        Task: request.body.Task,
        Completed: request.body.Completed
    }

    let query = `INSERT INTO Tasks (Task, Completed) VALUES (\'${newTask.Task}\', ${newTask.Completed});`

    console.log(query);

    let params = [];

    db.query(query, params, (err) => {

        if(err) {
            response.status(400).json({"error":err.message});
            return;
        }
        
        response.json({
            "message": "New Task added!",
            "New Task": newTask
        });
    });
});

// PseudoDelete --> Needs to be an actual delete endpoint
app.post('/tasks/delete', jsonParser, (request, response) => {

    let removedTask = request.body.Task;

    let deleteFromTasksQuery = `DELETE FROM Tasks WHERE Task='${removedTask}';`

    console.log(deleteFromTasksQuery);

    let params = [];

    db.query(deleteFromTasksQuery, params, (err) => {
        if(err) {
            response.json(400).json({"error":err.message});
            return;
        }
        response.json({
            "Message": "Task was deleted"
        });
    });
})

app.put('/tasks/checkbox', jsonParser, (request, response) => {

    let modifytask = request.body.Task;
    let modifiedCompleted = request.body.Completed;
    
    let modifyquery = `UPDATE Tasks SET Completed = ${modifiedCompleted} WHERE Task=\'${modifytask}\';`

    console.log(modifyquery);

    let params = [];

    db.query(modifyquery, params, (err) => {
        if(err) {
            response.json(400).json({"error":err.message});
            return;
        }
        response.json({
            "Message": "Completed status was updated"
        });
    })
})

app.get('/hello', (request, response) => {
    response.send('Hello!');
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});