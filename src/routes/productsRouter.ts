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

// Listar todos los productos con filtros como por ejemplo: filtrar por nombre, precio, etc.
router.get("/products", async (_req, res) => {
    const { filtro, valor } = _req.query;
    const connection = await connect();
    const query = `
        SELECT 
            id,
            name,
            price,
            createdBy
        FROM 
            productos p
        WHERE 
            p.${filtro} = ?;`;

    try {
        const result = await connection.execute(query, [valor]);
        res.status(200).json({ message: 'Productos consultados exitosamente', data: result });
    } catch (error) {
        console.error('Error al consultar los productos:', error);
        res.status(500).json({ message: 'Error al consultar los productos' });
    }
})

router.get("/products/:id", async (req, res) => {

    const { id } = req.params;
    const connection = await connect();
    const query = `
        SELECT 
            p.id AS product_id,
            p.name AS product_name,
            p.price AS product_price,
            u.id AS user_id,
            u.name AS user_name,
            u.email AS user_email,
            u.createdAt AS user_created_at
        FROM 
            productos p
        INNER JOIN 
            usuarios u ON p.createdBy = u.id
        WHERE 
            p.id = ?;`;

    try {
        const result = await connection.execute(query, [id]);
        res.status(200).json({ message: 'Producto consultado exitosamente', data: result });
    } catch (error) {
        console.error('Error al consultar el producto:', error);
        res.status(500).json({ message: 'Error al consultar el producto' });
    }
})

router.post("/products", async (req, res) => {

    const { name, price, createdBy } = req.body;
    const connection = await connect();
    const query = 'INSERT INTO productos (name, price, createdBy) VALUES (?, ?, ?)';

    try {
        const result = await connection.execute(query, [name, price, createdBy]);
        res.status(201).json({ message: 'Producto creado exitosamente', data: result });
    } catch (error) {
        console.error('Error al insertar el producto:', error);
        res.status(500).json({ message: 'Error al insertar el producto' });
    }
})

export const productRouter = router;