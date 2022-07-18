module.exports = {
    entries: async (_, { cursor, search, tag }, { models }) => {
        const limit = 3;
        let hasNextPage = false;
        let cursorQuery = {};
        if (cursor) {
            cursorQuery = { _id: { $lt: cursor } };
        }
        let searchQuery = {};
        if (search && search !== "") {
            searchQuery = { title: { $regex: search } };
        }
        let tagQuery = {};
        if (tag && tag !== "") {
            tagQuery = { tags: tag }
        }
        let entries = await models.Entry.find(searchQuery).find(tagQuery).find(cursorQuery).sort({ _id: -1 }).limit(limit + 1);

        if (entries.length > limit) {
            hasNextPage = true;
            entries = entries.slice(0, -1);
        }

        const newCursor = entries[entries.length - 1]._id;

        return {
            entries,
            cursor: newCursor,
            hasNextPage
        };
    },
    entry: async (_, { id }, { models }) => {
        return await models.Entry.findById(id);
    },
    tags: async (_, __, { models }) => {
        return await models.Tag.find();
    },
    me: async (_, __, { models, user }) => {
        if (!user) {
            return await null;
        }
        const profile = await models.User.findById(user.id);
        const entryList = await models.Entry.find({ user: user.id }) || [];
        const commentList = await models.Comment.find({ user: user.id }) || [];

        return {
            user: profile,
            entryList,
            commentList
        }
    }
}