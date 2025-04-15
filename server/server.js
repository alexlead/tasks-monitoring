import express from 'express';
import bodyParser from 'body-parser';

import taskBoardRoutes from './routes/TaskBoardRoutes.js';

const app = express();
const port = 3000 ;

import pool from "./config/db.js";


app.use(bodyParser.json());


app.get('/api/test/', (req, res) => {
    res.status(200).send({ message: 'Connected successfully' });
}
)
app.get('/api/', (req, res) => {
    res.status(200).send({ message: 'Connected' });
}
)
app.use("/api/board", taskBoardRoutes);


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