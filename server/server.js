const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const Todo = require('./models/todo');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then(
        doc => res.send(doc),
        err => res.status(400).send(err)
    );
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

/*
const newUser = new User({email: '   test@outlook.com   '});
newUser.save().then(
    doc => console.log('User added', doc),
    error => console.log(error)
);

const newTodo = new Todo({
    text: '  Do something else '
});

newTodo.save().then(
    doc => console.log('Todo added', doc),
    error => console.log(error)
);
*/