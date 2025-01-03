import express from "express";
import mysql from "mysql2/promise";

const router = express.Router();

async function connect() {
    const pool = await mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'Brunomiperrofiel1',
        database: '88Pay',
        port: 3306,
    });
    pool.getConnection().then((connection) => {
        console.log('Connection established');
        connection.release();
    }).catch((error) => {
        console.error('Error establishing connection:', error);
    });
    return pool;
}

router.get("/user", (_req, res) => {
    /* const query = 'SELECT * FROM usuarios';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al consultar los usuarios:', error);
            res.status(500).json({ message: 'Error al consultar los usuarios' });
        } else {
            res.status(200).json({ message: 'Usuarios consultados exitosamente', data: results });
        }
    }); */
    res.status(200).json({ message: 'Usuarios consultados exitosamente', data: [] });
})

router.get("/users", async (_req, res) => {

    const connection = await connect();
    const query = 'SELECT * FROM usuarios';

    try {
        const result = await connection.execute(query);
        res.status(200).json({ message: 'Usuarios consultados exitosamente', data: result });
    } catch (error) {
        console.error('Error al consultar los usuarios:', error);
        res.status(500).json({ message: 'Error al consultar los usuarios' });
    }
})

router.get("/users/:id", async (req, res) => {

    const { id } = req.params;
    const connection = await connect();
    const query = 'SELECT * FROM usuarios WHERE id = ?';

    try {
        const result = await connection.execute(query, [id]);
        res.status(200).json({ message: 'Usuario consultado exitosamente', data: result });
    } catch (error) {
        console.error('Error al consultar el usuario:', error);
        res.status(500).json({ message: 'Error al consultar el usuario' });
    }
})

router.post("/users", async (req, res) => {

    const { name, email } = req.body;
    const createdAt = new Date();
    const connection = await connect();
    const query = 'INSERT INTO usuarios (name, email, createdAt) VALUES (?, ?, ?)';

    try {
        const result = await connection.execute(query, [name, email, createdAt]);
        res.status(201).json({ message: 'Usuario creado exitosamente', data: result });
    } catch (error) {
        console.error('Error al insertar el usuario:', error);
        res.status(500).json({ message: 'Error al insertar el usuario' });
    }
})

export const userRouter = router;