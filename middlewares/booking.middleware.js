// auth.middleware.js
import jwt from 'jsonwebtoken';

const BookMiddleware = (req, res, next) => {
    const token = req.headers["token"];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(403).json({
                    message: "Token is expired",
                });
            }

            return res.status(401).json({
                message: "Token is not valid",
            });
        }
    }

    next(); // Cho phép tiếp tục xử lý kể cả khi không có token
};

export default BookMiddleware;

