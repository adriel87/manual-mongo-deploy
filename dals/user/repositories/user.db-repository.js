import { ObjectId } from 'mongodb';
import { hashPassword } from '#common/helpers/index.js';
import { getUserContext } from '../user.context.js';
export const dbRepository = {
    getUserByEmailAndPassword: async (email, password) => {
        const user = await getUserContext().findOne({
            email,
        });
        const hashedPassword = await hashPassword(password, user?.salt);
        return user?.password === hashedPassword
            ? {
                _id: user._id,
                email: user.email,
                role: user.role,
            }
            : null;
    },
    getUserById: async (id) => await getUserContext().findOne({
        _id: new ObjectId(id),
    }, {
        projection: {
            email: 1,
            role: 1,
            avatar: 1,
        },
    }),
};
