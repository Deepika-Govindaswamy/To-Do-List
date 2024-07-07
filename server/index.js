import express from 'express'
import pool from './databaseConnection.js'
import cors from 'cors'

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.listen(port, () => console.log(`Server listening on port ${port}`))

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY description")
        res.json(allTodos.rows)
    } catch (error) {
        console.err(error)
    }
})

// create new todo
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1)", [description])
        res.send("Added new todo 🥳")
    } catch (error) {
        console.error(error)
    }
})

// update todo 
app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])
    }
    catch (error) {
        console.error(error)
    }
})

// delete todo
app.delete("/todos/:id", async (req, res) => {
    try {
        // res.send(req.body)
        const {id} = req.params
        await pool.query("DELETE FROM todo WHERE todo_id = ($1)", [id])
        res.send("Deleted todo Successfully 👍")
        
    } catch (error) {
        console.error(error)
    }
})