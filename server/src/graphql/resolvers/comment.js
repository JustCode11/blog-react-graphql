module.exports = {
    user: async (comment, _, { models, loaders }) => {
        return await loaders.user.load(comment.user);
    }
};