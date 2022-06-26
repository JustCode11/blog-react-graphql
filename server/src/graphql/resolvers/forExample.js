module.exports = {
    user: async (entry, _, { loaders }) => {
        return await loaders.user.load(entry.user);
    }
};

