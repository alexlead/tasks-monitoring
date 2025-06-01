import express from 'express';
import bodyParser from 'body-parser';

import statusRoutes from './routes/statusRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import pool from "./config/db.js";

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: 'json' };

import cors from 'cors';


const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors({
    origin: 'http://localhost:3006',
    credentials: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3006');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

app.get('/api/', (req, res) => {
    res.status(200).send({ message: 'Connected' });
}
)
app.use("/api/statuses/", statusRoutes);
app.use("/api/tasks/", taskRoutes);



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    pool.connect((err, client, release) => {
        if (err) {
            console.error('❌ Ошибка подключения к PostgreSQL:', err);
            process.exit(1);
        }
        console.log('✅ Успешное подключение к PostgreSQL');
        release();
    });
});

process.on('SIGINT', () => {

    process.exit();
});