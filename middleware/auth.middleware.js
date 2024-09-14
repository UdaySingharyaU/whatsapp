import jwt from "jsonwebtoken";

const authMiddleware = {
    auth: async (req, res, next) => {
        try {
            let token;
            if (req.headers && req.headers.authorization) {
                token = req.headers.authorization.split(' ')[1];
            } else if (req.cookies && req.cookies.jwt) {
                token = req.cookies.jwt;
            }
            if (!token) {
                return res.status(401).json({
                    status: false,
                    message: "Token is required",
                });
            }
            const decodedToken = jwt.verify(token, process.env.secret);
            req.user = decodedToken;
            next();
        } catch (error) {
            return res.status(401).json({
                status: false,
                message: "Invalid or expired token",
            });
        }
    }
};

export default authMiddleware;
