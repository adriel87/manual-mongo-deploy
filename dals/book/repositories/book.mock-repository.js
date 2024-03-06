import { ObjectId } from 'mongodb';
import { db } from '../../mock-data.js';
const insertBook = (book) => {
    const _id = new ObjectId();
    const newBook = {
        ...book,
        _id,
    };
    db.books = [...db.books, newBook];
    return newBook;
};
const updateBook = (book) => {
    db.books = db.books.map((b) => b._id.toHexString() === book._id.toHexString() ? { ...b, ...book } : b);
    return book;
};
const paginateBookList = (bookList, page, pageSize) => {
    let paginatedBookList = [...bookList];
    if (page && pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, paginatedBookList.length);
        paginatedBookList = paginatedBookList.slice(startIndex, endIndex);
    }
    return paginatedBookList;
};
export const mockRepository = {
    getBookList: async (page, pageSize) => paginateBookList(db.books, page, pageSize),
    getBook: async (id) => db.books.find((b) => b._id.toHexString() === id),
    saveBook: async (book) => Boolean(book._id) ? updateBook(book) : insertBook(book),
    deleteBook: async (id) => {
        db.books = db.books.filter((b) => b._id.toHexString() !== id);
        return true;
    },
};
