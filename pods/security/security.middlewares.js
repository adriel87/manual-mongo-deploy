import { verifyJWT } from '#common/helpers/index.js';
import { envConstants } from '#core/constants/index.js';
export const authenticationMiddleware = async (req, res, next) => {
    try {
        const [, token] = req.cookies.authorization?.split(' ') || [];
        const userSession = await verifyJWT(token, envConstants.AUTH_SECRET);
        req.userSession = userSession;
        next();
    }
    catch (error) {
        res.sendStatus(401);
    }
};
const isAuthorized = (currentRole, allowedRoles) => !Boolean(allowedRoles) ||
    (Boolean(currentRole) && allowedRoles.some((role) => currentRole === role));
export const authorizationMiddleware = (allowedRoles) => async (req, res, next) => {
    if (isAuthorized(req.userSession?.role, allowedRoles)) {
        next();
    }
    else {
        res.sendStatus(403);
    }
};
