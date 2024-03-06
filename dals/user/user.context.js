import { db } from '#core/servers/index.js';
export const getUserContext = () => db?.collection('users');
