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
// 3. Routing
app.use('/api/v1', router);
// 4. Error handling
app.use(errorHandlerMiddleware);
// 5. Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});