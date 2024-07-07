import pg from 'pg'

const Pool = pg.Pool

const pool = new Pool({
    user: "postgres",
    password: "deepdeep",
    host: "localhost",
    port: 5432,
    database: "todo_database"
});

export default pool