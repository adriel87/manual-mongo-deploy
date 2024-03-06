import { db } from '#core/servers/index.js';
export const getBookContext = () => db?.collection('books');
