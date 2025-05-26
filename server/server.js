import express from 'express';
import bodyParser from 'body-parser';

import statusRoutes from './routes/statusRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import pool from "./config/db.js";

import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger-output.json' assert { type: "json" };
import swaggerDocument from './swagger-output.json' with { type: 'json' };



const app = express();
const port = 3000;


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