import { ObjectId } from 'mongodb';
export const mapBookFromModelToApi = (book) => ({
    id: book._id.toHexString(),
    title: book.title,
    releaseDate: book.releaseDate?.toISOString(),
    author: book.author,
});
export const mapBookListFromModelToApi = (bookList) => bookList.map(mapBookFromModelToApi);
export const mapBookFromApiToModel = (book) => ({
    _id: new ObjectId(book.id),
    title: book.title,
    releaseDate: new Date(book.releaseDate),
    author: book.author,
});
export const mapBookListFromApiToModel = (bookList) => Array.isArray(bookList) ? bookList.map(mapBookFromApiToModel) : [];
