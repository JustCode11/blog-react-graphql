const models = require("../datasources/mongodb/models");
const DataLoader = require('dataloader');

const loaders = {
    comments: new DataLoader(async ids => {
        const rows = await models.Comment.find({ entry: ids });
        return ids.map((id) =>
            rows.filter((row) => id.toString() === row.entry.toString())
        );
    }),
    user: new DataLoader(async ids => {
        const rows = await models.User.find({ _id: ids });
        const lookup = rows.reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
        }, {});
        return ids.map(id => lookup[id]);
    })
};

module.exports = loaders;