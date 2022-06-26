module.exports = {
    tags: async (entry, _, { models }) => {
        return await models.Tag.find({ _id: entry.tags }).sort({ _id: -1 });
    },
    user: async (entry, _, { models, loaders }) => {
        // ohne dataloader
        //return await models.User.findById(entry.user);
        /*const result = await models.User.findById(entry.user);
        console.log(result);
        return result;*/

        // mit dataloader
        return await loaders.user.load(entry.user);
    },
    comments: async (entry, _, { models, loaders }) => {
        // ohne dataloader
        /*const result = await models.Comment.find({ entry: entry._id });
        return result;*/
        //console.log('entry: ', entry);

        // mit dataloader
        const result = await loaders.comments.load(entry._id);
        return result;
    }
};