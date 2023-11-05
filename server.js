import express from 'express';
import cors from 'cors';
import { connectDB } from './configs/db.config.js';
import { errorHandlerMiddleware } from './middlewares/error.middleware.js';
import router from './routers/index.js';

const app = express();
const PORT = 5000;

// 1. Create connection to database
connectDB();
// 2. Global middlewares
app.use(express.json());
app.use(cors("*"));
app.use((req, res, next) => {
    // Thiết lập header Cache-Control với max-age (thời gian cache) là 3600 giây (1 giờ)
    res.header('Cache-Control', 'public, max-age=3600');
    next();
});
// 3. Routing
app.use('/api/v1', router);
// 4. Error handling
app.use(errorHandlerMiddleware);
// 5. Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});