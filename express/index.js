const express = require('express');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi koneksi PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'items',
    password: '12345',
    port: 5432,
});

// Membuat tabel 
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        birth DATE,
        job TEXT,
        email TEXT UNIQUE,
        address TEXT,
        status VARCHAR(20) DEFAULT 'active',
        avatar TEXT
    )
`).then(() => {
    console.log("Table 'users' created or already exists with avatar column");
}).catch((err) => {
    console.error('Error creating table with avatar column:', err);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalName = file.originalname.replace(/\s+/g, '-').toLowerCase(); // Handle spaces and case in file name
        cb(null, uniqueSuffix + '-' + originalName); // Unique file name
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

// Endpoint to handle user creation
app.post('/users', upload.single('avatar'), async (req, res) => {
    const { name, birth, job, email, address, status } = req.body;
    const avatar = req.file ? `/images/${req.file.filename}` : null; 
    const formattedBirth = birth ? new Date(birth).toISOString().split('T')[0] : null;

    try {
        const result = await pool.query(
            'INSERT INTO users (name, birth, job, email, address, status, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, formattedBirth, job, email, address, status, avatar]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send(error.message);
    }
});

// Endpoint untuk mengunggah gambar avatar by id
app.post('/upload-avatar/:id', upload.single('avatar'), async (req, res) => {
    const id = parseInt(req.params.id);
    const avatarUrl = req.file ? `/images/${req.file.filename}` : null;

    try {
        const result = await pool.query(
            'UPDATE users SET avatar = $1 WHERE id = $2 RETURNING *',
            [avatarUrl, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).send(error.message);
    }
});

// Read all items
app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results.rows);
    });
});

// Read one item
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        if (results.rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        res.json(results.rows[0]);
    });
});

// Update item
app.put('/users/:id', upload.single('avatar'), async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, birth, job, email, address, status } = req.body;
    
    console.log('Request Body:', req.body);
    console.log('File:', req.file);

    const avatar = req.file ? `/images/${req.file.filename}` : null;
    const formattedBirth = birth ? new Date(birth).toISOString().split('T')[0] : null;

    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, birth = $2, job = $3, email = $4, address = $5, status = $6, avatar = $7 WHERE id = $8 RETURNING *',
            [name, formattedBirth, job, email, address, status, avatar, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Item not found');
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send(error.message);
    }
});

// Delete item by id
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        if (results.rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        res.status(204).send();
    });
});

// dekete all data users
app.delete('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT avatar FROM users WHERE avatar IS NOT NULL');
        const avatars = result.rows.map(row => row.avatar);

        avatars.forEach(avatar => {
            const filePath = path.join(__dirname, avatar);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file ${filePath}:`, err);
                }
            });
        });

        await pool.query('TRUNCATE TABLE users RESTART IDENTITY');
        res.status(200).send('All users deleted');
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send(error.message);
    }
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});