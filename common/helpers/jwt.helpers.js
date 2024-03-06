import jwt from 'jsonwebtoken';
export const verifyJWT = (token, secret) => new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
        if (error) {
            reject(error);
        }
        if (payload) {
            resolve(payload);
        }
        else {
            reject();
        }
    });
});
