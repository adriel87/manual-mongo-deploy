import { ObjectId } from 'mongodb';
import { getBookContext } from '../book.context.js';
export const dbRepository = {
    getBookList: async (page, pageSize) => {
        const skip = Boolean(page) ? (page - 1) * pageSize : 0;
        const limit = pageSize ?? 0;
        return await getBookContext().find().skip(skip).limit(limit).toArray();
    },
    getBook: async (id) => {
        return await getBookContext().findOne({
            _id: new ObjectId(id),
        });
    },
    saveBook: async (book) => {
        const { value } = await getBookContext().findOneAndUpdate({
            _id: book._id,
        }, { $set: book }, { upsert: true, returnDocument: 'after' });
        return value;
    },
    deleteBook: async (id) => {
        const { deletedCount } = await getBookContext().deleteOne({
            _id: new ObjectId(id),
        });
        return deletedCount === 1;
    },
};
