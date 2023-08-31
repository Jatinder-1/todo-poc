import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 5000;

// Middlewarres
app.use(cors())
app.use(bodyParser.json())

let todoList = [
    { id: 1, text: "Add this task", isDone: false},
    { id: 2, text: "Bla bla bla", isDone: false},
    { id: 3, text: "Do this task", isDone: false},
];

app.get("/api/todos", (req, res) => {
    res.json({ message: "Success", data: todoList });
});

app.post('/api/todo/create', (req, res) => {
    const { title } = req.body
    console.log(`Creating new todo!`, title)
    const id = uuidv4()
    const item = { id, text: title, isDone: false, createdAt: new Date() }
    //@todo add only unique tasks
    todoList.push(item)

    return res.json({ status: 'success', data: item })
})

app.put('/api/todo/update', (req, res) => {
    const { id, status } = req.body
    const itemIndex = todoList.findIndex((e) => e.id === id)

    if (itemIndex === -1)
      return res.json({ status: 'error', error: 'Invalid ID' })
  
    todoList[itemIndex].isDone = status
  
    return res.json({ status: 'success' })
})

app.delete('/api/todo/delete', (req, res) => {
    const { id } = req.body
    const items = todoList.filter((i)=> i.id !== id)
    todoList = items;

    return res.json({ status: 'success', data: items })
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});