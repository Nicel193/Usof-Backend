import TokenService from "../services/tokenService.js"

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            res.status(401).json('UnauthorizedError');
            return;
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            res.status(401).json('UnauthorizedError');
            return;
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            res.status(401).json('UnauthorizedError');
            return;
        }

        req.user = userData;
        next();
    } catch (e) {
        res.status(401).json('UnauthorizedError');
        return;
    }
};