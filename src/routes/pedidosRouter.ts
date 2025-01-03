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

router.get("/orders/user/:id", async (_req, res) => {

    const { id } = _req.params;
    const connection = await connect();
    const query = `
        SELECT 
            p.id AS order_id,
            p.quantity AS order_quantity,
            p.createdAt AS order_created_at,
            u.id AS user_id,
            u.name AS user_name,
        FROM 
            pedidos p
        LEFT JOIN 
            usuarios u ON p.userId = u.id  
        WHERE 
            u.id = ?;`

    try {
        const result = await connection.execute(query, [id]);
        res.status(200).json({ message: 'Pedidos consultados exitosamente', data: result });
    } catch (error) {
        console.error('Error al consultar los pedidos:', error);
        res.status(500).json({ message: 'Error al consultar los pedidos' });
    }
})

router.get("/orders/:id", async (req, res) => {

    const { id } = req.params;
    const connection = await connect();
    const query = `
        SELECT 
            p.id AS order_id,
            p.quantity AS order_quantity,
            p.createdAt AS order_created_at,
            
            u.id AS user_id,
            u.name AS user_name,
            u.email AS user_email,
            u.createdAt AS user_created_at,
            
            pr.id AS product_id,
            pr.name AS product_name,
            pr.price AS product_price
        FROM 
            pedidos p
        INNER JOIN 
            usuarios u ON p.userId = u.id
        INNER JOIN 
            productos pr ON p.productId = pr.id
        WHERE 
            p.id = ?;`

    try {
        const result = await connection.execute(query, [id]);
        res.status(200).json({ message: 'Pedido consultado exitosamente', data: result });
    } catch (error) {
        console.error('Error al consultar el pedido:', error);
        res.status(500).json({ message: 'Error al consultar el pedido' });
    }
})

router.post("/orders", async (req, res) => {

    const { userId, productId, quantity } = req.body;
    const createdAt = new Date();
    const connection = await connect();
    const query = 'INSERT INTO pedidos (userId, productId, quantity, createdAt) VALUES (?, ?, ?, ?)';

    try {
        const result = await connection.execute(query, [userId, productId, quantity, createdAt]);
        res.status(201).json({ message: 'Pedido creado exitosamente', data: result });
    } catch (error) {
        console.error('Error al insertar el pedido:', error);
        res.status(500).json({ message: 'Error al insertar el pedido' });
    }
})

// eliminar un pedido
router.delete("/orders/:id", async (req, res) => {

    const { id } = req.params;
    const connection = await connect();
    const query = 'DELETE FROM pedidos WHERE id = ?';

    try {
        const result = await connection.execute(query, [id]);
        res.status(200).json({ message: 'Pedido eliminado exitosamente', data: result });
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        res.status(500).json({ message: 'Error al eliminar el pedido' });
    }
})

export const orderRouter = router;