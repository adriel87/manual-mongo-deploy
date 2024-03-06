import { db } from '../../mock-data.js';
export const mockRepository = {
    getUserByEmailAndPassword: async (email, password) => db.users.find((u) => u.email === email && u.password === password),
    getUserById: async (id) => db.users.find((u) => u._id.toHexString() === id),
};
